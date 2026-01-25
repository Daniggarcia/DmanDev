"use client";
import { ArrowLeft, Eye, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
	};

	views: number;
};

export const Header: React.FC<Props> = ({ project, views }) => {
	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "Source",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.url) {
		links.push({
			label: "Live Demo",
			href: project.url,
		});
	}

	return (
		<div className="bg-zinc-900/50 border-b border-zinc-800 px-6 py-4 md:py-6 shrink-0 relative flex flex-col items-center text-center space-y-4">

			{/* Top Close Button (Absolute Right) */}
			<div className="absolute top-3 right-3 md:top-5 md:right-5">
				<Link
					href="/projects"
					className="text-zinc-600 hover:text-red-500 transition-colors p-2 block"
					title="Close Stream"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
				</Link>
			</div>

			{/* Project Identity (Centered) */}
			<div className="flex flex-col items-center space-y-3 max-w-3xl">
				<div className="flex items-center gap-3">
					<div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
					<span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Project_Entry // Established</span>
					<div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
				</div>

				<h1 className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase font-display leading-tight text-glow">
					{project.title}
				</h1>

				<p className="text-zinc-400 text-sm leading-relaxed max-w-xl mx-auto">
					{project.description}
				</p>
			</div>

			{/* Links (Centered) */}
			{links.length > 0 && (
				<div className="flex flex-wrap justify-center gap-4 pt-1">
					{links.map((link) => (
						<Link
							target="_blank"
							key={link.label}
							href={link.href}
							className="group relative inline-flex items-center gap-2 px-6 py-2 bg-zinc-950 border border-zinc-800 text-cyan-500 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] hover:border-cyan-500/50 hover:text-white transition-all duration-300"
						>
							<span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							{link.label}
							<ArrowLeft className="w-3 h-3 rotate-135 group-hover:rotate-180 transition-transform" />
						</Link>
					))}
				</div>
			)}

			{/* Scanning line decoration */}
			<div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
		</div>
	);
};
