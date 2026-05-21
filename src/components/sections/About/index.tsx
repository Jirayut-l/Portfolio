"use client";

import { motion } from "framer-motion";
import PhilosophySection from "./PhilosophySection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";

// Define static animation variants to avoid object reallocation on renders
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  }
};

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            About Me
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
            The Engineer Behind <br />
            <span className="text-primary">The Architecture</span>
          </h1>
          <p className="text-xl text-foreground/60 leading-relaxed max-w-3xl">
            Welcome to my portfolio. My name is Tum Jirayut, and I am a Mid-Level Backend Developer 
            currently working at FWD. I specialize in building and optimizing high-performance 
            API Microservices. My technical journey is rooted in hands-on practice—from mastering 
            .NET Core through Microsoft&apos;s documentation and online courses, to continuously 
            exploring new technologies. I am passionate about learning and always seeking 
            new challenges to apply and expand my knowledge.
          </p>
        </motion.div>

        {/* Experience Section */}
        <ExperienceSection />

        {/* Education Section */}
        <EducationSection />

        {/* Technical Philosophy & Simulation Section */}
        <PhilosophySection />
      </div>
    </section>
  );
};

export default About;
