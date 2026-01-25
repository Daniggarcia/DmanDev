export default function ProjectsLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen flex items-center justify-center">
			{children}
		</div>
	);
}
