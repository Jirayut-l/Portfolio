"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  IconTerminal, 
  IconCalendar, 
  IconBriefcase, 
  IconSchool, 
  IconCode 
} from "./Icons";

interface Job {
  company: string;
  role: string;
  period: string;
  description: string[];
}

interface EducationItem {
  degree: string;
  school: string;
  year: string;
}

const EXPERIENCE: Job[] = [
  {
    company: "FWD insurance public company limited",
    role: "BackEnd Developer",
    period: "Apr 2023 - Present",
    description: [
      "Managed and maintained three microservices responsible for processing business-specific data calculations.",
      "Coordinated with BA, QA, and related teams to address business requirements and enhance product quality.",
      "Applied TDD methodologies to ensure high-quality deliverables and system reliability."
    ]
  },
  {
    company: "Thai Beverage Public Company Limited",
    role: "Full Stack Developer",
    period: "Jan 2022 - Aug 2023",
    description: [
      "Developed and maintained e-recruitment and employee management systems.",
      "Resolved complex issues and enhanced both backend and frontend systems.",
      "Utilized Agile Development principles to improve workflow efficiency and project delivery."
    ]
  },
  {
    company: "PTT Digital Solutions Co., Lt",
    role: "Back End Developer",
    period: "Feb 2020 - Jan 2022",
    description: [
      "Developed web APIs using C# and .NET Framework, transitioning from stored procedures to application-level logic.",
      "Designed new logic and identified solutions to enhance efficiency and execution speed.",
      "Provided onboarding guidance and technical support to new team members."
    ]
  },
  {
    company: "ARIT Rajamangala University of Technology Phra Nakhon",
    role: "Junior Developer",
    period: "Aug 2017 - Jan 2020",
    description: [
      "Resolved issues in existing web applications and improved API integration for mobile applications.",
      "Developed new systems using ASP.NET MVC based on user requirements.",
      "Provided support for all web applications developed using ASP.NET."
    ]
  }
];

const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Science in Information Technology",
    school: "King Mongkut's University of Technology North Bangkok",
    year: "2019"
  },
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Rajamangala University of Technology Phra Nakhon",
    year: "2017"
  }
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            .NET Core through Microsoft's documentation and online courses, to continuously 
            exploring new technologies. I am passionate about learning and always seeking 
            new challenges to apply and expand my knowledge.
          </p>
        </motion.div>

        {/* Experience Section */}
        <section className="mb-20">
          <div className="flex items-center space-x-4 mb-10">
            <IconBriefcase className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold uppercase tracking-wider">Professional Experience</h2>
          </div>

          <div className="space-y-12">
            {EXPERIENCE.map((job, index) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 border-l border-border hover:border-primary transition-colors group"
              >
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-border group-hover:bg-primary transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                  <div className="flex items-center text-sm font-mono text-foreground/50 bg-secondary/50 px-3 py-1 rounded-full">
                    <IconCalendar className="w-4 h-4 mr-2" />
                    {job.period}
                  </div>
                </div>
                
                <div className="text-lg font-semibold text-primary mb-4">{job.company}</div>
                
                <ul className="space-y-3">
                  {job.description.map((item, i) => (
                    <li key={i} className="flex items-start text-foreground/70 leading-relaxed">
                      <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/30 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-20">
          <div className="flex items-center space-x-4 mb-10">
            <IconSchool className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-bold uppercase tracking-wider">Education</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EDUCATION.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-secondary/30 border border-border hover:border-accent transition-all"
              >
                <div className="text-sm font-mono text-accent mb-2">{edu.year}</div>
                <h3 className="text-lg font-bold mb-2 leading-tight">{edu.degree}</h3>
                <p className="text-foreground/60 text-sm">{edu.school}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Philosophy Callout */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden"
        >
          <IconTerminal className="absolute -right-8 -bottom-8 w-64 h-64 opacity-10 rotate-12" />
          <div className="relative z-10">
            <IconCode className="w-12 h-12 mb-6" />
            <h2 className="text-3xl font-bold mb-6">Technical Philosophy</h2>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl">
              I believe that backend development is the bedrock of any successful digital product. 
              My focus is on creating systems that are not just functional, but maintainable, 
              observable, and resilient under pressure.
            </p>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default About;
