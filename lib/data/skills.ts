import type {Skill}  from "../types/skills";



export const mySkills:Skill[] =[
    {   item: 1,
        title: "Backend Development",
        subtitle: "Developing APIS, authentication entegration, database logic and backend services.",
        stacks: ["Python", "FastAPI", "OAuthlib", "JWT" , "Pydantic"],
        color: "primary"
      },
      {
        item: 2,
        title: "Frontend Development",
        subtitle: "Building user interfaces and responsive web applications using React, Next.js, and Tailwind CSS.",
        stacks: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS", "JavaScript", "TypeScript", "DaisyUI"],
        color: "secondary"
      },
      {
        item: 3,
        title: "Database Management",
        subtitle: "Managing and optimizing databases and creating database automations.",
        stacks: ["PostgreSQL","SQLAlchemy","PostGIS"],
        color: "info"
      },
      {
        item: 4,
        title: "CI / CD",
        subtitle: "Implementing continuous integration and continuous deployment pipelines using GitHub Actions and Docker",
        stacks: ["GitHub Actions", "Docker"],
        color: "success"
      },
      {
        item: 5,
        title:"Geographic Information Systems",
        subtitle: "Developing geospatial applications and databases using PostGIS and QGIS.",
        stacks: ["PostGIS", "QGIS"],
        color: "warning"
      },
      {
        item : 6,
        title: "WebScrapping and Automation",
        subtitle: "Implementing web scrapping and automation tools using Python and Selenium.",
        stacks: ["Python", "Selenium", "playwright"],
        color: "error"
      }

]