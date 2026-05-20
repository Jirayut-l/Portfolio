"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  IconCode, 
  IconDatabase, 
  IconServer, 
  IconCloud 
} from "./Icons";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: <IconCode className="w-6 h-6" />,
    skills: ["C#", "TypeScript", "Golang", "SQL", "HTML/CSS"],
    color: "text-blue-500",
  },
  {
    title: "Frameworks",
    icon: <IconServer className="w-6 h-6" />,
    skills: [".NET Core", "Entity Framework", "Angular", "xUnit", "Jest"],
    color: "text-indigo-500",
  },
  {
    title: "Databases",
    icon: <IconDatabase className="w-6 h-6" />,
    skills: ["MySQL", "SQL Server", "Redis", "PostgreSQL"],
    color: "text-emerald-500",
  },
  {
    title: "Tools & Concepts",
    icon: <IconCloud className="w-6 h-6" />,
    skills: ["Docker", "Git", "TDD", "Agile/Scrum", "RESTful APIs"],
    color: "text-orange-500",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Core Competencies</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-foreground/60">
            A comprehensive overview of the tools and technologies I use to build 
            modern, resilient backend systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all hover:shadow-xl group"
            >
              <div className={`mb-6 p-3 rounded-xl bg-background border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-all inline-block ${category.color}`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-6 text-foreground">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center text-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
