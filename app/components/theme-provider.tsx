"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = "cyan" | "red" | "green";

interface ThemeColors {
    name: Theme;
    primary: string; // e.g. "cyan"
    text: string;    // e.g. "text-cyan-500"
    border: string;  // e.g. "border-cyan-500"
    bg: string;      // e.g. "bg-cyan-500"
    glow: string;    // e.g. "cyan" (for shadow)
}

interface ThemeContextType {
    theme: Theme;
    colors: ThemeColors;
    cycleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_CONFIG: Record<Theme, ThemeColors> = {
    cyan: {
        name: "cyan",
        primary: "cyan",
        text: "text-cyan-500",
        border: "border-cyan-500",
        bg: "bg-cyan-500",
        glow: "cyan"
    },
    red: {
        name: "red",
        primary: "red",
        text: "text-red-500",
        border: "border-red-500",
        bg: "bg-red-500",
        glow: "red"
    },
    green: {
        name: "green",
        primary: "green",
        text: "text-green-500",
        border: "border-green-500",
        bg: "bg-green-500",
        glow: "green"
    }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("cyan");

    const cycleTheme = () => {
        setThemeState(prev => {
            if (prev === "cyan") return "red";
            if (prev === "red") return "green";
            return "cyan";
        });
    };

    const value = {
        theme,
        colors: THEME_CONFIG[theme],
        cycleTheme,
        setTheme: setThemeState
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
