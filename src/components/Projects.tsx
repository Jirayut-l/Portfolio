"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconExternalLink, IconGithub, IconCode, IconDatabase, IconGlobe } from "./Icons";

const projects = [
  {
    title: "ScaleCommerce API",
    description: "Architected a high-concurrency e-commerce backend handling 50k+ RPM. Optimized PostgreSQL queries reducing latency by 45%.",
    tech: ["Go", "gRPC", "PostgreSQL", "Redis"],
    stats: "45% Latency Reduction",
    icon: <IconCode className="w-5 h-5" />,
    link: "#",
    github: "#",
  },
  {
    title: "AuthGuard Microservice",
    description: "Distributed authentication system with RBAC and JWT. Implemented centralized logging and circuit breaking for fault tolerance.",
    tech: ["Node.js", "NestJS", "MongoDB", "RabbitMQ"],
    stats: "99.99% Availability",
    icon: <IconDatabase className="w-5 h-5" />,
    link: "#",
    github: "#",
  },
  {
    title: "EventFlow Engine",
    description: "Real-time event processing pipeline for telemetry data. Capable of ingestion rates exceeding 1M events per second.",
    tech: ["Python", "Apache Kafka", "ClickHouse", "Docker"],
    stats: "1M+ Events/Sec",
    icon: <IconGlobe className="w-5 h-5" />,
    link: "#",
    github: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Projects</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="max-w-xl text-foreground/60">
              A selection of system designs and implementations focusing on 
              performance, security, and scalability.
            </p>
          </div>
          <a href="#" className="text-primary font-medium flex items-center hover:underline">
            View all on GitHub <IconExternalLink className="ml-2 w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col bg-background border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all group"
            >
              <div className="p-8 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    {project.icon}
                  </div>
                  <div className="flex space-x-3">
                    <a href={project.github} className="text-foreground/40 hover:text-primary transition-colors">
                      <IconGithub className="w-5 h-5" />
                    </a>
                    <a href={project.link} className="text-foreground/40 hover:text-primary transition-colors">
                      <IconExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">{project.title}</h3>
                <p className="text-foreground/60 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-semibold bg-secondary rounded-full text-foreground/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="px-8 py-4 bg-secondary/50 border-t border-border flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/40">Key Impact</span>
                <span className="text-sm font-bold text-primary">{project.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
