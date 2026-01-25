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

    return (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-4 md:p-10 pointer-events-auto">

            {/* 2. THE MONITOR (CONTENT WINDOW) */}
            <div className="relative z-10 w-full max-w-6xl aspect-video bg-black border-2 border-zinc-800 rounded-lg overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col">

                {/* Header */}
                <div className="h-10 md:h-12 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <span className="text-cyan-600 font-mono text-[10px]">RECORD: {activeIndex + 1}</span>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <h2 className="text-cyan-500 font-mono tracking-widest text-[10px] md:text-sm truncate mx-4">
                        PROJECTS // DATABASE // ARCHIVE
                    </h2>
                    <Link href="/" className="text-zinc-600 hover:text-cyan-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    </Link>
                </div>

                {/* Carousel Area */}
                <div className="flex-1 relative flex items-center justify-between px-2 md:px-8 bg-gradient-to-b from-zinc-950 to-black">

                    <button onClick={prevProject} className="p-2 text-cyan-800 hover:text-cyan-400 transition-colors z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>

                    <div className="flex-1 h-full relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProject.slug}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full flex flex-col md:flex-row gap-8 p-6 md:p-12 items-center md:items-start"
                            >
                                <div className="flex-1">
                                    <div className="text-[10px] text-cyan-700 font-mono mb-2">DATE: {currentProject.date ? new Date(currentProject.date).getFullYear() : 'CLASSIFIED'}</div>
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter leading-none">
                                        {currentProject.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm md:text-lg leading-relaxed mb-8 md:line-clamp-5 xl:line-clamp-none">
                                        {currentProject.description}
                                    </p>

                                    <Link
                                        href={`/projects/${currentProject.slug}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-900 bg-cyan-950/20 text-cyan-400 text-xs font-mono hover:bg-cyan-900 hover:text-white transition-all uppercase tracking-widest"
                                    >
                                        Access Files
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </Link>
                                </div>

                                {/* Visual Decoration */}
                                <div className="hidden lg:block w-1/4 h-full border-l border-zinc-800/50 pl-8 opacity-40">
                                    <div className="flex flex-col gap-6 pt-10">
                                        {[50, 80, 20].map((val, i) => (
                                            <div key={i} className="flex flex-col gap-2">
                                                <div className="h-1 bg-zinc-800 w-full"><div className="h-full bg-cyan-500" style={{ width: `${val}%` }} /></div>
                                                <div className="text-[8px] text-zinc-600 font-mono uppercase">DATA-SEQ-0{i + 1}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button onClick={nextProject} className="p-2 text-cyan-800 hover:text-cyan-400 transition-colors z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>

                {/* Footer */}
                <div className="h-8 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between px-4">
                    <span className="text-[9px] text-zinc-600 font-mono">STATUS: STABLE</span>
                    <span className="text-[9px] text-zinc-600 font-mono uppercase">ENCRYPTION: RIJNDAEL_AES_256</span>
                </div>
            </div>
        </div>
    );
}

