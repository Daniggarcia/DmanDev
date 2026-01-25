"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectMonitor({ projects = [] }: { projects: any[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Debug log to confirm component mount and data reception
    useEffect(() => {
        console.log("Monitor Mounted. Project Count:", projects?.length);
    }, [projects]);

    const currentProject = projects?.[activeIndex];

    const nextProject = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    if (!projects || projects.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full bg-black/80 text-red-500 font-mono text-xl z-[100]">
                [SYSTEM ERROR]: NO PROJECT DATA STREAM DETECTED
            </div>
        );
    }

    if (!currentProject) return null;

    // Function to generate project-specific hub stats
    const getHubStats = (index: number) => {
        const seed = index * 123;
        const stats = [
            { label: "CORES", value: 40 + (seed % 60) },
            { label: "UPTIME", value: 70 + (seed % 30) },
            { label: "LOAD", value: 10 + (seed % 80) },
            { label: "INTEGRITY", value: 85 + (seed % 15) },
            { label: "BUFFER", value: 30 + (seed % 50) }
        ];
        // Return a selection of 3 based on index
        return [
            stats[index % 5],
            stats[(index + 1) % 5],
            stats[(index + 2) % 5]
        ];
    };

    const hubStats = getHubStats(activeIndex);

    return (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-2 md:p-8 pointer-events-auto">

            {/* 2. THE MONITOR (CONTENT WINDOW) */}
            <div className="relative z-10 w-full h-full max-w-6xl max-h-[90%] bg-black border-2 border-zinc-800 rounded-lg overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col">

                {/* Header */}
                <div className="h-10 md:h-12 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
                    <div className="flex items-center gap-4">
                        <span className="text-cyan-600 font-mono text-[10px]">LOG_ID: {activeIndex + 1}</span>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <h2 className="text-cyan-500 font-mono tracking-widest text-[10px] md:text-sm truncate mx-4">
                        PROJECT_ARCHIVE // DATABASE_ACCESS
                    </h2>
                    <Link href="/" className="text-zinc-600 hover:text-cyan-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    </Link>
                </div>

                {/* Carousel Area */}
                <div className="flex-1 relative flex items-center justify-between px-2 md:px-8 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">

                    <button onClick={prevProject} className="p-2 text-cyan-800 hover:text-cyan-400 transition-colors z-20 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>

                    <div className="flex-1 h-full relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProject.slug}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full flex flex-col md:flex-row gap-8 p-6 md:p-12 items-center md:items-center" // Centered items-center
                            >
                                <div className="flex-1 flex flex-col justify-center h-full">
                                    <div className="text-[10px] text-cyan-700 font-mono mb-2 uppercase tracking-widest">
                                        ESTABLISHED: {currentProject.date ? new Date(currentProject.date).getFullYear() : 'CLASSIFIED'}
                                    </div>
                                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-tighter leading-none text-glow">
                                        {currentProject.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm md:text-lg leading-relaxed mb-8 md:line-clamp-4 lg:line-clamp-none max-w-2xl">
                                        {currentProject.description}
                                    </p>

                                    <Link
                                        href={`/projects/${currentProject.slug}`}
                                        className="inline-flex items-center gap-2 w-fit px-8 py-3 border border-cyan-900 bg-cyan-950/20 text-cyan-400 text-xs font-mono hover:bg-cyan-900 hover:text-white transition-all uppercase tracking-widest"
                                    >
                                        Open Data Stream
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </Link>
                                </div>

                                {/* Dynamic Visual HUB Stats */}
                                <div className="hidden lg:flex w-1/4 h-[70%] border-l border-zinc-800/50 pl-8 flex-col justify-center gap-10 opacity-80 shrink-0">
                                    <div className="flex flex-col gap-8 pt-4">
                                        {hubStats.map((stat, i) => (
                                            <div key={i} className="flex flex-col gap-3">
                                                <div className="flex justify-between items-end">
                                                    <div className="text-[8px] text-zinc-400 font-mono uppercase tracking-widest">{stat.label}</div>
                                                    <div className="text-[10px] text-cyan-400 font-mono font-bold">{stat.value}%</div>
                                                </div>
                                                <div className="h-1.5 bg-zinc-900 w-full rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${stat.value}%` }}
                                                        className="h-full bg-cyan-500"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        {/* Status Grid Decoration */}
                                        <div className="grid grid-cols-4 gap-2 mt-4">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className={`h-1 rounded-full ${i % 3 === 0 ? 'bg-amber-500/80 animate-pulse transition-opacity' : 'bg-zinc-800'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button onClick={nextProject} className="p-2 text-cyan-800 hover:text-cyan-400 transition-colors z-20 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>

                {/* Footer */}
                <div className="h-8 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between px-4 shrink-0">
                    <span className="text-[9px] text-zinc-600 font-mono">ENCRYPTION: RIJNDAEL_256</span>
                    <span className="text-[9px] text-zinc-600 font-mono uppercase">SYSLOG // STATUS_OK</span>
                </div>
            </div>
        </div>
    );
}
