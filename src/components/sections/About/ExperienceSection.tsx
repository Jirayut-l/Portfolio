"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  IconCalendar, 
  IconBriefcase, 
  IconChevronDown 
} from "@/components/ui/Icons";

interface Job {
  company: string;
  role: string;
  period: string;
  description: string[];
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

const experienceVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.5, 
      delay: index * 0.1 
    }
  })
};

const ExperienceSection = () => {
  const [expandedExp, setExpandedExp] = useState<number[]>([0]);

  const toggleExp = (index: number) => {
    setExpandedExp(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="mb-20">
      <div className="flex items-center space-x-4 mb-10">
        <IconBriefcase className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold uppercase tracking-wider">Professional Experience</h2>
      </div>

      <div className="space-y-12">
        {EXPERIENCE.map((job, index) => (
          <motion.div
            key={job.company}
            variants={experienceVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative pl-8 border-l border-border hover:border-primary transition-colors group"
          >
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-border group-hover:bg-primary transition-colors" />
            
            <button
              type="button"
              onClick={() => toggleExp(index)}
              className="w-full text-left focus:outline-none group/header block cursor-pointer"
              aria-expanded={expandedExp.includes(index)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground group-hover/header:text-primary transition-colors">
                    {job.role}
                  </h3>
                  <div
                    className={`text-foreground/40 group-hover/header:text-primary transition-transform duration-200 ${
                      expandedExp.includes(index) ? "rotate-180" : ""
                    }`}
                  >
                    <IconChevronDown className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center text-sm font-mono text-foreground/50 bg-secondary/50 px-3 py-1 rounded-full w-fit">
                  <IconCalendar className="w-4 h-4 mr-2" />
                  {job.period}
                </div>
              </div>
              
              <div className="text-lg font-semibold text-primary mb-4">{job.company}</div>
            </button>
            
            {/* CSS Grid template rows transition: hardware-optimized accordion */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                expandedExp.includes(index)
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-3 pb-2 pt-2">
                  {job.description.map((item, i) => (
                    <li key={i} className="flex items-start text-foreground/70 leading-relaxed">
                      <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/30 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
