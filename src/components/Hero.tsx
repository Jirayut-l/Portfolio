"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LOG_TEMPLATES = [
  "GET /api/v1/projects - 200 OK - 12ms",
  "POST /api/v1/contact - 201 Created - 45ms",
  "GET /api/v1/skills - 200 OK - 6ms",
  "PUT /api/v1/profile - 200 OK - 18ms",
  "GET /api/v1/experience - 200 OK - 15ms",
  "GET /api/v1/metrics - 200 OK - 24ms",
  "POST /api/v1/auth/token - 200 OK - 32ms",
  "GET /api/v1/projects?tag=dotnet - 200 OK - 14ms",
];

interface FlowingDotProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  duration?: number;
}

const FlowingDot = ({ startX, startY, endX, endY, delay = 0, duration = 2.5 }: FlowingDotProps) => (
  <motion.circle
    cx={startX}
    cy={startY}
    r="3"
    className="fill-emerald-400 dark:fill-emerald-300 drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]"
    animate={{
      cx: [startX, endX],
      cy: [startY, endY],
      opacity: [0, 1, 1, 0]
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
  />
);

const Hero = () => {
  const [activeTab, setActiveTab] = useState<"terminal" | "architecture">("terminal");
  const [logs, setLogs] = useState<string[]>([]);
  const [typingComplete, setTypingComplete] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const consoleBodyRef = useRef<HTMLDivElement>(null);

  // Command typing animation effect
  useEffect(() => {
    const fullCommand = "curl -I https://api.jirayut.dev/health";
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullCommand.length) {
        setCurrentText(prev => prev + fullCommand.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        setTypingComplete(true);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  // Response and log streaming animation effect
  useEffect(() => {
    if (!typingComplete) return;

    const responseTimeout = setTimeout(() => {
      setLogs([
        "HTTP/2 200 OK",
        "content-type: application/json",
        "x-response-time: 8ms",
        JSON.stringify(
          {
            status: "UP",
            services: {
              gateway: "nominal",
              dotnet_core_api: "nominal",
              postgres_pool: "nominal (12ms)",
              redis_cache: "nominal (1ms)"
            }
          },
          null,
          2
        ),
        "",
        "$ tail -f api-gateway.log"
      ]);
    }, 500);

    let logInterval: NodeJS.Timeout;
    const startStreamTimeout = setTimeout(() => {
      let index = 0;
      logInterval = setInterval(() => {
        const date = new Date();
        const timeStr = date.toTimeString().split(" ")[0];
        const template = LOG_TEMPLATES[index % LOG_TEMPLATES.length];
        setLogs(prev => {
          const next = [...prev, `[${timeStr}] ${template}`];
          // Limit logs to keep it clean and scrolling nicely
          if (next.length > 11) {
            return next.slice(next.length - 11);
          }
          return next;
        });
        index++;
      }, 2500);
    }, 1800);

    return () => {
      clearTimeout(responseTimeout);
      clearTimeout(startStreamTimeout);
      if (logInterval) clearInterval(logInterval);
    };
  }, [typingComplete]);

  // Auto-scroll effect for terminal logs
  useEffect(() => {
    if (consoleBodyRef.current) {
      consoleBodyRef.current.scrollTo({
        top: consoleBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [logs, currentText]);

  const renderLogLine = (line: string, idx: number) => {
    if (
      line.startsWith("$") ||
      line.startsWith("HTTP") ||
      line.startsWith("content-type") ||
      line.startsWith("x-response-time") ||
      line.startsWith("{") ||
      line.startsWith("}") ||
      line.startsWith("  ")
    ) {
      return (
        <div key={idx} className="text-slate-400 whitespace-pre font-mono">
          {line}
        </div>
      );
    }

    // Parse format: [13:45:20] GET /api/v1/projects - 200 OK - 12ms
    const match = line.match(/^\[(.*?)\]\s+(GET|POST|PUT|DELETE)\s+(.*?)\s+-\s+(.*?)\s+-\s+(.*?)$/);
    if (match) {
      const [_, time, method, path, status, latency] = match;
      let methodColor = "text-emerald-400";
      if (method === "POST") methodColor = "text-sky-400";
      if (method === "PUT") methodColor = "text-amber-400";

      let statusColor = "text-emerald-400";
      if (status.includes("201")) statusColor = "text-teal-400";

      return (
        <div key={idx} className="flex flex-wrap gap-x-1.5 py-0.5 font-mono">
          <span className="text-slate-600">[{time}]</span>
          <span className={`${methodColor} font-bold`}>{method}</span>
          <span className="text-slate-300">{path}</span>
          <span className="text-slate-500">-</span>
          <span className={`${statusColor}`}>{status}</span>
          <span className="text-slate-500">-</span>
          <span className="text-slate-400">{latency}</span>
        </div>
      );
    }

    return (
      <div key={idx} className="text-slate-300 font-mono">
        {line}
      </div>
    );
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 lg:pt-28 pb-16">
      {/* Glow mesh background */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary/8 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-accent/8 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none z-0"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none dark:opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide mb-6 border border-emerald-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              tum-api: online (99.99% uptime)
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                High-Performance
              </span> <br />
              & Scalable Backends
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl text-lg text-foreground/60 mb-8 leading-relaxed"
            >
              Hi, I'm <strong className="text-foreground font-semibold">Tum Jirayut</strong>, a Mid-Level Backend Developer. 
              I specialize in designing robust APIs, optimizing database performance, 
              and orchestrating microservices architectures using .NET Core.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 group"
              >
                Explore Projects
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm font-semibold hover:bg-secondary transition-all duration-300 hover:-translate-y-0.5 text-center text-foreground"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Right Column: Console */}
          <div className="lg:col-span-5 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full bg-[#0a0f1d] border border-slate-800 dark:border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#050811] border-b border-slate-900">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                </div>
                <div className="flex bg-[#0a0f1d] rounded-lg p-0.5 border border-slate-800/80">
                  <button
                    onClick={() => setActiveTab("terminal")}
                    className={`px-3 py-1 text-xs rounded-md transition-all font-semibold ${
                      activeTab === "terminal"
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    terminal.sh
                  </button>
                  <button
                    onClick={() => setActiveTab("architecture")}
                    className={`px-3 py-1 text-xs rounded-md transition-all font-semibold ${
                      activeTab === "architecture"
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    architecture.draw
                  </button>
                </div>
                <div className="w-12"></div>
              </div>

              {/* Console Body */}
              <div
                ref={consoleBodyRef}
                className="p-4 h-[340px] overflow-y-auto flex flex-col bg-[#03060f]/95"
              >
                {activeTab === "terminal" ? (
                  <div className="flex-1 font-mono text-[11px] leading-relaxed text-slate-300">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-2">
                      <span className="text-slate-500">spectrum@tum-api %</span>
                      <span>{currentText}</span>
                      {!typingComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-1.5 h-3.5 bg-emerald-400"
                        />
                      )}
                    </div>

                    <div className="space-y-1">
                      {logs.map((line, idx) => renderLogLine(line, idx))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 500 300" className="w-full h-full max-h-[280px]">
                      {/* Grid Lines */}
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.03" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Connection Paths (Dashed Background) */}
                      <line
                        x1="80"
                        y1="150"
                        x2="150"
                        y2="150"
                        stroke="#1e293b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1="210"
                        y1="150"
                        x2="280"
                        y2="150"
                        stroke="#1e293b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M 340 150 L 410 80"
                        stroke="#1e293b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                      />
                      <path
                        d="M 340 150 L 410 220"
                        stroke="#1e293b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                      />

                      {/* Flowing Packets */}
                      <FlowingDot startX={80} startY={150} endX={150} endY={150} delay={0} duration={2.5} />
                      <FlowingDot startX={80} startY={150} endX={150} endY={150} delay={1.25} duration={2.5} />
                      
                      <FlowingDot startX={210} startY={150} endX={280} endY={150} delay={0.4} duration={2} />
                      <FlowingDot startX={210} startY={150} endX={280} endY={150} delay={1.4} duration={2} />

                      <FlowingDot startX={340} startY={150} endX={410} endY={80} delay={0.8} duration={2} />
                      <FlowingDot startX={340} startY={150} endX={410} endY={220} delay={1.3} duration={2} />

                      {/* Client Node */}
                      <g transform="translate(20, 120)">
                        <rect x="0" y="0" width="60" height="60" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                        <rect x="18" y="16" width="24" height="18" rx="2" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                        <path d="M 24 34 L 20 42 L 40 42 L 36 34" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="30" y="74" textAnchor="middle" className="text-[9px] fill-slate-400 font-sans font-semibold">Client</text>
                      </g>

                      {/* API Gateway Node */}
                      <g transform="translate(150, 120)">
                        <rect x="0" y="0" width="60" height="60" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                        <circle cx="30" cy="28" r="10" fill="none" stroke="#818cf8" strokeWidth="1.5" />
                        <path d="M 24 28 L 36 28 M 27 25 L 24 28 L 27 31 M 33 25 L 36 28 L 33 31" fill="none" stroke="#818cf8" strokeWidth="1.5" />
                        <text x="30" y="74" textAnchor="middle" className="text-[9px] fill-slate-400 font-sans font-semibold">API Gateway</text>
                      </g>

                      {/* API Service Node */}
                      <g transform="translate(280, 120)">
                        <rect x="0" y="0" width="60" height="60" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                        <rect x="18" y="14" width="24" height="8" rx="1.5" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                        <rect x="18" y="24" width="24" height="8" rx="1.5" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                        <circle cx="22" cy="18" r="1" fill="#6366f1" />
                        <circle cx="22" cy="28" r="1" fill="#6366f1" />
                        <line x1="26" y1="18" x2="36" y2="18" stroke="#6366f1" strokeWidth="1" opacity="0.6" />
                        <line x1="26" y1="28" x2="36" y2="28" stroke="#6366f1" strokeWidth="1" opacity="0.6" />
                        <text x="30" y="74" textAnchor="middle" className="text-[9px] fill-slate-400 font-sans font-semibold">API Service</text>
                      </g>

                      {/* Redis Cache Node */}
                      <g transform="translate(410, 50)">
                        <rect x="0" y="0" width="60" height="60" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                        <rect x="20" y="14" width="20" height="22" rx="2" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                        <line x1="24" y1="20" x2="32" y2="20" stroke="#f59e0b" strokeWidth="1" opacity="0.7" />
                        <line x1="24" y1="25" x2="36" y2="25" stroke="#f59e0b" strokeWidth="1" opacity="0.7" />
                        <line x1="24" y1="30" x2="28" y2="30" stroke="#f59e0b" strokeWidth="1" opacity="0.7" />
                        <text x="30" y="74" textAnchor="middle" className="text-[9px] fill-slate-400 font-sans font-semibold">Redis Cache</text>
                      </g>

                      {/* Postgres DB Node */}
                      <g transform="translate(410, 190)">
                        <rect x="0" y="0" width="60" height="60" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                        <ellipse cx="30" cy="20" rx="12" ry="4" fill="none" stroke="#10b981" strokeWidth="1.5" />
                        <path d="M 18 20 V 27 C 18 30, 42 30, 42 27 V 20" fill="none" stroke="#10b981" strokeWidth="1.5" />
                        <path d="M 18 27 V 34 C 18 37, 42 37, 42 34 V 27" fill="none" stroke="#10b981" strokeWidth="1.5" />
                        <text x="30" y="74" textAnchor="middle" className="text-[9px] fill-slate-400 font-sans font-semibold">PostgreSQL</text>
                      </g>
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

