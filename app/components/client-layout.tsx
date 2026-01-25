"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "./particles";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isProjects = pathname === "/projects" || pathname.startsWith("/projects/");

    // Parallax logic
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black text-white">

            {/* 1. BACKGROUND LAYERS (PARALLAX) */}

            {/* Container for Planets (Multi-Depth Parallax) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

                {/* Layer A1: Main Planet (Professional Surface - Bottom-Left Focus) */}
                <motion.div
                    className="absolute bottom-[-5%] left-[-10%] md:bottom-[-2%] md:left-[5%]"
                    animate={{
                        x: mousePos.x * -60,
                        y: mousePos.y * -60,
                        rotate: mousePos.x * 2 // Subtle rotation
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 35 }}
                >
                    <div className="relative w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] rounded-full overflow-hidden shadow-[0_0_120px_rgba(0,100,250,0.15)] opacity-90">
                        {/* Visual Layers for Depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-zinc-900 to-black" />
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,_rgba(100,200,255,0.4),_transparent_70%)] blur-[2px]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_transparent_20%,_rgba(0,0,0,0.85)_80%)]" />
                        <div className="absolute inset-0 border-[4px] border-blue-500/15 rounded-full blur-[1px]" />
                    </div>
                </motion.div>

                {/* Layer A2: Secondary Ringed Planet (Top-Right Focus) */}
                <motion.div
                    className="absolute top-[15%] right-[20%] z-0"
                    animate={{
                        x: mousePos.x * -35, // Slower for depth
                        y: mousePos.y * -35,
                        scale: 1 + Math.abs(mousePos.x) * 0.02
                    }}
                    transition={{ type: "spring", damping: 25, stiffness: 45 }}
                >
                    <div className="relative flex items-center justify-center">
                        {/* The Rings (Behind) */}
                        <div className="absolute w-[250%] h-[30%] border-[10px] md:border-[20px] border-cyan-500/10 rounded-[100%] rotate-[-25deg] blur-[3px] shadow-[0_0_30px_rgba(34,211,238,0.1)]" />
                        <div className="absolute w-[250%] h-[30%] border-[2px] border-white/5 rounded-[100%] rotate-[-25deg]" />

                        {/* Planet Body */}
                        <div className="relative w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,1)] ring-1 ring-cyan-500/20">
                            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-amber-900/40 to-cyan-900/30" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_transparent,_rgba(0,0,0,0.9)_90%)]" />
                            {/* Atmosphere Sidelight */}
                            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(110deg,_rgba(34,211,238,0.3)_0%,_transparent_40%)]" />
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Layer B: Stars / Hyperspace (Enhanced Visibility) */}
            <div className={`absolute inset-0 z-1 transition-opacity duration-1000 ${isProjects ? 'opacity-40' : 'opacity-100'}`}>
                <Particles
                    className="absolute inset-0"
                    quantity={isHome ? 450 : 250} // More stars
                    warp={isHome} // Warp ONLY on Home
                    refresh={true}
                />
            </div>

            {/* 2. GLOBAL TECH FRAME (NAV-COM) */}
            <div className="absolute inset-0 pointer-events-none z-50">
                {/* Main Chassis */}
                <div className="w-full h-full border-[12px] md:border-[24px] border-zinc-900 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] relative">

                    {/* Top Bar (NAV-COM) */}
                    <div className="absolute top-0 left-0 w-full h-12 md:h-16 bg-zinc-900 border-b-2 border-zinc-800 flex justify-between px-6 items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_cyan]" />
                            <div className="text-cyan-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">
                                NAV-COM // SECURE-LINK // {pathname === "/" ? "BRIDGE" : pathname.replace("/", "").toUpperCase()}
                            </div>
                        </div>
                        <div className="text-zinc-600 font-mono text-[8px] md:text-[10px] hidden sm:block">
                            FREQ: 432.112 MHZ // ENCR: AES-256
                        </div>
                    </div>

                    {/* Left Bezel Side Detail */}
                    <div className="absolute left-0 top-16 bottom-16 w-8 md:w-16 bg-gradient-to-r from-zinc-900 to-transparent border-r-2 border-zinc-800/50 flex flex-col justify-center items-center gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-0.5 h-12 bg-zinc-800/80" />
                        ))}
                        <div className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse" />
                    </div>

                    {/* Right Bezel Side Detail */}
                    <div className="absolute right-0 top-16 bottom-16 w-8 md:w-16 bg-gradient-to-l from-zinc-900 to-transparent border-l-2 border-zinc-800/50 flex flex-col justify-center items-center gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-0.5 h-12 bg-zinc-800/80" />
                        ))}
                        <div className="w-2 h-2 rounded-full bg-cyan-500/50 animate-pulse delay-500" />
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-12 md:h-16 bg-zinc-900 border-t-2 border-zinc-800 flex justify-center items-center px-10">
                        <div className="w-1/2 h-1.5 bg-zinc-950 rounded-full overflow-hidden flex">
                            <motion.div
                                animate={{ width: ["10%", "90%", "40%", "75%"] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="h-full bg-cyan-600/40"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. CONTENT LAYER */}
            <div className="relative z-40 w-full h-full p-[12px] md:p-[24px]">
                {children}
            </div>
        </div>
    );
}
