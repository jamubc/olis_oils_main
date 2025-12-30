"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Custom shader for oily streaks effect on slate
const OilySlateShader = {
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform sampler2D uDiffuse;
        uniform vec3 uLightPosition;
        uniform float uTime;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
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
            vec2 stretched = vec2(uv.x * 3.0, uv.y * 0.5);
            float streak1 = fbm(stretched * 8.0 + vec2(0.0, uTime * 0.02));
            float streak2 = fbm(stretched * 12.0 - vec2(uTime * 0.015, 0.0));
            float streaks = streak1 * streak2;
            
            // Create distinct oily trails
            streaks = smoothstep(0.15, 0.4, streaks);
            return streaks;
        }
        
        void main() {
            vec4 texColor = texture2D(uDiffuse, vUv);
            
            // Darken the base texture to charcoal
            vec3 baseColor = texColor.rgb * 0.4;
            
            // Calculate oily streak pattern (0 = matte stone, 1 = glossy oil)
            float oilAmount = oilyStreaks(vUv);
            
            // Lighting calculation
            vec3 lightDir = normalize(uLightPosition - vViewPosition);
            vec3 viewDir = normalize(vViewPosition);
            vec3 halfDir = normalize(lightDir + viewDir);
            
            // Diffuse lighting
            float diff = max(dot(vNormal, lightDir), 0.0);
            
            // Specular - much stronger on oily areas
            float baseRoughness = 0.85; // Matte stone
            float oilRoughness = 0.15;  // Glossy oil
            float roughness = mix(baseRoughness, oilRoughness, oilAmount);
            
            float shininess = mix(8.0, 128.0, 1.0 - roughness);
            float spec = pow(max(dot(vNormal, halfDir), 0.0), shininess);
            spec *= (1.0 - roughness) * 2.0;
            
            // Oily iridescence - subtle color shift in reflections
            vec3 oilTint = vec3(0.9, 0.95, 1.0) + oilAmount * vec3(0.05, 0.0, -0.05);
            
            // Ambient light
            vec3 ambient = baseColor * 0.3;
            
            // Light color - warm golden point light
            vec3 lightColor = vec3(1.0, 0.95, 0.85);
            
            // Combine lighting
            vec3 diffuseLight = diff * baseColor * lightColor * 0.7;
            vec3 specularLight = spec * lightColor * oilTint * oilAmount;
            
            // Add subtle fresnel for wet look on edges
            float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
            vec3 fresnelColor = fresnel * oilAmount * lightColor * 0.3;
            
            vec3 finalColor = ambient + diffuseLight + specularLight + fresnelColor;
            
            // Subtle vignette
            float vignette = 1.0 - length(vUv - 0.5) * 0.3;
            finalColor *= vignette;
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `,
};

function SlatePlane({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    const diffuseTexture = useTexture("/textures/slate_diffuse.jpg");
    diffuseTexture.wrapS = diffuseTexture.wrapT = THREE.RepeatWrapping;

    const uniforms = useMemo(
        () => ({
            uDiffuse: { value: diffuseTexture },
            uLightPosition: { value: new THREE.Vector3(0, 0, 3) },
            uTime: { value: 0 },
        }),
        [diffuseTexture]
    );

    useFrame((state) => {
        if (materialRef.current) {
            // Update light position based on mouse
            const x = (mousePosition.current.x - 0.5) * viewport.width;
            const y = (mousePosition.current.y - 0.5) * viewport.height;
            materialRef.current.uniforms.uLightPosition.value.set(x, y, 2.5);
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh ref={meshRef} rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[viewport.width * 1.2, viewport.height * 1.2, 1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={OilySlateShader.vertexShader}
                fragmentShader={OilySlateShader.fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

function Scene({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) {
    return (
        <>
            <SlatePlane mousePosition={mousePosition} />
        </>
    );
}

export function SlateBackground() {
    const mousePosition = useRef({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mousePosition.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: 1 - (e.clientY - rect.top) / rect.height, // Invert Y for Three.js
            };
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="absolute inset-0 -z-10"
            style={{ pointerEvents: "auto" }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false }}
                style={{ background: "#1c1917" }}
            >
                <Scene mousePosition={mousePosition} />
            </Canvas>
        </div>
    );
}
