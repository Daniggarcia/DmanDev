export default function ContactLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {children}
        </div>
    );
}
