"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
    id: string;
    title: string;
    message?: string;
    image?: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextType {
    showToast: (title: string, options?: { message?: string; image?: string; type?: ToastType; duration?: number }) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback(
        (title: string, options: { message?: string; image?: string; type?: ToastType; duration?: number } = {}) => {
            const { message = "", image, type = "success", duration = 4000 } = options;
            const id = Math.random().toString(36).substring(2, 9);

            setToasts((prev) => [...prev, { id, title, message, image, type, duration }]);

            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }
        },
        []
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

function ToastContainer({
    toasts,
    removeToast,
}: {
    toasts: Toast[];
    removeToast: (id: string) => void;
}) {
    return (
        <div className="fixed top-[80px] right-4 sm:right-6 z-50 flex flex-col gap-3 w-full max-w-[calc(100vw-2rem)] sm:max-w-[340px] pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
            pointer-events-auto flex items-center gap-4 p-4 rounded-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)]
            bg-[#2C2C2C] text-white border-l-[3px] border-[#C5A059]
            transform transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
            animate-in slide-in-from-right-8 fade-in
          `}
                >
                    {toast.image && (
                        <div className="relative w-[50px] h-[60px] bg-white flex-shrink-0">
                            <Image
                                src={toast.image}
                                alt={toast.title}
                                fill
                                className="object-contain p-1"
                                sizes="50px"
                            />
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <h4 className="font-serif italic text-[#cccccc] text-sm leading-tight mb-0.5">
                            Added to cart
                        </h4>
                        <p className="font-sans font-semibold text-white text-base truncate">
                            {toast.title}
                        </p>
                        <Link href="/cart" className="block mt-1 text-[10px] uppercase tracking-[1px] text-[#C5A059] hover:text-[#dcb773] transition-colors">
                            View Cart &rarr;
                        </Link>
                    </div>

                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-stone-400 hover:text-white transition-colors self-start -mt-1 -mr-1"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
}
