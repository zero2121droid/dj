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
    { path: "/gallery", name: "Gallery" },
    { path: "/videos", name: "Videos" },
  ];
  const location = useLocation();

  return (
    <motion.div
      id="navigation"
      style={{ background, height }}
      className="fixed top-0 w-full flex items-center justify-between px-6 z-50  transition-all duration-300"
    >
      <div className="text-white font-bold text-lg"><Link to="/"> <img src={logo} alt="Logo" className="md:ml-2" width="225" /> </Link></div>
      <ul className=" space-x-4 text-white font-mono hidden md:flex">
        <li><Link to="/" className="text-lg font-bold hover:underline hover:decoration-[#bd2025]">Home</Link></li>
        <li><Link to="/gallery" className="text-lg font-bold hover:underline hover:decoration-[#bd2025]">Gallery</Link></li>
        <li><Link to="/videos" className="text-lg font-bold hover:underline hover:decoration-[#bd2025]">Videos</Link></li>
      </ul>
      <div onClick={handleNav} className="block md:hidden mb-4 text-white">
          {nav ? <AiOutlineClose size={33} /> : <AiOutlineMenu size={33} />}
        </div>

        <div
          className={`${nav
              ? "fixed left-0 top-0 w-[66%] h-full border-r  opacity-90 border-r-gray-900 bg-[#000300] ease-in-out duration-500"
              : "fixed left-[-100%]"
            }`}
        >
          <img src={logo} alt="Logo" className="w-28 h-auto ml-16 mt-10 mb-3" />
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
