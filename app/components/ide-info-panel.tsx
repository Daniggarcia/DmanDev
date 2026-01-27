"use client";

import React from "react";

export const IdeInfoPanel = () => {
    return (
        <div className="hidden xl:block absolute bottom-20 left-2 md:bottom-0 md:left-0 mb-4 md:mb-32 ml-0 md:ml-24 w-[90vw] md:w-full max-w-sm lg:max-w-md bg-[#1e1e1e]/40 backdrop-blur-md border border-[#333]/50 rounded-lg shadow-2xl font-mono text-xs overflow-hidden select-none z-30 scale-90 md:scale-100 origin-bottom-left">
            {/* VS Code Title Bar */}
            <div className="bg-[#252526]/60 px-3 py-1 flex items-center justify-between border-b border-[#333]/50">
                <span className="text-[#cccccc]">cockpit_controls.ts</span>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                </div>
            </div>

            {/* Code Content */}
            <div className="p-3 text-[#d4d4d4] leading-relaxed">
                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">1</span>
                    <div>
                        <span className="text-[#c586c0]">interface</span> <span className="text-[#4ec9b0]">CockpitControls</span> {"{"}
                    </div>
                </div>

                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">2</span>
                    <div className="pl-4">
                        <span className="text-[#6a9955]">// Button 1 (Blue)</span>
                    </div>
                </div>
                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">3</span>
                    <div className="pl-4">
                        <span className="text-[#9cdcfe]">openTechInfo</span>: <span className="text-[#ce9178]">'System Specs'</span>;
                    </div>
                </div>

                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">4</span>
                    <div className="pl-4">
                        <span className="text-[#6a9955]">// Button 2 (Green)</span>
                    </div>
                </div>
                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">5</span>
                    <div className="pl-4">
                        <span className="text-[#9cdcfe]">toggleWarp</span>: <span className="text-[#569cd6]">true</span>;
                    </div>
                </div>

                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">6</span>
                    <div className="pl-4">
                        <span className="text-[#6a9955]">// Button 3 (Orange)</span>
                    </div>
                </div>
                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">7</span>
                    <div className="pl-4">
                        <span className="text-[#9cdcfe]">hyperJump</span>: <span className="text-[#ce9178]">'Change Galaxy'</span>;
                    </div>
                </div>

                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">8</span>
                    <div className="pl-4">
                        <span className="text-[#6a9955]">// Button 4 (Red)</span>
                    </div>
                </div>
                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">9</span>
                    <div className="pl-4">
                        <span className="text-[#9cdcfe]">switchTheme</span>: <span className="text-[#ce9178]">'Color Mode'</span>;
                    </div>
                </div>

                <div className="flex">
                    <span className="text-[#858585] w-6 select-none">10</span>
                    <div>{"}"}</div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#007acc]/80 px-2 py-0.5 text-white flex justify-between items-center text-[8px]">
                <span>TypeScript React</span>
                <span>Ln 8, Col 1</span>
            </div>
        </div>
    );
};
