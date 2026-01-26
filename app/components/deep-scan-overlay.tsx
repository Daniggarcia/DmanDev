"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

// Mock Data Points that "appear" when scanned
const SCAN_MARKERS = [
    { id: 1, top: "5%", left: "5%", label: "NAV-SYSTEM", value: "ONLINE // LATENCY: 12ms", delay: 0.2 },
    { id: 2, top: "10%", right: "10%", label: "SECURITY", value: "AES-256 ENCRYPTED", delay: 0.5 },
    { id: 3, top: "40%", left: "50%", label: "RENDER ENGINE", value: "REACT SERVER COMPONENTS", delay: 1.0 },
    { id: 4, top: "80%", left: "10%", label: "FRAMEWORK", value: "NEXT.JS 14 STABLE", delay: 1.5 },
    { id: 5, top: "85%", right: "20%", label: "DEPLOYMENT", value: "VERCEL EDGE NETWORK", delay: 1.8 }
];

interface DeepScanOverlayProps {
    isScanning: boolean;
    onScanComplete: () => void;
}

export const DeepScanOverlay = ({ isScanning, onScanComplete }: DeepScanOverlayProps) => {
    useEffect(() => {
        if (isScanning) {
            const timer = setTimeout(() => {
                onScanComplete();
            }, 5000); // 5 seconds total scan duration
            return () => clearTimeout(timer);
        }
    }, [isScanning, onScanComplete]);

    return (
        <AnimatePresence>
            {isScanning && (
                <motion.div
                    className="absolute inset-0 z-[60] pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 1. SCANNING LASER BAR */}
                    <motion.div
                        className="absolute left-0 w-full h-1 bg-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.8)] z-50"
                        initial={{ top: "-10%" }}
                        animate={{ top: "110%" }}
                        transition={{ duration: 2.5, ease: "linear" }}
                    />

                    {/* 2. BACKGROUND GRID EFFECT (Briefly visible) */}
                    <motion.div
                        className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,_transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,_transparent_1px)] bg-[size:50px_50px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* 3. DATA MARKERS */}
                    {SCAN_MARKERS.map((marker) => (
                        <ScanMarker key={marker.id} marker={marker} />
                    ))}

                    {/* 4. HUD OVERLAY VIGNETTE */}
                    <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ScanMarker = ({ marker }: { marker: any }) => {
    return (
        <motion.div
            className="absolute flex flex-col items-start gap-1 font-mono text-[10px] text-cyan-400"
            style={{ top: marker.top, left: marker.left, right: marker.right }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: marker.delay, duration: 0.3 }}
        >
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 border border-cyan-500 bg-cyan-500/20 animate-spin" />
                <span className="font-bold tracking-wider bg-cyan-950/80 px-1 border border-cyan-500/30">
                    {marker.label}
                </span>
            </div>
            <div className="pl-4 text-cyan-200/80 bg-black/60 px-2 py-0.5 border-l-2 border-cyan-500/50">
                {marker.value}
            </div>
            {/* Connecting Line to nearest edge (Simulated) */}
            <motion.div
                className="absolute top-1/2 -left-10 w-10 h-[1px] bg-cyan-500/30"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: marker.delay, duration: 0.5 }}
            />
        </motion.div>
    );
};
