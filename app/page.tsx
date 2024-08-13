"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Particles from "./components/particles";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black relative">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      {hasInteracted === null && (
        <div className="p-4 md:p-8 text-white rounded-lg shadow-lg flex flex-col items-center">
          <div className="flex justify-between gap-2 items-center">
            <span className="text-xs text-zinc-200 drop-shadow-orange">
              Experience Interactive Mode
            </span>
          </div>
          <h2 className="z-20 text-xl font-medium lg:text-3xl text-zinc-200 font-display">
            Are you ready for an interactive experience?
          </h2>
          <div className="z-20 mt-4 text-sm text-zinc-400">
            <p>Would you like to start the experience now?</p>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => startExperience(true)}
              className="px-4 py-2 text-lg bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
            >
              Yes
            </button>
            <button
              onClick={() => startExperience(false)}
              className="px-4 py-2 text-lg bg-red-500 hover:bg-red-700 text-white rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      )}

      {hasInteracted && (
        <>
          <nav className="my-16 animate-fade-in">
            <ul className="flex items-center justify-center gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </nav>

          <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={1000} />

          {/* Animación de la nave */}
          <motion.div
            className="absolute top-1/3 transform -translate-y-1/2 z-50"
            initial={{ x: "100vw" }}
            animate={{ x: "-100vw" }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/Landos_Millennium_Falcon.png"
              alt="Millennium Falcon"
              width={700}
              height={350}
              className="pointer-events-none"
            />
          </motion.div>

          {/* Animación del texto */}
          <motion.h1
            className="text-white font-display sm:text-6xl md:text-9xl whitespace-nowrap z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 3,
              ease: "easeOut",
              delay: 1.5,
            }}
          >
            DmanDev
          </motion.h1>

          <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          <div className="my-16 text-center animate-fade-in">
            <h2 className="text-sm text-zinc-500 ">
              Welcome to my humble portfolio. They call me Dman, and I hope you like it as much as Chewbacca enjoys being with Han Solo.
            </h2>
          </div>
        </>
      )}
    </div>
  );
}