"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Custom shader for oily streaks effect on slate
const OilySlateShader = {
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        
        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
    `,
    fragmentShader: `
        uniform sampler2D uDiffuse;
        uniform vec3 uLightPosition;
        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uIntensity;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        
        // Noise function for procedural oily streaks
        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }
        
        float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < 4; i++) {
                value += amplitude * noise(p);
                p *= 2.0;
                amplitude *= 0.5;
            }
            return value;
        }
        
        // Generate oily streaks pattern
        float oilyStreaks(vec2 uv) {
            // Correct aspect ratio for noise too so streaks aren't stretched
            vec2 aspectUV = uv;
            aspectUV.x *= uResolution.x / uResolution.y;
            
            vec2 stretched = vec2(aspectUV.x * 2.0, aspectUV.y * 1.5);
            float streak1 = fbm(stretched * 6.0 + vec2(0.0, uTime * 0.02));
            float streak2 = fbm(stretched * 9.0 - vec2(uTime * 0.015, 0.0));
            float streaks = streak1 * streak2;
            
            // Create distinct oily trails
            streaks = smoothstep(0.15, 0.45, streaks);
            return streaks;
        }
        
        void main() {
            // Correct UVs for aspect ratio to prevent texture stretching
            vec2 aspectUV = vUv;
            aspectUV.x *= uResolution.x / uResolution.y;
            
            vec4 texColor = texture2D(uDiffuse, aspectUV);
            
            // Darken the base texture to charcoal
            vec3 baseColor = texColor.rgb * 0.35;
            
            // Calculate oily streak pattern (0 = matte stone, 1 = glossy oil)
            float oilAmount = oilyStreaks(vUv);
            
            // Lighting calculation in World Space
            vec3 lightDir = normalize(uLightPosition - vWorldPosition);
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            vec3 halfDir = normalize(lightDir + viewDir);
            
            // Diffuse lighting
            float diff = max(dot(vNormal, lightDir), 0.0);
            
            // Specular - much stronger/sharper on oily areas
            float baseRoughness = 0.8; // Matte stone
            float oilRoughness = 0.1;  // Glossy oil
            float roughness = mix(baseRoughness, oilRoughness, oilAmount);
            
            // Increased shininess for wet look
            float shininess = mix(16.0, 256.0, 1.0 - roughness);
            float spec = pow(max(dot(vNormal, halfDir), 0.0), shininess);
            spec *= (1.0 - roughness) * 3.0; // Boost specular intensity
            
            // Oily iridescence - subtle color shift in reflections
            vec3 oilTint = vec3(0.95, 0.98, 1.0) + oilAmount * vec3(0.05, 0.02, -0.02);
            
            // Ambient light
            vec3 ambient = baseColor * 0.4;
            
            // Light color - warm golden point light
            vec3 lightColor = vec3(1.0, 0.9, 0.7);
            
            // Light falloff (point light)
            float dist = length(uLightPosition - vWorldPosition);
            float attenuation = 1.0 / (1.0 + dist * 0.1 + dist * dist * 0.01);
            
            // Combine lighting - Modulate by uIntensity for fade in/out
            vec3 diffuseLight = diff * baseColor * lightColor * 0.8 * attenuation * uIntensity;
            vec3 specularLight = spec * lightColor * oilTint * oilAmount * attenuation * uIntensity;
            
            // Add subtle fresnel for wet look on edges
            float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
            vec3 fresnelColor = fresnel * oilAmount * lightColor * 0.5 * attenuation * uIntensity;
            
            vec3 finalColor = ambient + diffuseLight + specularLight + fresnelColor;
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `,
};

function SlatePlane({ mousePosition, targetIntensity }: {
    mousePosition: React.MutableRefObject<{ x: number; y: number }>,
    targetIntensity: React.MutableRefObject<number>
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, size } = useThree();
    const currentIntensity = useRef(0);

    const diffuseTexture = useTexture("/textures/slate_diffuse.jpg");
    diffuseTexture.wrapS = diffuseTexture.wrapT = THREE.RepeatWrapping;

    const uniforms = useMemo(
        () => ({
            uDiffuse: { value: diffuseTexture },
            uLightPosition: { value: new THREE.Vector3(0, 0, 3) },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uTime: { value: 0 },
            uIntensity: { value: 0 },
        }),
        [diffuseTexture, size.width, size.height]
    );

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Smoothly interpolate intensity
            const step = delta * 2.0; // Fade speed
            currentIntensity.current = THREE.MathUtils.lerp(currentIntensity.current, targetIntensity.current, step);

            // Update light position based on mouse
            // Map 0..1 mouse coordinates to world space coordinates
            // (0.5, 0.5) -> (0, 0) center of screen
            const x = (mousePosition.current.x - 0.5) * viewport.width;
            const y = (mousePosition.current.y - 0.5) * viewport.height;

            // Z=1.5 puts the light closer to surface for more dramatic effect
            materialRef.current.uniforms.uLightPosition.value.set(x, y, 1.5);
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
            materialRef.current.uniforms.uIntensity.value = currentIntensity.current;
        }
    });

    return (
        <mesh ref={meshRef} rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={OilySlateShader.vertexShader}
                fragmentShader={OilySlateShader.fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

function Scene({ mousePosition, targetIntensity }: {
    mousePosition: React.MutableRefObject<{ x: number; y: number }>,
    targetIntensity: React.MutableRefObject<number>
}) {
    return (
        <>
            <SlatePlane mousePosition={mousePosition} targetIntensity={targetIntensity} />
        </>
    );
}

export function SlateBackground() {
    const [mounted, setMounted] = useState(false);
    const mousePosition = useRef({ x: 0.5, y: 0.5 });
    const targetIntensity = useRef(0); // 0 = off, 1 = on
    const containerRef = useRef<HTMLDivElement>(null);

    // Only render Canvas on client after hydration
    useEffect(() => {
        setMounted(true);

        // Global mouse move handler to track mouse even when over other elements (like text/links)
        const handleWindowMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();

                // Check if mouse is near the footer area (with some buffer)
                const buffer = 50; // pixels
                const isNear =
                    e.clientX >= rect.left - buffer &&
                    e.clientX <= rect.right + buffer &&
                    e.clientY >= rect.top - buffer &&
                    e.clientY <= rect.bottom + buffer;

                // Set target intensity explicitly based on proximity
                targetIntensity.current = isNear ? 1 : 0;

                if (isNear) {
                    mousePosition.current = {
                        x: (e.clientX - rect.left) / rect.width,
                        y: 1 - (e.clientY - rect.top) / rect.height, // Invert Y for Three.js
                    };
                }
            }
        };

        window.addEventListener("mousemove", handleWindowMouseMove);
        return () => window.removeEventListener("mousemove", handleWindowMouseMove);
    }, []);

    // Don't render Canvas during SSR to prevent hydration mismatch
    if (!mounted) {
        return (
            <div
                className="absolute inset-0 -z-10"
                style={{ background: "#1c1917" }}
            />
        );
    }

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 -z-10"
            style={{ pointerEvents: "none" }} // Allow clicks to pass through to footer content
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false }}
                style={{ background: "#1c1917" }}
            >
                <Scene mousePosition={mousePosition} targetIntensity={targetIntensity} />
            </Canvas>
        </div>
    );
}
