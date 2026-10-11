"use client";
import { mySkills } from "@/lib/data/skills";
const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative flex items-start justify-center w-full carousel-item min-h-screen overflow-y-auto"
    >
      <div className="w-full max-w-6xl pt-26 px-4 pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight leading-snug sm:text-6xl">
            <span className="text-primary">My</span>
            <br />
            <span className="text-secondary">Skills</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base-content/70 text-lg">
            Technologies and tools I use to build modern, scalable, and
            user-friendly applications.
          </p>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Frontend */}
          {mySkills &&
            mySkills.map((skill) => (
              <div key={skill.item} className="card w-full   group overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-sm transition-shadow hover:shadow-xl">
                <div className="card-body flex flex-col">
                 
                    <h2 className={`card-title text-${skill.color}`}>
                      {skill.title}
                    </h2>

                    <p className="text-sm text-base-content/60 mb-4 ">
                      {skill.subtitle}
                    </p>
                


                  <div className={`flex flex-wrap gap-2 items-start `}>
                    {skill.stacks.map((stack) => (
                      <span
                        key={stack}
                        className={`badge badge-outline badge-${skill.color} badge-sm `}
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                
                 
                </div>
                 
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
