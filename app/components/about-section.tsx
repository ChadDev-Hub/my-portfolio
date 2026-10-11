"use client";

const AbourMe = () => {
  return (
    <section
      id="about"
      className="relative flex items-start justify-center w-full   carousel-item   h-screen overflow-y-scroll"
    >
      <div className="w-full max-w-6xl pt-26 px-6">
       

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          <span className="text-primary">About</span>
          <br />
          <span className="text-secondary">Me</span>
        </h1>

        <p className="mx-auto mt-4 text-3xl text-base-content/60  leading-snug ">
          A tech enthusiasm  and passion in technology.
           I am a fullstack developer and I am always open to learn and
          improve my skills. I consider myself a lifelong learner and I am
          always eager to learn new things. My vission is to become a tech
          leader and to make a positive impact in the world.
        </p>

      </div>
    </section>
  );
};

export default AbourMe;
