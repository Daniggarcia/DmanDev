import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  // Forced synchronization delay for cinematic experience (3 seconds)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-40 p-2 md:p-8 mt-12 md:mt-0">

      {/* 2. THE DETAILED MONITOR (CONTENT WINDOW) */}
      <div className="relative z-10 w-full h-[70vh] md:h-[65vh] max-w-6xl bg-black border-2 border-zinc-800 rounded-lg overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col">

        {/* Technical Header Integrated */}
        <Header project={project} views={0} />

        {/* Scrollable Project Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-8 pt-8 pb-6 md:px-16 md:pt-16 md:pb-10 bg-black/40 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-invert prose-zinc prose-quoteless max-w-none">
              <Mdx code={project.body.code} />
            </article>

            {/* Technical Footer Decoration inside the scroll area */}
            <div className="mt-10 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center md:text-left">End of secure project stream</span>
              <div className="hidden md:block h-px flex-1 mx-8 bg-zinc-900" />
              <span className="text-[10px] font-mono text-zinc-500">ID: {project.slug.toUpperCase()} // STATUS: ARCHIVE_STABLE</span>
            </div>
          </div>
        </div>

        {/* Static Footer (Monitor Base) */}
        <div className="h-8 md:h-10 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          </div>
          <div className="flex gap-6">
            <span className="text-[8px] md:text-[9px] text-zinc-600 font-mono tracking-widest uppercase hidden sm:block">Link established with database</span>
            <span className="text-[8px] md:text-[9px] text-zinc-500 font-mono tracking-widest uppercase">SYSLOG // OK</span>
          </div>
        </div>
      </div>

    </div>
  );
}
