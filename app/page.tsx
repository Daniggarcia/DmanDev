// Mejoras a app/page.tsx

"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const [hasInteracted, setHasInteracted] = useState<boolean | null>(null);

  useEffect(() => {
    const userExperience = sessionStorage.getItem("userExperience");
    if (userExperience === "withSound") {
      startExperience(true);
    } else if (userExperience === "noSound") {
      startExperience(false);
    }
  }, []);

  const startExperience = (withSound: boolean) => {
    sessionStorage.setItem("userExperience", withSound ? "withSound" : "noSound");

    if (withSound) {
      const audio = new Audio('/sounds/Millennium_Falcon_ship_flying_Sound.mp3');
      audio.volume = 1.0;
      audio.play()
        .then(() => {
          setHasInteracted(true);
        })
        .catch(error => {
          console.error("Error playing audio:", error);
          setHasInteracted(true);
        });
    } else {
      setHasInteracted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative z-40 overflow-hidden px-10">

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center text-center max-w-2xl">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 animate-title tracking-tighter text-glow drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            DmanDev
          </h1>
        </motion.div>

        <div className="w-48 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-8" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-8"
        >
          <p className="text-xs md:text-sm text-zinc-400 font-mono tracking-[0.2em] leading-relaxed uppercase bg-black/20 p-4 border border-zinc-800/30 backdrop-blur-sm">
            Systems Online // Pilot: Dman // Route: Galaxy-Core
            <br />
            Initializing journey through code and galaxy...
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/projects"
              className="group relative px-8 py-3 bg-zinc-950 border border-cyan-900 text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase hover:bg-cyan-950 hover:text-white hover:border-cyan-400 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              Initialize Projects
            </Link>

            <Link
              href="/contact"
              className="group relative px-8 py-3 bg-zinc-950 border border-amber-900 text-amber-500 font-mono text-[10px] tracking-[0.3em] uppercase hover:bg-amber-950 hover:text-white hover:border-amber-400 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              Open Comm Channel
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}