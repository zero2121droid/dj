import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { motion } from "framer-motion";

import { Outlet, Link,  useLocation } from "react-router-dom";
import { SlideTabsComponent } from "./SlideTabsComponent";
// import logo from '../assets/LULA.Lightgreen (1).png';
// import small_logo from '../assets/1 Lightgreen png (1).png';

const Navbar = () => {
  const [nav, setNav] = useState(false);



  const handleNav = () => {
    setNav(!nav);
  };

  const listVariants = {
    hidden: {
      x: -100,
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
        type: "spring",
        stiffness: 200,
        duration: 0,
      },
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: { when: "afterChildren", duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        duration: 0.4,
      },
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const navigationItems = [
    { path: "/", name: "Home" },
    { path: "/3D-Stampa", name: "3D Stampa" },
    { path: "/Services", name: "Usluge" },
    { path: "/Contact", name: "Kontakt" },
    { path: "/AboutUs", name: "O nama" },
  ];

  const location = useLocation();

  return (
    <div className="fixed w-full top-0 left-0 z-50 bg-black">
      <div className="flex justify-between items-center h-32 max-w-full px-2 text-white">
        <img src="" alt="Logo" width="225" />
        {/* <h1 className="w-full text-3xl font-bold text-[#00df9a]">LuLa</h1> */}
        <SlideTabsComponent></SlideTabsComponent>
        <div onClick={handleNav} className="block md:hidden mb-4">
          {nav ? <AiOutlineClose size={33} /> : <AiOutlineMenu size={33} />}
        </div>

        <div
          className={`${
            nav
              ? "fixed left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
              : "fixed left-[-100%]"
          }`}
        >
              <img src="" alt="Logo" className="w-42 h-28 ml-11" />
          {/* <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">LuLa 3D print</h1> */}

          <motion.ul
            className="uppercase p-4"
            initial="hidden"
            animate={nav ? "visible" : "hidden"}
            exit="exit"
            variants={listVariants}
            onAnimationComplete={() => {
              if (!nav) setNav(false); // Ensure the state is consistent
            }}
          >
            {navigationItems.map((item) => (
              <Link to={item.path} key={item.name}>
                <motion.li
                  className={`p-4 border-b cursor-pointer border-gray-600 ${location.pathname === item.path ? "text-[#00df9a]" : "text-white" }`}
                  variants={itemVariants}
                  onClick={handleNav}
                >
                  {item.name}
                </motion.li>
              </Link>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
