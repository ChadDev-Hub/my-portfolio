"use client";
import { navItems } from "../../lib/data/nav-item";
import { Dot } from "lucide-react";
import {useNav} from "./navbar";



const CarouselDot = () => {
  const { activeHash, setActiveHash } = useNav();
  return (
    <ul className="list-none list-inside list w-full flex flex-row justify-center fixed bottom-4">
      {navItems.map((item) => (
        <li key={item.href} className="list-none list-inside">
          <a href={item.href} onClick={() => setActiveHash?.(item.href)}>
            <Dot className={`${activeHash === item.href ? "text-primary  animate-ping transition-all duration-1000" : ""}`} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CarouselDot;
