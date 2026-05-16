"use client";

import { motion } from "framer-motion";
import { IconDatabase, IconServer, IconShield, IconCode } from "./Icons";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            Backend Systems Architect
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Building <span className="text-primary">Reliable</span> & <br />
            <span className="text-accent">Scalable</span> Infrastructures
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 mb-10 leading-relaxed"
          >
            Specialized in designing robust APIs, optimizing database performance, 
            and orchestrating microservices for high-traffic applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-accent transition-all transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-border bg-background/50 backdrop-blur-sm font-semibold hover:bg-secondary transition-all"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Floating Icons for Backend Vibe */}
        <div className="hidden lg:block">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-0 p-4 rounded-2xl bg-background border border-border shadow-xl"
          >
            <IconDatabase className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-0 p-4 rounded-2xl bg-background border border-border shadow-xl"
          >
            <IconServer className="w-8 h-8 text-accent" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-10 p-3 rounded-xl bg-background border border-border shadow-lg"
          >
            <IconShield className="w-6 h-6 text-emerald-500" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-10 p-3 rounded-xl bg-background border border-border shadow-lg"
          >
            <IconCode className="w-6 h-6 text-orange-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
