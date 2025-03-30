// Mejoras a app/page.tsx

"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from "next/image";

// Carga diferida de Particles para mejorar el rendimiento inicial
const Particles = dynamic(() => import("./components/particles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10"></div>,
});

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const [hasInteracted, setHasInteracted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular un tiempo de carga mínimo para evitar parpadeos
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      const userExperience = sessionStorage.getItem("userExperience");
      if (userExperience === "withSound") {
        startExperience(true);
      } else if (userExperience === "noSound") {
        startExperience(false);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const startExperience = useCallback((withSound: boolean) => {
    sessionStorage.setItem("userExperience", withSound ? "withSound" : "noSound");

    if (withSound) {
      const audio = new Audio('/sounds/Millennium_Falcon_ship_flying_Sound.mp3');
      audio.volume = 0.7; // Volumen reducido
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
  }, []);

  // Pantalla de carga
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-zinc-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-zinc-100 text-2xl font-display"
        >
          <span className="inline-block animate-pulse">Loading...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-800/20 to-black relative">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      
      {hasInteracted === null && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 md:p-8 bg-zinc-900/80 backdrop-blur-md text-white rounded-xl shadow-xl border border-zinc-700 flex flex-col items-center z-50"
        >
          <div className="flex justify-between gap-2 items-center">
            <span className="text-sm text-zinc-200 drop-shadow-orange">
              Experiencia Interactiva
            </span>
          </div>
          <h2 className="text-2xl font-medium lg:text-3xl text-zinc-100 font-display mt-2 text-center">
            ¿Listo para una experiencia inmersiva?
          </h2>
          <div className="mt-4 text-sm text-zinc-300 max-w-md text-center">
            <p>Selecciona si deseas iniciar la experiencia con o sin sonido.</p>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => startExperience(true)}
              className="px-6 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-700/20 transition-all duration-200 hover:scale-105"
            >
              Con Sonido
            </button>
            <button
              onClick={() => startExperience(false)}
              className="px-6 py-3 text-base bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg border border-zinc-600 transition-all duration-200 hover:scale-105"
            >
              Sin Sonido
            </button>
          </div>
        </motion.div>
      )}

      {hasInteracted && (
        <>
          <nav className="my-16 animate-fade-in">
            <ul className="flex items-center justify-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm duration-500 text-zinc-400 hover:text-zinc-100 relative group"
                >
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zinc-100 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </ul>
          </nav>

          <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          
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
              priority
              quality={90}
            />
          </motion.div>

          {/* Animación del texto principal mejorada */}
          <motion.h1
            className="text-white font-display sm:text-6xl md:text-8xl lg:text-9xl whitespace-nowrap z-40 relative bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-blue-300 to-zinc-100"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
              delay: 1.5,
            }}
          >
            DmanDev
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"
              initial={{ width: 0, left: "50%" }}
              animate={{ width: "100%", left: 0 }}
              transition={{ delay: 3.5, duration: 1.5 }}
            />
          </motion.h1>

          <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          
          <motion.div 
            className="my-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <h2 className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto px-4">
              Bienvenido a mi portfolio. Me llaman Dman, y espero que disfrutes de este viaje tanto como Chewbacca disfruta acompañando a Han Solo.
            </h2>
          </motion.div>
        </>
      )}
    </div>
  );
}