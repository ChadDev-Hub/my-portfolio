"use client";
import { projects as Projects } from "@/lib/data/projects";
import Image from "next/image";


const projects = () => {
  return (
    <section
      id="projects"
      className="relative flex items-start justify-center w-full   carousel-item   h-screen overflow-y-scroll"
    >
      {/* <BackgroundGlow /> */}

      <div className="w-full max-w-6xl pt-20 px-4">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary"></p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base-content/60">
            {
              " A selection of projects I've built, ranging from web applications and APIs to GIS and mobile applications"
            }
          </p>
        </div>
        {/* Project grid */}
        <article className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Projects.map((project, index: number) => (
            <div key={index} className="card w-full   group overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-sm transition-shadow hover:shadow-xl">
              <figure className="aspect-video  hover-gallery">
                {...project.image.map((image, index: number) => (
                  <Image key={index} src={image} alt={project.title} width={500} height={500} className="object-cover"/> 
                ))}
              </figure>
              <div className="card-body space-y-2">
                <h2 className="card-title">
                  {project.title}
                  
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-base-content/60">
                  {project.description}
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          ))}  
        </article>
      </div>
    </section>
  );
};

export default projects;
