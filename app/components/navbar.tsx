"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../../lib/data/nav-item";

type ContextType = {
  activeHash?: string;
  setActiveHash?: React.Dispatch<React.SetStateAction<string>>;
};

const NavbarContext = createContext<ContextType>({
  activeHash: undefined,
  setActiveHash: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function Navbar({ children }: Props) {
  const [activeHash, setActiveHash] = useState<string>("#home");
  const [pause, setPause] = useState(false);
  const [open, setOpen] = useState(false);
  // SET ACTIVE HASH
  useEffect(() => {
    const setHash = () => {
      const hash = window.location.hash;
      setActiveHash(hash);
    };
    setHash();
    window.addEventListener("hashchange", setHash);
    return () => {
      window.removeEventListener("hashchange", setHash);
    };
  }, []);

  // ADD EVENT EFFECT ON POINTER DOWN AND POINTER UP
  useEffect(() => {
    const hash = window.location.hash || "#home";
    const element = document.querySelector(hash);
    if (!element) return;
    const handlePointerDown = () => setPause(true);
    const handlePointerUp = () => setPause(false);

    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointerup", handlePointerUp);

    return () => {
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointerup", handlePointerUp);
    };
  }, [activeHash]);

  useEffect(() => {
    const sections = document.querySelectorAll(".carousel-item");
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          
          if (entry.isIntersecting) {
            const section = entry.target;
            if(section.id && window.location.hash !== `#${section.id}`) {
              window.history.replaceState(
                {},
                "",
                `#${section.id}`
              )
              setActiveHash(`#${section.id}`);
            }
          }
        });
      },
      {
        threshold: 0.5,
      },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // // AUTO CAROUSAL
  // useEffect(() => {
  //   if (pause) return;
  //   const timeout = setTimeout(() => {
  //     const hash = window.location.hash || "#home";
  //     const prevIndex = navItems.findIndex((item) => item.href === hash);

  //     const nextIndex = (prevIndex + 1) % navItems.length;

  //     const nextHash = navItems[nextIndex].href;

  //     window.location.hash = nextHash;
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, [activeHash, pause]);

  return (
    <NavbarContext.Provider
      value={{
        activeHash,
        setActiveHash,
      }}
    >
      <nav className=" fixed right-1/2 translate-x-1/2 top-0 z-50 w-full  sm:px-6 lg:px-8 mx-auto mt-0 sm:mt-4 flex max-w-7xl items-center justify-between rounded-2xl border border-base-content/10 bg-base-100/80 px-4 py-3 shadow-xl backdrop-blur-xl ">
        {/* Logo */}

        <a
          href="#top"
          className=" flex items-
        center gap-2 font-bold "
        >
          <span className="inline z-10 w-full h-full bg-primary p-2 rounded-2xl">
            Richard Rojo Jr.<span className="text-primary">.</span>
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-xl px-4 py-2 text-sm font-medium text-base-content/70 transition-colors hover:bg-base-content/5 hover:text-base-content ${activeHash === item.href ? "bg-secondary text-secondary-content" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile menu */}
        <label className=" relative  md:hidden btn btn-circle swap swap-rotate">
          <input onChange={(e) => setOpen(e.target.checked)} type="checkbox" />
          <Menu className="size-5 swap-off" />
          <X className="size-5 swap-on" />
          {open && (
            <ul className="menu absolute top-full right-0 z-1 mt-3 w-56 rounded-2xl border border-base-content/10 bg-base-100 p-2 shadow-2xl">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`rounded-xl py-3 ${activeHash === item.href ? "bg-secondary text-secondary-content" : ""}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </label>
      </nav>
      {children}
    </NavbarContext.Provider>
  );
}

export const useNav = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNav must be used within a NavbarProvider");
  }
  return context;
};
