"use client";
import type { StackBadge } from "@/lib/types/badge";

import Image from "next/image";


const Hero = () => {
  const stackBadge: StackBadge[] = [
    {
      style: "HTML5",
      color: "e34c26",
      logo: { icon: "html5", color: "white" },
    },
    { style: "CSS3", color: "1572b6", logo: { icon: "css3", color: "white" } },
    {
      style: "JavaScript",
      color: "f7df1e",
      logo: { icon: "javascript", color: "black" },
    },
    {
      style: "TypeScript",
      color: "3178c6",
      logo: { icon: "typescript", color: "white" },
    },
    {
      style: "React",
      color: "61dafb",
      logo: { icon: "react", color: "black" },
    },
  ];
  const source = "https://img.shields.io/badge/";
  return (
    <section
      id="home"
      className="relative  flex items-start justify-center h-screen overflow-y-scroll carousel-item w-full "
    >
   
  
      <div className="w-full max-w-6xl mt-25 px-6  ">
        
        <div className="max-w-4xl">
         
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
           
            <span className="h-px w-10 bg-primary" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
             
              Full-Stack Developer
            </span>
          </div>
          {/* Heading */}
          <h1 className="text-5xl font-black leading-[1.15]  tracking-tight sm:text-2xl md:text-4xl lg:text-6xl">
            {"Hi, I'm"} <span className="text-primary"> Richard. </span> <br />
            <span className="text-base-content/90">
            
              I build digital systems
            </span>
            <br />
            <span className="text-base-content/40">
              
              that solve real problems.
            </span>
          </h1>
          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-7 text-base-content/60 sm:text-lg">
            
            Full-stack developer focused on building modern web applications,
            GIS platforms, AI and data-driven systems with React, Next.js,
            TypeScript, FastAPI, and PostgreSQL.
          </p>
          {/* Tech stack */}
          <ul className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-base-content/40">
            
            {stackBadge.map((item) => (
              <li key={item.style}>
                <Image
                  unoptimized
                  src={`${source}${item.style}-${item.color}?logo=${item.logo?.icon}&logoColor=${item.logo?.color}`}
                  alt={`${item.style}-logo`}
                  width={100}
                  height={100}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
