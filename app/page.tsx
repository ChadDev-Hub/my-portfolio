
import Hero from "./components/hero-section";
import Carousel from "./components/carousel";
import Projects from "./components/projects-section";
import CarouselDot from "./components/carousel-dots";
import BackgroundGlow from "./components/background-glow";
import AboutMe from "./components/about-section";
import SkillsSection from "./components/skills-section";
import ContactSection from "./components/contact-section";
export default function Home() {
  return (
    <main className="h-screen relative  bg-base-100 text-base-content w-full overflow-hidden  flex flex-col">
       <BackgroundGlow />
        <Carousel >
           <Hero />
           <Projects />
           <AboutMe />
           <SkillsSection />
           <ContactSection />
        </Carousel>
        <CarouselDot />
    </main>
  );
}
