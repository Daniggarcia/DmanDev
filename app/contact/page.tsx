"use client";
import { Github, Mail, X } from "lucide-react"; // Using X icon if available or custom SVG
import Link from "next/link";
import { motion } from "framer-motion";

const socials = [
	{
		icon: <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>,
		href: "https://twitter.com/dmandev_",
		label: "Red Social X",
		handle: "@dmandev_",
		color: "text-zinc-200",
		borderColor: "border-zinc-800"
	},
	{
		icon: <Mail size={24} />,
		href: "mailto:dmandev@iahunt.com",
		label: "Comm-Channel: Email",
		handle: "dmandev@iahunt.com",
		color: "text-amber-500",
		borderColor: "border-amber-900/50"
	},
	{
		icon: <Github size={24} />,
		href: "https://github.com/Daniggarcia",
		label: "Data-Vault: Github",
		handle: "dmandev",
		color: "text-cyan-500",
		borderColor: "border-cyan-900/50"
	},
];

export default function ContactPage() {
	return (
		<div className="w-full h-full flex items-center justify-center p-4 md:p-8">

			{/* COMM-LINK CONSOLE UNIT */}
			<div className="w-full max-w-5xl max-h-full md:max-h-[85vh] bg-zinc-950/90 border-2 border-zinc-800 rounded-xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col relative z-10">

				{/* Console Header */}
				<div className="h-10 md:h-12 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 shrink-0">
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
						<span className="text-zinc-400 font-mono text-[9px] md:text-[10px] tracking-widest uppercase truncate">Comm-Station // Unit-01</span>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-zinc-600 font-mono text-[8px] md:text-[10px] hidden sm:block uppercase">Status: Ready</div>
						<Link href="/" className="text-zinc-600 hover:text-red-500 transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
						</Link>
					</div>
				</div>

				{/* Communication Terminals */}
				<div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-800 overflow-y-auto md:overflow-hidden">
					{socials.map((s, i) => (
						<motion.div
							key={s.label}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: i * 0.1 }}
							className="flex-1 group min-h-[160px] md:min-h-0"
						>
							<Link
								href={s.href}
								target="_blank"
								className="h-full w-full p-6 md:p-12 flex flex-col items-center justify-center gap-4 md:gap-6 hover:bg-zinc-900/60 transition-all duration-500 relative overflow-hidden"
							>
								{/* Background Scan Effect */}
								<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[2000ms] ease-linear pointer-events-none" />

								<div className={`p-3 md:p-4 rounded-lg bg-zinc-950 border ${s.borderColor} ${s.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all`}>
									{s.icon}
								</div>

								<div className="text-center space-y-1 md:space-y-2 z-10">
									<div className="text-[8px] md:text-[9px] text-zinc-600 font-mono uppercase tracking-[0.2em]">{s.label}</div>
									<h3 className={`text-base md:text-xl font-display font-medium ${s.color} transition-colors truncate max-w-[200px] md:max-w-none`}>
										{s.handle}
									</h3>
								</div>

								{/* Terminal Detail Decoration */}
								<div className="absolute bottom-3 left-4 right-4 flex justify-between items-center opacity-10 group-hover:opacity-40 transition-opacity hidden sm:flex">
									<div className="h-0.5 w-6 md:w-8 bg-zinc-700" />
									<div className="text-[7px] md:text-[8px] font-mono text-zinc-500">SECURE_LINK_{i + 1}</div>
									<div className="h-0.5 w-6 md:w-8 bg-zinc-700" />
								</div>
							</Link>
						</motion.div>
					))}
				</div>

				{/* Console Footer Info */}
				<div className="h-8 md:h-10 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-center px-4 md:px-6 shrink-0">
					<div className="w-full flex justify-between items-center">
						<span className="text-[7px] md:text-[8px] text-zinc-700 font-mono">ID: DMAN-COM-VAULT</span>
						<div className="flex gap-1 md:gap-2">
							{[...Array(5)].map((_, i) => (
								<div key={i} className={`h-0.5 md:h-1 w-3 md:w-4 rounded-full ${i < 3 ? 'bg-cyan-900/60' : 'bg-zinc-800'}`} />
							))}
						</div>
						<span className="text-[7px] md:text-[8px] text-zinc-700 font-mono">LATENCY: 12ms</span>
					</div>
				</div>
			</div>

		</div>
	);
}
