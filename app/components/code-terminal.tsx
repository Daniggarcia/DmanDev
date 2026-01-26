"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CODE_SNIPPETS = [
    `// Initializing DmanDev Core Systems...
#include <iostream>
#include <vector>

class DmanDev {
    public:
    void init() {
        std::cout << "Systems Online" << std::endl;
        this->powerLevel = 9000;
    }
    private:
    int powerLevel;
};`,
    `// Calculating Hyperspace Coordinates...
void calculateJump(float mass, float logic) {
    if (mass > 1000.0f) {
        std::cout << "Warning: Heavy Load" << std::endl;
    }
    // Accessing Galactic Database
    Vector3 dest = { 12.5f, 44.2f, -9.1f };
    Hyperspace::Engage(dest);
}`,
    `// Checking Life Support...
namespace DmanDev {
    bool verifyIntegrity() {
        const char* status = "STABLE";
        return true; 
        // May the code be with you
    }
}`,
    `// Targeting Main Reactor...
struct ProtonTorpedo {
    int yield = 500;
    bool locked = false;
};

void fireWhenReady() {
    ProtonTorpedo t1;
    t1.locked = true;
    Fire(t1);
}`
];

export const CodeTerminal = ({ theme = "cyan" }: { theme?: "cyan" | "red" | "green" }) => {
    const [currentText, setCurrentText] = useState("");
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const snippet = CODE_SNIPPETS[snippetIndex];

        if (charIndex < snippet.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + snippet[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 30 + Math.random() * 30); // Random typing speed

            return () => clearTimeout(timeout);
        } else {
            // Wait before clearing and starting next snippet
            const timeout = setTimeout(() => {
                setCharIndex(0);
                setCurrentText("");
                setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [charIndex, snippetIndex]);

    const scrollRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentText]);

    const textColor = {
        cyan: "text-cyan-500",
        red: "text-red-500",
        green: "text-green-500"
    }[theme];

    const cursorColor = {
        cyan: "bg-cyan-500",
        red: "bg-red-500",
        green: "bg-green-500"
    }[theme];

    return (
        <div
            ref={scrollRef}
            className={`w-full h-full bg-black/90 p-2 font-mono text-[8px] md:text-[10px] leading-tight ${textColor} overflow-hidden opacity-80 border-l border-zinc-800`}
        >
            <pre className="whitespace-pre-wrap break-words">
                {currentText}
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className={`inline-block w-1.5 h-3 ${cursorColor} ml-1 align-middle`}
                />
            </pre>
        </div>
    );
};
