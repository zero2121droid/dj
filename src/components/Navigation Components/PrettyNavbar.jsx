import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from '../../assets/Logo beli.png';

const Navigation = () => {
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0)"]
  );
  const height = useTransform(scrollY, [0, 100], [120, 90]);

  return (
    <motion.div
      id="navigation"
      style={{ background, height }}
      className="fixed top-0 w-full flex items-center justify-between px-6  transition-all duration-300"
    >
      <div className="text-white font-bold text-lg"> <img src={logo} alt="Logo" className="mt-10 ml-2" width="225" /></div>
      <ul className="flex space-x-4 text-white">
        <li><a href="#home" className="hover:underline">Home</a></li>
        <li><a href="#about" className="hover:underline">About</a></li>
        <li><a href="#contact" className="hover:underline">Contact</a></li>
      </ul>
    </motion.div>
  );
};

export default Navigation;
