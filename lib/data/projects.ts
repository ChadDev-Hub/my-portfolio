import type {Project} from "../types/project";
const projects: Project[] = [
  {
    number: "01",
    title: "BISELCO Web Portal / App",
    category: "GIS / ENERGY MANAGEMENT",
    description:
      "A modern utility platform for managing electrical infrastructure, complaints, construction workflows and geographic distribution data.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "PostGIS",
    ],
    image: ['/image/biselco-website/landing-page.jpeg','/image/biselco-website/home-page.jpeg', '/image/biselco-website/concern-dashboard.jpeg'],
  },
    
  {
    number: "02",
    title: "BisCollect",
    category: "FIELD APPLICATION",
    description:
      "An offline-first field application designed for collecting electrical infrastructure and consumer data in areas with limited connectivity.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PWA",
      "IndexedDB",
    ],
    image: [],
  },
  {
    number: "03",
    title: "Distribution Map",
    category: "GIS / DATA VISUALIZATION",
    description:
      "Interactive electrical distribution mapping with transformers, primary lines, consumers and spatial network visualization.",
    technologies: [
      "MapLibre",
      "PostGIS",
      "React",
      "GeoJSON",
    ],
    image: [],
  },
];



export { projects};