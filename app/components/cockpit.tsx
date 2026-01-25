"use client";

import React, { useEffect, useState } from "react";

export const Cockpit = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 z-50 pointer-events-none w-full h-full flex flex-col justify-between overflow-hidden">

            {/* --- TOP FRAME (3-Window Structure) --- */}
            {/* w-full and -ml-1 to ensure no side gaps. Grid for structure. */}
            <div className="w-[101%] -ml-[1px] h-16 md:h-24 bg-transparent flex justify-between items-start relative">

                {/* Top Bar Background */}
                <div className="absolute top-0 left-0 w-full h-8 md:h-12 bg-gradient-to-b from-zinc-950 via-zinc-900 to-transparent border-b border-zinc-800/50" />

                {/* Top Left Panel */}
                <div className="relative w-1/4 h-full border-r border-zinc-800/80 bg-gradient-to-b from-zinc-950/80 to-transparent clip-path-corner-tl backdrop-blur-sm z-10 hidden md:block">
                    <div className="absolute top-3 left-4 flex gap-4 items-center">
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                                <div className="w-8 h-1 bg-cyan-900 rounded-sm" />
                                <div className="w-8 h-1 bg-cyan-500 rounded-sm shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                            </div>
                            <div className="text-[9px] text-cyan-400 font-mono tracking-widest opacity-80">
                                SYS.01
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Center - Clean View */}
                <div className="flex-1 h-8 md:h-12 flex justify-center items-center z-10">
                    <div className="w-48 h-full border-x border-b border-zinc-800/30 flex justify-center items-center gap-8 bg-zinc-950/20 backdrop-blur-[1px]">
                        <div className="text-[10px] text-zinc-600 font-mono">DMAN-DEV // PROTOCOL</div>
                    </div>
                </div>

                {/* Top Right Panel */}
                <div className="relative w-1/4 h-full border-l border-zinc-800/80 bg-gradient-to-b from-zinc-950/80 to-transparent clip-path-corner-tr backdrop-blur-sm z-10 hidden md:block">
                    <div className="absolute top-3 right-4 text-right">
                        <div className="text-[9px] text-amber-500 font-mono tracking-wider">
                            SECTOR [7G]
                        </div>
                    </div>
                </div>
            </div>

            {/* --- VERTICAL STRUTS (The "Pillars") --- */}
            <div className="absolute inset-0 flex w-full h-full pointer-events-none">
                {/* Left Strut */}
                <div className="absolute left-0 md:left-[25%] w-8 md:w-16 h-full bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent border-r border-zinc-800/30 clip-path-left opacity-90 backdrop-blur-md hidden md:block">
                    {/* Vertical wiring/lights */}
                    <div className="absolute left-2 top-1/3 w-1 h-32 bg-zinc-800/50 rounded-full flex flex-col justify-evenly items-center py-2">
                        <div className="w-px h-full bg-cyan-900/50" />
                    </div>
                </div>

                {/* Right Strut */}
                <div className="absolute right-0 md:right-[25%] w-8 md:w-16 h-full bg-gradient-to-l from-zinc-950 via-zinc-900/90 to-transparent border-l border-zinc-800/30 clip-path-right opacity-90 backdrop-blur-md hidden md:block">
                    {/* Vertical wiring/lights */}
                    <div className="absolute right-2 top-1/3 w-1 h-32 bg-zinc-800/50 rounded-full flex flex-col justify-evenly items-center py-2">
                        <div className="w-px h-full bg-amber-900/50" />
                    </div>
                </div>
            </div>

            {/* --- DASHBOARD (Bottom) --- */}
            <div className="w-full h-auto min-h-[100px] md:min-h-[180px] relative flex justify-center items-end pb-0 perspective-1000 z-20">

                {/* Main Dashboard Container */}
                <div className="w-full max-w-7xl grid grid-cols-12 items-end px-4 md:px-0">

                    {/* Left Console (Hidden on Mobile) */}
                    <div className="hidden md:flex col-span-3 h-32 bg-zinc-950 border-t border-r border-zinc-800 rounded-tr-[40px] p-4 flex-col justify-end relative shadow-2xl mr-[-1rem]">
                        {/* Detail Lights */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="h-1 bg-zinc-800" />
                            <div className="h-1 bg-amber-500/50 blink-random" />
                        </div>
                        <div className="w-full h-16 border border-zinc-800 bg-black/50 rounded flex items-center justify-center relative overflow-hidden">
                            <div className="text-[10px] text-cyan-600 font-mono">
                                // DIAGNOSTICS
                            </div>
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.05)_50%)] bg-[length:100%_3px] pointer-events-none" />
                        </div>
                    </div>

                    {/* Middle Control (Spans full width on mobile) */}
                    <div className="col-span-12 md:col-span-6 h-24 md:h-20 bg-zinc-950/90 border-t border-zinc-800 rounded-t-[20px] mx-0 md:mx-4 flex justify-center items-center relative backdrop-blur-md shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
                        <div className="w-[90%] h-12 border border-zinc-800/50 rounded flex justify-between px-4 items-center bg-black/40">
                            <div className="text-[9px] text-zinc-500 font-mono hidden md:block">VEL: MACH 10</div>
                            <div className="flex gap-2 w-full md:w-auto justify-center">
                                {/* Central flight indicators */}
                                <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-cyan-500/20 rounded-full animate-pulse" />
                                </div>
                                <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-amber-500/20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Console (Hidden on Mobile) */}
                    <div className="hidden md:flex col-span-3 h-32 bg-zinc-950 border-t border-l border-zinc-800 rounded-tl-[40px] p-4 flex-col justify-end text-right shadow-2xl ml-[-1rem]">
                        <div className="flex justify-end gap-3 mb-4">
                            <div className="w-2 h-2 rounded-full bg-red-900 blink-red" />
                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_5px_#f59e0b]" />
                        </div>
                        <div className="mt-2 text-[9px] text-zinc-600 font-mono">
                            HYPERDRIVE: READY
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};
