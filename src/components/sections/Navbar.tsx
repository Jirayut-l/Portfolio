"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { IconTerminal, IconMenu, IconX } from "@/components/ui/Icons";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// Dynamically import ThemeToggle to avoid hydration mismatch without manual 'mounted' state
const ThemeToggle = dynamic(() => import("@/components/ui/ThemeToggle"), { 
  ssr: false,
  loading: () => <div className="min-w-[40px] min-h-[40px]" />
});

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
] as const;

const SCROLL_THRESHOLD = 20;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Use Framer Motion's useScroll for high-performance scroll tracking
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isOverThreshold = latest > SCROLL_THRESHOLD;
    if (isOverThreshold !== scrolled) {
      setScrolled(isOverThreshold);
    }
  });

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center space-x-2 focus-visible:outline-2 focus-visible:outline-primary rounded-lg"
            aria-label="Dev.Backend Home"
          >
            <IconTerminal className="w-8 h-8 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight text-foreground">Dev.Backend</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded-md px-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <ThemeToggle />

            <Link
              href="#contact"
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary outline-none"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Nav Actions */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 text-foreground focus:outline-none cursor-pointer rounded-md focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {isOpen ? <IconX className="w-6 h-6" aria-hidden="true" /> : <IconMenu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <ul className="px-4 pt-2 pb-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-3 py-4 text-base font-medium text-foreground/70 hover:text-primary hover:bg-secondary rounded-lg transition-all focus-visible:bg-secondary focus-visible:text-primary outline-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 px-3">
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="block w-full text-center px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
                >
                  Hire Me
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;