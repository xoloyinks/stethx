"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { GoSignOut } from "react-icons/go";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for hamburger and close
import Cookies from "js-cookie";

export default function Nav() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignout = () => {
     Cookies.remove('token');
     window.location.href = '/login'
  }

  return (
    <section className={`top-0 z-50 text-gray-400 font-semibold text-md py-6 shadow-lg ${path === '/login' ? 'hidden' : 'block'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl md:text-4xl md:w-[20%] font-bold bg-gradient-to-r from-teal-400 via-sky-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(0,0,255,0.7)]">
          StethX
        </div>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          className="md:hidden text-2xl text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex md:w-[40%] md:justify-center md:gap-8">
          <Link
            href="/"
            className={`hover:text-white transition-all ease-in-out ${
              path === "/" ? "text-white font-bold" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/predict"
            className={`hover:text-white transition-all ease-in-out ${
              path === "/predict" ? "text-white font-bold" : ""
            }`}
          >
            Predict
          </Link>
          <Link
            href="/history"
            className={`hover:text-white transition-all ease-in-out ${
              path === "/history" ? "text-white font-bold" : ""
            }`}
          >
            History
          </Link>
        </div>

        {/* Sign Out (Desktop) */}
        <div onClick={handleSignout} className="hidden md:flex md:justify-end md:w-[20%] text-2xl text-white transition-transform transform hover:scale-105 cursor-pointer hover:text-gray-300">
          <GoSignOut />
        </div>

        {/* Mobile Menu (Visible when toggled) */}
        <div
          className={`md:hidden z-50 absolute top-16 left-0 w-full bg-gray-900/95 flex flex-col items-center gap-4 py-6 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <Link
            href="/"
            className={`text-lg hover:text-white transition-all ease-in-out ${
              path === "/" ? "text-white font-bold" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/predict"
            className={`text-lg hover:text-white transition-all ease-in-out ${
              path === "/predict" ? "text-white font-bold" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Predict
          </Link>
          <Link
            href="/history"
            className={`text-lg hover:text-white transition-all ease-in-out ${
              path === "/history" ? "text-white font-bold" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            History
          </Link>
          <button  onClick={handleSignout} className="text-2xl text-white ">
            <GoSignOut />
          </button>
        </div>
      </div>
    </section>
  );
}