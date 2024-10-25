import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export const SlideTabsComponent = () => {
  return (
    <div className="hidden md:flex py-20">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative flex w-full justify-end rounded-full border-[#00df9a] bg-black p-1"
    >
      <Tab setPosition={setPosition} path="/">Home</Tab>
      <Tab setPosition={setPosition} path="/3D-Stampa">3D Stampa</Tab>
      <Tab setPosition={setPosition} path="/Services">Usluge</Tab>
      <Tab setPosition={setPosition} path="/Contact">Kontakt</Tab>
      <Tab setPosition={setPosition} path="/AboutUs">O nama</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, path }) => {
  const ref = useRef(null);
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-normal md:px-5 md:py-3 md:text-base transition-colors duration-300 whitespace-nowrap ${isActive ? "text-white" : "text-white"
        }`}
    >
      {children}
    </Link>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-[#bd2025] md:h-12"
    />
  );
};
