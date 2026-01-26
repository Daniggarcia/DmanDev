"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const TECH_STACK = [
    { name: "Next.js 13", category: "Core Framework", status: "OPTIMIZED" },
    { name: "React 18", category: "UI Library", status: "ACTIVE" },
    { name: "TypeScript", category: "Type Safety", status: "ENFORCED" },
    { name: "TailwindCSS", category: "Styling Engine", status: "LOADED" },
    { name: "Framer Motion", category: "Animation Logic", status: "RUNNING" },
    { name: "Contentlayer", category: "Data Layer", status: "SYNCED" },
];

export const TechInfoModal = ({ isOpen, onClose }: Props) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-black border-2 border-cyan-900 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)]"
                    >
                        {/* Header */}
                        <div className="bg-zinc-900/90 border-b border-zinc-800 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                                <h2 className="text-cyan-500 font-mono text-xs tracking-[0.2em] uppercase">
                                    System_Specs // Overview
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-zinc-500 hover:text-red-500 transition-colors font-mono text-xs uppercase"
                            >
                                [CLOSE]
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 md:p-8 space-y-8 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_100%)]">

                            {/* Intro Text */}
                            <div className="font-mono text-zinc-400 text-xs leading-relaxed border-l-2 border-zinc-800 pl-4">
                                <span className="text-cyan-600 block mb-2">ACCESSING DMANDEV_CORE...</span>
                                This interface is constructed with high-performance operational libraries tailored for galactic exploration.
                            </div>

                            {/* Tech Stack Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {TECH_STACK.map((tech) => (
                                    <div key={tech.name} className="flex flex-col gap-1 p-3 border border-zinc-800/50 bg-zinc-950/50 hover:border-cyan-500/30 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <span className="text-cyan-100 font-bold text-sm tracking-tight">{tech.name}</span>
                                            <span className="text-[9px] text-green-500 font-mono">{tech.status}</span>
                                        </div>
                                        <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">{tech.category}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Status */}
                            <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-[9px] font-mono text-zinc-600 uppercase">
                                <span>Version: 2.5.0-ALPHA</span>
                                <span>Author: DmanDev</span>
                            </div>
                        </div>

                        {/* Scanlines Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] opacity-20" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
