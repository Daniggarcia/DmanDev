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
		<div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 md:py-6 shrink-0 relative">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

				{/* Project Identity */}
				<div className="space-y-2 max-w-2xl">
					<div className="flex items-center gap-3">
						<div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
						<span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Project_Entry // Established</span>
					</div>
					<h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase font-display leading-none">
						{project.title}
					</h1>
					<p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-xl">
						{project.description}
					</p>
				</div>

				{/* Technical Meta & Close */}
				<div className="flex flex-col items-end gap-4 min-w-fit">
					<Link
						href="/projects"
						className="text-zinc-600 hover:text-red-500 transition-colors p-1"
						title="Close Stream"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
					</Link>

					<div className="flex gap-4">
						{links.map((link) => (
							<Link
								target="_blank"
								key={link.label}
								href={link.href}
								className="text-[10px] font-mono text-cyan-600 hover:text-cyan-400 border border-cyan-900/40 px-3 py-1 bg-cyan-950/20 uppercase tracking-widest transition-all"
							>
								{link.label} &rarr;
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Scanning line decoration */}
			<div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
		</div>
	);
};
