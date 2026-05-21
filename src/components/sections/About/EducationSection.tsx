"use client";

import { motion } from "framer-motion";
import { IconSchool } from "@/components/ui/Icons";

interface EducationItem {
  degree: string;
  school: string;
  year: string;
}

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

const educationVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5, 
      delay: index * 0.1 
    }
  })
};

const EducationSection = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center space-x-4 mb-10">
        <IconSchool className="w-8 h-8 text-accent" />
        <h2 className="text-2xl font-bold uppercase tracking-wider">Education</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {EDUCATION.map((edu, index) => (
          <motion.div
            key={edu.degree}
            variants={educationVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-secondary/30 border border-border hover:border-accent transition-all"
          >
            <div className="text-sm font-mono text-accent mb-2">{edu.year}</div>
            <h3 className="text-lg font-bold mb-2 leading-tight">{edu.degree}</h3>
            <p className="text-foreground/60 text-sm">{edu.school}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
