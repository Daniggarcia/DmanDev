// Mejoras a app/page.tsx

"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from "next/image";

const Particles = dynamic(() => import("./components/particles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10"></div>,
});

import { useMousePosition } from "@/util/mouse";
import { Cockpit } from "./components/cockpit";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isWarping, setIsWarping] = useState(false);
  // Remove mousePosition since we don't need parallax for the ship anymore (it's the HUD now)
  // But we might want parallax for the stars/background to feel like looking around? 
  // For now let's keep it simple as requested.

  useEffect(() => {
    // Autostart sequence with extended loading
    // Start Warp immediately (invisible at first or visible background?)
    setIsWarping(true); // Stars start moving immediately

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);

      // Try Audio after loading
      const audio = new Audio('/sounds/Millennium_Falcon_ship_flying_Sound.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio requires interaction"));

      // Continue warping indefinitely for the "journey" effect
      // setTimeout(() => {
      //   setIsWarping(false);
      // }, 2000);

    }, 3500); // Extended loading time to 3.5s

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black relative">
      {/* Background Stars - Visible always */}
      {/* Background Stars - Visible always */}
      <Particles
        className="absolute inset-0 z-0 animate-fade-in"
        quantity={isWarping ? 300 : 150} // Increased quantity for visibility
        warp={isWarping}
        refresh={isWarping}
      />


      {/* Cockpit Overlay - CSS Based */}
      <Cockpit />


      {/* Loading Screen Overlay - Inside Cockpit */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-blue-100 text-3xl font-display text-glow tracking-widest bg-black/40 px-8 py-4 rounded-lg border border-blue-500/30 backdrop-blur-sm"
          >
            <span className="inline-block animate-pulse">Initializing Systems...</span>
          </motion.div>
        </div>
      )}

      {/* Main Content - Visible through the "glass" */}
      {!isLoading && (
        <div className="relative z-40 w-full md:max-w-[50%] mx-auto h-screen overflow-hidden animate-fade-in flex flex-col justify-center items-center pt-20 pb-32">

          <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-8xl whitespace-nowrap bg-clip-text text-glow pb-2">
            DmanDev
          </h1>

          <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mb-4" />

          <motion.div
            className="text-center mx-6 md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <h2 className="text-sm md:text-base text-zinc-400 font-mono tracking-wider mb-8 drop-shadow-md bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-zinc-800/50 max-w-md mx-auto">
              Welcome aboard. I&apos;m Dman, your pilot for this journey through code and galaxy including clean code.
            </h2>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link href="/projects" className="px-6 py-3 bg-zinc-900/80 border border-cyan-900/50 text-cyan-400 hover:bg-cyan-900/20 hover:border-cyan-500 hover:text-cyan-100 transition-all duration-300 uppercase tracking-widest text-xs font-mono rounded-sm backdrop-blur-md group relative overflow-hidden">
                <span className="relative z-10">Initialize Projects</span>
                <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <Link href="/contact" className="px-6 py-3 bg-zinc-900/80 border border-amber-900/50 text-amber-500 hover:bg-amber-900/20 hover:border-amber-500 hover:text-amber-100 transition-all duration-300 uppercase tracking-widest text-xs font-mono rounded-sm backdrop-blur-md group relative overflow-hidden">
                <span className="relative z-10">Open Comm Channel</span>
                <div className="absolute inset-0 bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}