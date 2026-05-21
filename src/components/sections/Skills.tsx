"use client";

import React from "react";
import { motion } from "framer-motion";

const skillModules = [
  {
    category: "LANGUAGES",
    skills: ["C#", "TypeScript", "Golang", "SQL", "HTML/CSS/SCSS"],
    color: "text-blue-400",
  },
  {
    category: "FRAMEWORKS",
    skills: [".NET Core", "Entity Framework", "Angular", "xUnit", "Jest"],
    color: "text-indigo-400",
  },
  {
    category: "DATABASES",
    skills: ["MySQL", "SQL Server", "Redis", "PostgreSQL"],
    color: "text-emerald-400",
  },
  {
    category: "INFRASTRUCTURE",
    skills: ["Docker", "Git", "RESTful APIs", "TDD", "Agile/Scrum"],
    color: "text-orange-400",
  },
];

const Terminal = () => {
  const glitchVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: {
      opacity: [0, 1, 0.8, 1, 0.9, 1],
      x: [0, -2, 2, -1, 0],
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-mono text-sm md:text-base">
      {/* Terminal Window */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-lg overflow-hidden border border-white/10 bg-[#0d1117]/90 backdrop-blur-md shadow-2xl shadow-primary/10"
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-white/40 text-xs uppercase tracking-widest">system_monitor — 80×24</div>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Content */}
        <motion.div 
          animate={{ opacity: [1, 0.98, 1, 0.99, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="p-6 md:p-8 space-y-4 min-h-[450px] relative overflow-hidden"
        >
          {/* Scanlines Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

          <div className="space-y-1">
            <motion.div 
              variants={glitchVariants} 
              initial="hidden" 
              whileInView="visible"
              viewport={{ once: true }}
              className="text-primary"
            >
              $ systemctl start personal-portfolio.service
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0.8, 1], x: [0, -1, 1, 0] }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.2 }}
              className="text-white/60"
            >
              [  OK  ] Loading kernel modules...
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0.9, 1], x: [0, 1, -1, 0] }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.2 }}
              className="text-white/60"
            >
              [  OK  ] Initializing backend_engine v4.2.0
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-4">
            {skillModules.map((module, mIdx) => (
              <div key={module.category} className="space-y-3">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ 
                    opacity: [0, 1, 0.8, 1],
                    x: [0, -2, 2, 0]
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + (mIdx * 0.4), duration: 0.3 }}
                  className={`${module.color} font-bold flex items-center gap-2`}
                >
                  <span className="text-white/20">▶</span> {module.category}
                </motion.div>
                
                <div className="space-y-2 pl-4 border-l border-white/5">
                  {module.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 + (mIdx * 0.4) + (sIdx * 0.1) }}
                      className="flex items-center gap-3 group"
                    >
                      <span className="text-primary/40 group-hover:text-primary transition-colors">⠿</span>
                      <span className="text-white/80 group-hover:text-white transition-colors">{skill}</span>
                      <div className="flex-1 border-b border-dashed border-white/5 mx-2" />
                      <span className="text-[10px] text-white/20 uppercase">stable</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 3.5 }}
            className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 uppercase tracking-widest"
          >
            <div className="flex items-center gap-4">
              <span>Status: Online</span>
              <span>Memory: Optimized</span>
              <span>Latency: 12ms</span>
            </div>
            <div className="animate-pulse">
              <span className="inline-block w-2 h-4 bg-primary align-middle" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#020617]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4 tracking-widest uppercase"
          >
            Technical Stack
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Core Competencies
          </h2>
          <p className="max-w-2xl mx-auto text-white/40 font-mono text-sm leading-relaxed">
            Scalable architectures, efficient data structures, and robust backend ecosystems 
            initialized for production-grade performance.
          </p>
        </div>

        <Terminal />
      </div>
    </section>
  );
};

export default Skills;
