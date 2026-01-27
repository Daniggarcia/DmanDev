"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ProjectMonitorProps {
    isOpen: boolean;
    onClose: () => void;
}

const PROJECTS = [
    { name: "Deloitte / Repsol", type: "ERMT System", status: "Secure", color: "text-amber-500", slug: "Repsol" },
    { name: "BerlinSBI", type: "EduTech Platform", status: "Online", color: "text-blue-400", slug: "BerlinSBI" },
    { name: "Gisma", type: "University Web", status: "Online", color: "text-cyan-400", slug: "Gisma" },
    { name: "LCCA", type: "Creative Arts", status: "Archived", color: "text-purple-400", slug: "LCCA" },
    { name: "LSBF", type: "Business School", status: "Online", color: "text-red-400", slug: "LSBF" },
    { name: "MUA", type: "Medical Academy", status: "Online", color: "text-emerald-400", slug: "MUA" },
];

export const ProjectMonitor = ({ isOpen, onClose }: ProjectMonitorProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Monitor Overlay */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="pointer-events-auto w-[90vw] md:w-[600px] bg-black/80 border-[2px] border-cyan-500/50 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.2)] font-mono relative">

                            {/* Header */}
                            <div className="bg-cyan-950/30 border-b border-cyan-500/30 p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
                                    <h2 className="text-cyan-400 tracking-[0.2em] text-sm md:text-base font-bold">PROJECT_ARCHIVES // MONITOR</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-cyan-600 hover:text-cyan-300 transition-colors"
                                >
                                    [CLOSE]
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                {/* Grid Background */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,_transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                                <div className="space-y-3 relative z-10">
                                    {PROJECTS.map((project, i) => (
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={project.name}
                                        >
                                            <Link
                                                href={`/projects/${project.slug}`}
                                                onClick={onClose}
                                                className="flex items-center justify-between border-b border-cyan-500/10 pb-2 hover:bg-cyan-500/10 transition-colors p-2 rounded cursor-pointer group"
                                            >
                                                <div>
                                                    <div className="text-white text-sm md:text-base font-bold group-hover:text-cyan-400 transition-colors">{project.name}</div>
                                                    <div className="text-[10px] text-cyan-600 uppercase tracking-wider">{project.type}</div>
                                                </div>
                                                <div className={`text-[10px] md:text-xs font-mono border border-current px-2 py-0.5 rounded ${project.color}`}>
                                                    {project.status}
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer / Action */}
                                <div className="mt-8 flex justify-center">
                                    <Link href="/projects" onClick={onClose}>
                                        <button className="group relative px-6 py-2 bg-cyan-950/50 border border-cyan-500 text-cyan-400 font-bold tracking-widest hover:bg-cyan-500 hover:text-black transition-all duration-300">
                                            <span className="absolute inset-0 w-full h-full bg-cyan-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                            ACCESS FULL ARCHIVES
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
