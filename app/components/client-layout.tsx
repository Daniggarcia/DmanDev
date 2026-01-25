"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "./particles";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
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

            {/* Layer A: Planet (Interactive) */}
            <motion.div
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                animate={{
                    x: mousePos.x * -30, // Pan opposite to mouse
                    y: mousePos.y * -30,
                    scale: 1 + Math.abs(mousePos.x * mousePos.y) * 0.1 // Slight zoom on movement
                }}
                transition={{ type: "spring", damping: 20, stiffness: 50 }}
            >
                <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-cyan-900 via-blue-900 to-black shadow-[0_0_80px_rgba(0,100,200,0.4)] opacity-80 overflow-hidden">
                    {/* Planet Texture/Atmosphere Detail */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.1),_transparent)]" />
                </div>
                {/* Ring / Strut hint */}
                <div className="absolute w-[150%] h-px bg-blue-500/20 rotate-[-15deg] blur-sm" />
            </motion.div>

            {/* Layer B: Stars / Hyperspace */}
            <div className={`absolute inset-0 z-1 transition-opacity duration-1000 ${isProjects ? 'opacity-40' : 'opacity-80'}`}>
                <Particles
                    className="absolute inset-0"
                    quantity={isProjects ? 150 : 300}
                    warp={!isProjects}
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
                                NAV-COM // SECURE-LINK // {pathname.toUpperCase() || 'HOME'}
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
            <div className="relative z-40 w-full h-full">
                {children}
            </div>
        </div>
    );
}
