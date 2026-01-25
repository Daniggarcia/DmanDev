"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-[2px] z-[100] pointer-events-none">
            <div className="flex flex-col items-center gap-6 p-12 bg-zinc-950/90 border border-zinc-800 rounded-lg shadow-[0_0_80px_rgba(0,0,0,0.8)] pointer-events-auto">

                {/* Loading Icon/Animation */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-t-2 border-r-2 border-cyan-500 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border-b-2 border-l-2 border-amber-500/50 rounded-full"
                    />
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_15px_white]" />
                </div>

                <div className="space-y-4 text-center">
                    <h2 className="text-cyan-500 font-mono text-sm tracking-[0.4em] uppercase animate-pulse">
                        Sincronizando flujo de datos
                    </h2>

                    {/* Progress Bar Container */}
                    <div className="w-72 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full"
                        />
                    </div>

                    <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                        ID: SYNC_PROCESS // ARCHIVE_ACCESS
                    </div>
                </div>
            </div>
        </div>
    );
}
