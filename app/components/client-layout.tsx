"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "./particles";
import { CodeTerminal } from "./code-terminal";
import { TechInfoModal } from "./tech-info-modal";
import { DeepScanOverlay } from "./deep-scan-overlay";

import { ThemeProvider, useTheme } from "./theme-provider";

const GALAXY_THEMES = [
    {
        name: "Galaxy-Core",
        objects: [
            { type: "planet", position: "bottom-[-5%] left-[-10%] md:bottom-[-2%] md:left-[5%]", size: "w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem]", bg: "bg-gradient-to-br from-blue-950 via-zinc-900 to-black", border: "border-blue-500/15", glow: "shadow-[0_0_120px_rgba(0,100,250,0.15)]", overlay: "bg-[radial-gradient(circle_at_30%_30%,_rgba(100,200,255,0.4),_transparent_70%)]", depth: 2 },
            { type: "ringed", position: "top-[15%] right-[20%]", size: "w-32 h-32 md:w-56 md:h-56", bg: "bg-gradient-to-tr from-zinc-950 via-amber-900/40 to-cyan-900/30", rings: "border-cyan-500/10", glow: "shadow-[0_0_60px_rgba(0,0,0,1)] ring-cyan-500/20", depth: 1 }
        ]
    },
    {
        name: "Crimson-Nebula",
        objects: [
            { type: "ringed", position: "left-[5%] top-[10%]", size: "w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem]", bg: "bg-gradient-to-br from-orange-300 via-stone-500 to-zinc-900", rings: "border-orange-200/40", glow: "shadow-[0_0_100px_rgba(255,200,150,0.3)]", depth: 1.5 },
            { type: "debris", position: "bottom-[20%] right-[30%]", size: "w-16 h-12", bg: "bg-stone-800", border: "border-stone-600/50", depth: 0.5 },
            { type: "debris", position: "top-[10%] right-[10%]", size: "w-24 h-16", bg: "bg-zinc-900", border: "border-zinc-700/50", depth: 0.8 },
            { type: "debris", position: "bottom-[10%] left-[40%]", size: "w-12 h-10", bg: "bg-stone-900", border: "border-stone-600/50", depth: 0.4 }
        ]
    },
    {
        name: "Emerald-Sector",
        objects: [
            { type: "tech", position: "bottom-[-10%] right-[-5%]", size: "w-[40rem] h-[40rem] md:w-[60rem] md:h-[60rem]", bg: "bg-zinc-950", border: "border-emerald-500/30", glow: "shadow-[0_0_100px_rgba(16,185,129,0.2)]", depth: 2 }, // Tech planet has grid/lines
            { type: "cloud", position: "top-[10%] left-[10%]", size: "w-96 h-64", bg: "bg-emerald-900/20", glow: "blur-3xl", depth: 0.5 },
            { type: "cloud", position: "top-[40%] right-[30%]", size: "w-64 h-64", bg: "bg-teal-900/20", glow: "blur-3xl", depth: 0.7 }
        ]
    },
    {
        name: "Golden-Rim",
        objects: [
            { type: "ringed", position: "top-[20%] left-[20%]", size: "w-48 h-48 md:w-80 md:h-80", bg: "bg-gradient-to-tr from-yellow-900 via-amber-700 to-yellow-500/20", rings: "border-yellow-500/20", glow: "shadow-[0_0_80px_rgba(255,200,0,0.2)]", depth: 1.5 },
            // Asteroids
            { type: "debris", position: "top-[10%] right-[20%]", size: "w-4 h-4 rounded-full", bg: "bg-amber-800", depth: 0.2 },
            { type: "debris", position: "top-[30%] right-[10%]", size: "w-6 h-6 rounded-full", bg: "bg-yellow-900", depth: 0.3 },
            { type: "debris", position: "bottom-[40%] left-[10%]", size: "w-8 h-8 rounded-full", bg: "bg-stone-700", depth: 0.4 },
            { type: "debris", position: "bottom-[10%] right-[30%]", size: "w-5 h-5 rounded-full", bg: "bg-amber-950", depth: 0.25 },
            { type: "debris", position: "top-[50%] left-[5%]", size: "w-3 h-3 rounded-full", bg: "bg-yellow-950", depth: 0.15 }
        ]
    },
    {
        name: "Violet-Void",
        objects: [
            { type: "black-hole", position: "center", size: "w-[20rem] h-[20rem] md:w-[35rem] md:h-[35rem]", bg: "bg-black", border: "border-purple-500/50", glow: "shadow-[0_0_150px_rgba(147,51,234,0.5)] ring-4 ring-purple-900/50", depth: 1 },
            { type: "star", position: "top-[20%] right-[25%]", size: "w-16 h-16", bg: "bg-white", glow: "shadow-[0_0_40px_white]", depth: 0.5 } // Being consumed
        ]
    }
];

function InnerCockpitLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isProjects = pathname === "/projects" || pathname.startsWith("/projects/");

    const [showTechInfo, setShowTechInfo] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    const triggerDeepScan = () => {
        setIsScanning(!isScanning);
    };

    // Warp & Galaxy Logic
    const [isWarpSpeed, setIsWarpSpeed] = useState(false);
    const [galaxyIndex, setGalaxyIndex] = useState(0);
    const currentTheme = GALAXY_THEMES[galaxyIndex];

    const triggerHyperJump = () => {
        if (isWarpSpeed) return;
        setIsWarpSpeed(true);

        // 1.5s into warp: switch galaxy
        setTimeout(() => {
            setGalaxyIndex((prev) => (prev + 1) % GALAXY_THEMES.length);
        }, 1500);

        // 3s total: exit warp
        setTimeout(() => {
            setIsWarpSpeed(false);
        }, 3000);
    };

    const { theme, cycleTheme, colors } = useTheme();

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

                {currentTheme.objects.map((obj: any, i) => (
                    <motion.div
                        key={`${currentTheme.name}-${i}`}
                        className={`absolute ${obj.position === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : obj.position}`}
                        initial={{ opacity: 0 }}
                        animate={{
                            x: mousePos.x * -30 * (obj.depth || 1),
                            y: mousePos.y * -30 * (obj.depth || 1),
                            rotate: obj.type === 'debris' ? mousePos.x * 10 : mousePos.x * 2,
                            opacity: isWarpSpeed ? 0 : 1,
                            scale: isWarpSpeed ? 0 : 1
                        }}
                        transition={{ type: "spring", damping: 30, stiffness: 35, opacity: { duration: 0.5 } }}
                    >
                        {/* 1. STANDARD PLANET */}
                        {obj.type === 'planet' && (
                            <div className={`relative ${obj.size} rounded-full overflow-hidden ${obj.glow} transition-all duration-1000`}>
                                <div className={`absolute inset-0 ${obj.bg} transition-colors duration-1000`} />
                                {obj.overlay && <div className={`absolute inset-0 ${obj.overlay} blur-[2px]`} />}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_transparent_20%,_rgba(0,0,0,0.85)_80%)]" />
                                <div className={`absolute inset-0 border-[4px] ${obj.border} rounded-full blur-[1px]`} />
                            </div>
                        )}

                        {/* 2. RINGED PLANET */}
                        {obj.type === 'ringed' && (
                            <div className="relative flex items-center justify-center">
                                {/* Back Rings */}
                                <div className={`absolute w-[250%] h-[30%] border-[10px] md:border-[20px] ${obj.rings} rounded-[100%] rotate-[-25deg] blur-[3px] shadow-[0_0_30px_currentColor] transition-colors duration-1000`} />
                                <div className="absolute w-[250%] h-[30%] border-[2px] border-white/5 rounded-[100%] rotate-[-25deg]" />

                                {/* Planet Body */}
                                <div className={`relative ${obj.size} rounded-full overflow-hidden ${obj.glow} ring-1 transition-all duration-1000`}>
                                    <div className={`absolute inset-0 ${obj.bg} transition-colors duration-1000`} />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_transparent,_rgba(0,0,0,0.9)_90%)]" />
                                </div>

                                {/* Front Rings (Clipped) */}
                                <div className={`absolute z-10 w-[250%] h-[30%] border-[10px] md:border-[20px] ${obj.rings} rounded-[100%] rotate-[-25deg] blur-[3px] shadow-[0_0_30px_currentColor] transition-colors duration-1000`} style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />
                                <div className="absolute z-10 w-[250%] h-[30%] border-[2px] border-white/5 rounded-[100%] rotate-[-25deg]" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />
                            </div>
                        )}

                        {/* 3. SUN (Pulsing) */}
                        {obj.type === 'sun' && (
                            <div className={`relative ${obj.size} rounded-full ${obj.bg} ${obj.glow} animate-[pulse_4s_ease-in-out_infinite] transition-all duration-1000`}>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2),_transparent)]" />
                            </div>
                        )}

                        {/* 4. BLACK HOLE */}
                        {obj.type === 'black-hole' && (
                            <div className={`relative ${obj.size} rounded-full bg-black ${obj.border} ${obj.glow} flex items-center justify-center`}>
                                <div className="absolute inset-0 rounded-full border-[1px] border-white/20 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-[-10%] rounded-full border-[20px] border-purple-900/20 blur-xl" />
                                <div className="w-[90%] h-[90%] bg-black rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,1)] z-10" />
                            </div>
                        )}

                        {/* 5. TECH PLANET */}
                        {obj.type === 'tech' && (
                            <div className={`relative ${obj.size} rounded-full overflow-hidden ${obj.bg} ${obj.border} ${obj.glow}`}>
                                {/* Grid Lines */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,_transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,_transparent_1px)] bg-[size:40px_40px]" />
                                <div className="absolute inset-0 border-[2px] border-emerald-500/50 rounded-full" />
                            </div>
                        )}

                        {/* 6. DEBRIS / ASTEROID */}
                        {obj.type === 'debris' && (
                            <div className={`relative ${obj.size} ${obj.bg} ${obj.border ? `border ${obj.border}` : ''} transform rotate-45 shadow-lg`} style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
                        )}

                        {/* 7. CLOUD / NEBULA */}
                        {obj.type === 'cloud' && (
                            <div className={`relative ${obj.size} ${obj.bg} ${obj.glow} rounded-full opacity-60 animate-[pulse_8s_ease-in-out_infinite]`} />
                        )}

                        {/* 8. STAR (Consumed) */}
                        {obj.type === 'star' && (
                            <div className={`relative ${obj.size} rounded-full ${obj.bg} ${obj.glow} animate-pulse`} />
                        )}
                    </motion.div>
                ))}

            </div>

            {/* Layer B: Stars / Hyperspace (Enhanced Visibility) */}
            <div className={`absolute inset-0 z-1 transition-opacity duration-1000 ${isProjects ? 'opacity-40' : 'opacity-100'}`}>
                <Particles
                    className="absolute inset-0"
                    quantity={isHome ? 450 : 250} // More stars
                    warp={isWarpSpeed} // Warp ONLY on Home or when activated
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
                            <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor] ${colors.bg} ${colors.text}`} />
                            <div className={`font-mono text-[10px] md:text-xs tracking-widest uppercase ${colors.text}`}>
                                NAV-COM // {isWarpSpeed ? "HYPER-JUMP-ACTIVE" : currentTheme.name.toUpperCase()} // {pathname === "/" ? "BRIDGE" : pathname.replace("/", "").toUpperCase()}
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
                        <div className={`w-2 h-2 rounded-full animate-pulse delay-500 ${colors.bg}/50`} />
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-12 md:h-20 bg-zinc-900 border-t-2 border-zinc-800 flex justify-between items-center px-4 md:px-10 gap-8 overflow-hidden">

                        {/* 1. Left: System Status (Smaller Bar) */}
                        <div className="flex flex-col gap-1 w-1/3">
                            <div className="text-[8px] text-zinc-600 font-mono tracking-widest uppercase">System Load</div>
                            <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden flex">
                                <motion.div
                                    animate={{ width: ["10%", "90%", "40%", "75%"] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className={`h-full ${colors.bg}/40`}
                                />
                            </div>
                        </div>

                        {/* 2. Middle: Interactive Radar Hub */}
                        <div className="flex items-center justify-center gap-3 md:gap-6 pointer-events-auto z-20 scale-90 md:scale-100 origin-bottom">

                            {/* Button 1 (Left Outer) - Tech Info */}
                            <button
                                onClick={() => setShowTechInfo(true)}
                                className="w-10 h-10 bg-zinc-900 border border-zinc-700 hover:bg-cyan-950 hover:border-cyan-500 rounded-full transition-all duration-300 flex items-center justify-center group shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                title="System Specs"
                            >
                                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full group-hover:animate-ping" />
                            </button>

                            {/* Button 2 (Left Inner) - Warp Speed (Toggle) */}
                            <button
                                onClick={() => setIsWarpSpeed(!isWarpSpeed)}
                                className={`w-10 h-10 bg-zinc-900 border ${isWarpSpeed ? 'border-green-400 bg-green-900/20' : 'border-zinc-700'} hover:bg-green-950 hover:border-green-500 rounded-full transition-all duration-300 flex items-center justify-center group shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                                title="Toggle Warp (Stars Only)"
                            >
                                <div className={`w-1.5 h-1.5 ${isWarpSpeed ? 'bg-green-400 animate-ping' : 'bg-green-500'} rounded-full opacity-50 group-hover:opacity-100`} />
                            </button>

                            {/* Central Radar */}
                            <button
                                onClick={triggerDeepScan}
                                className={`w-16 h-16 border-2 ${isScanning ? 'border-cyan-500 animate-[spin_2s_linear_infinite]' : 'border-zinc-800'} rounded-full bg-black relative flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-cyan-500/50`}
                                title="Initiate Deep Scan"
                            >
                                <div className={`absolute inset-0 border-2 border-t-transparent ${isScanning ? 'border-cyan-500' : colors.border + '/80'} rounded-full animate-spin`} />
                                <div className={`w-1.5 h-1.5 ${isScanning ? 'bg-cyan-400' : colors.bg} rounded-full animate-pulse`} />
                            </button>

                            {/* Button 3 (Right Inner) - Hyper Jump (New!) */}
                            <button
                                onClick={triggerHyperJump}
                                className="w-10 h-10 bg-zinc-900 border border-zinc-700 hover:bg-amber-950 hover:border-amber-500 rounded-full transition-all duration-300 flex items-center justify-center group shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                title="Initiate Hyper Jump"
                            >
                                <div className={`w-1.5 h-1.5 bg-amber-500 rounded-full opacity-50 group-hover:opacity-100 ${isWarpSpeed ? 'animate-ping' : ''}`} />
                            </button>

                            {/* Button 4 (Right Outer) - Theme Switch */}
                            <button
                                onClick={cycleTheme}
                                className={`w-10 h-10 bg-zinc-900 border ${colors.border} hover:border-white rounded-full transition-all duration-300 flex items-center justify-center group shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                                title="System Mode switch"
                            >
                                <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full opacity-100`} />
                            </button>

                        </div>

                        {/* 3. Right: Code Terminal (Star Wars / C++) */}
                        <div className="w-1/3 h-full py-1 opacity-80 hover:opacity-100 transition-opacity">
                            <CodeTerminal theme={theme} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. CONTENT LAYER */}
            <div className="relative z-40 w-full h-full p-[12px] md:p-[24px]">
                {children}
            </div>

            {/* Modals */}
            <TechInfoModal isOpen={showTechInfo} onClose={() => setShowTechInfo(false)} />
            <DeepScanOverlay isScanning={isScanning} onScanComplete={() => setIsScanning(false)} />
        </div>
    );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <InnerCockpitLayout>
                {children}
            </InnerCockpitLayout>
        </ThemeProvider>
    );
}
