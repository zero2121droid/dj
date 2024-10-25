import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Outlet, Link, useLocation } from "react-router-dom";
import logo from '../../assets/Logo beli.png';

const Navigation = () => {
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0)"]
  );
  const height = useTransform(scrollY, [0, 100], [120, 90]);

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
    <motion.div
      id="navigation"
      style={{ background, height }}
      className="fixed top-0 w-full flex items-center justify-between px-6 z-50  transition-all duration-300"
    >
      <div className="text-white font-bold text-lg"> <img src={logo} alt="Logo" className="md:ml-2  md:mt-10  mt-10" width="225" /></div>
      <ul className="flex space-x-4 text-white hidden md:flex">
        <li><Link to="/" className="text-lg font-bold hover:underline">Home</Link></li>
        <li><Link to="/about" className="text-lg font-bold hover:underline">About</Link></li>
        <li><Link to="/contact" className="text-lg font-bold hover:underline">Contact</Link></li>
      </ul>
      <div onClick={handleNav} className="block md:hidden mb-4 text-white">
          {nav ? <AiOutlineClose size={33} /> : <AiOutlineMenu size={33} />}
        </div>

        <div
          className={`${nav
              ? "fixed left-0 top-0 w-[70%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
              : "fixed left-[-100%]"
            }`}
        >
          <img src={logo} alt="Logo" className="w-42 h-28 ml-24" />
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
                  className={`p-4 border-b cursor-pointer border-gray-600 ${location.pathname === item.path ? "text-[#bd2025]" : "text-white"}`}
                  variants={itemVariants}
                  onClick={handleNav}
                >
                  {item.name}
                </motion.li>
              </Link>
            ))}
          </motion.ul>
        </div>
    </motion.div>
  );
};

export default Navigation;
