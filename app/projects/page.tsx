import { allProjects } from "contentlayer/generated";
import { ProjectMonitor } from "./monitor";

export const revalidate = 60;

export default function ProjectsPage() {
  // Fetch data on the server
  const projects = allProjects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  // Pass plain objects to Client Component
  // We might need to prune them if they contain non-serializable data,
  // but contentlayer objects usually are fine.
  return <ProjectMonitor projects={projects} />;
}