"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  IconCode,
  IconServer,
  IconShield
} from "@/components/ui/Icons";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1 }
};

const circleVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1 }
};

const PhilosophySection = () => {
  const [simState, setSimState] = useState<"idle" | "spiking" | "scaling" | "healing" | "recovered">("idle");
  const [latency, setLatency] = useState(12);
  const [replicas, setReplicas] = useState(3);
  const [cpuUsage, setCpuUsage] = useState(22);
  const [errorRate, setErrorRate] = useState(0);
  const [reqRate, setReqRate] = useState(120);
  const [highlightedKeyword, setHighlightedKeyword] = useState<"maintainable" | "observable" | "resilient" | null>(null);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const runSimulation = () => {
    if (simState !== "idle") return;
    
    // Clear any leftover timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Phase 1: Traffic Spike (0ms - 1200ms)
    setSimState("spiking");
    setLatency(178);
    setCpuUsage(94);
    setErrorRate(0.85);
    setReqRate(1250);
    
    const t1 = setTimeout(() => {
      setSimState("scaling");
      setReplicas(4);
      setCpuUsage(76);
      setReqRate(1100);
    }, 1200);
    
    const t2 = setTimeout(() => {
      setSimState("healing");
      setReplicas(5);
      setCpuUsage(38);
      setLatency(18);
      setErrorRate(0.0);
      setReqRate(850);
    }, 2400);
    
    const t3 = setTimeout(() => {
      setSimState("recovered");
      setReqRate(120);
    }, 3800);
    
    const t4 = setTimeout(() => {
      setSimState("idle");
      setReplicas(3);
      setCpuUsage(22);
      setLatency(12);
    }, 4800);

    timeoutsRef.current = [t1, t2, t3, t4];
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.section 
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-3xl border border-border bg-card text-card-foreground relative overflow-hidden shadow-xl"
    >
      {/* Decorative background grid and elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 relative z-10 items-center">
        
        {/* Left Column (Philosophy Text) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 w-fit select-none">
            <IconCode className="w-3.5 h-3.5" />
            <span>Technical Philosophy</span>
          </div>
          
          <div className="font-mono text-xs text-foreground/45 mb-4 flex items-center gap-2 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>tum@fwd-core-api: ~ $ cat philosophy.json</span>
          </div>
          
          <div className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight text-foreground/90 dark:text-foreground mb-4">
            &ldquo;I believe that backend development is the <span className="text-primary font-semibold">bedrock</span> of any successful digital product. 
            My focus is on creating systems that are not just functional, but{" "}
            <span 
              className={`relative inline-block cursor-help transition-all duration-300 font-semibold ${
                highlightedKeyword === 'maintainable' 
                  ? 'text-accent border-b-2 border-accent px-1 bg-accent/5 rounded' 
                  : 'border-b border-foreground/30 hover:text-accent hover:border-accent'
              }`}
              onMouseEnter={() => setHighlightedKeyword('maintainable')}
              onMouseLeave={() => setHighlightedKeyword(null)}
            >
              maintainable
            </span>
            ,{" "}
            <span 
              className={`relative inline-block cursor-help transition-all duration-300 font-semibold ${
                highlightedKeyword === 'observable' 
                  ? 'text-accent border-b-2 border-accent px-1 bg-accent/5 rounded' 
                  : 'border-b border-foreground/30 hover:text-accent hover:border-accent'
              }`}
              onMouseEnter={() => setHighlightedKeyword('observable')}
              onMouseLeave={() => setHighlightedKeyword(null)}
            >
              observable
            </span>
            , and{" "}
            <span 
              className={`relative inline-block cursor-help transition-all duration-300 font-semibold ${
                highlightedKeyword === 'resilient' 
                  ? 'text-accent border-b-2 border-accent px-1 bg-accent/5 rounded' 
                  : 'border-b border-foreground/30 hover:text-accent hover:border-accent'
              }`}
              onMouseEnter={() => setHighlightedKeyword('resilient')}
              onMouseLeave={() => setHighlightedKeyword(null)}
            >
              resilient under pressure
            </span>
            .&rdquo;
          </div>
        </div>
        
        {/* Right Column (Simulator Panel) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl border border-slate-800/80 bg-slate-950 p-6 font-mono text-slate-300 shadow-2xl overflow-hidden min-h-[360px] flex flex-col justify-between select-none">
            {/* Dashboard Grid Background overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Widget Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4 relative z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[10px] text-slate-500 ml-2">MONITOR_v1.0.4</span>
              </div>
              
              {/* Status Indicator */}
              <div className={`text-[10px] px-2 py-0.5 rounded-full border transition-all duration-300 font-bold ${
                simState === 'idle' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
                simState === 'spiking' ? 'border-rose-500/30 bg-rose-500/10 text-rose-400 animate-pulse' :
                simState === 'scaling' ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' :
                simState === 'healing' ? 'border-sky-500/30 bg-sky-500/10 text-sky-400' :
                'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              }`}>
                {simState === 'idle' && '● HEALTHY'}
                {simState === 'spiking' && '▲ OVERLOAD_ALERT'}
                {simState === 'scaling' && '⚙ SCALING_INFRA'}
                {simState === 'healing' && '🛡 HEALTH_RESTORING'}
                {simState === 'recovered' && '✓ STABILIZED'}
              </div>
            </div>
            
            {/* Visual Architecture Diagram */}
            <div className="relative h-28 flex justify-center items-center mb-4 z-10 border border-slate-900 bg-slate-950/50 rounded-lg p-2">
              <svg className="w-full h-full" viewBox="0 0 320 100">
                {/* Connection Lines from Gateway (160, 15) to Replicas */}
                <path d="M160 25 L90 45" stroke={simState === 'spiking' ? '#ef4444' : '#334155'} strokeWidth="1.5" />
                <path d="M160 25 L125 45" stroke={simState === 'spiking' ? '#ef4444' : '#334155'} strokeWidth="1.5" />
                <path d="M160 25 L160 45" stroke={simState === 'spiking' ? '#ef4444' : '#334155'} strokeWidth="1.5" />
                
                {/* Conditional Paths for dynamic scaled replicas R4 & R5 */}
                {replicas >= 4 && (
                  <motion.path 
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                    d="M160 25 L195 45" 
                    stroke={simState === 'healing' ? '#38bdf8' : '#334155'} 
                    strokeWidth="1.5" 
                  />
                )}
                {replicas >= 5 && (
                  <motion.path 
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                    d="M160 25 L230 45" 
                    stroke={simState === 'healing' ? '#38bdf8' : '#334155'} 
                    strokeWidth="1.5" 
                  />
                )}

                {/* Flowing connection indicators */}
                <path 
                  d="M160 25 L90 45" 
                  stroke={simState === 'spiking' ? '#ef4444' : (simState === 'healing' ? '#38bdf8' : '#6366f1')} 
                  strokeWidth="2" 
                  fill="none" 
                  className={simState === 'spiking' ? 'path-flow-fast' : (simState === 'scaling' ? 'path-flow-medium' : 'path-flow-slow')} 
                />
                <path 
                  d="M160 25 L125 45" 
                  stroke={simState === 'spiking' ? '#ef4444' : (simState === 'healing' ? '#38bdf8' : '#6366f1')} 
                  strokeWidth="2" 
                  fill="none" 
                  className={simState === 'spiking' ? 'path-flow-fast' : (simState === 'scaling' ? 'path-flow-medium' : 'path-flow-slow')} 
                />
                <path 
                  d="M160 25 L160 45" 
                  stroke={simState === 'spiking' ? '#ef4444' : (simState === 'healing' ? '#38bdf8' : '#6366f1')} 
                  strokeWidth="2" 
                  fill="none" 
                  className={simState === 'spiking' ? 'path-flow-fast' : (simState === 'scaling' ? 'path-flow-medium' : 'path-flow-slow')} 
                />
                
                {replicas >= 4 && (
                  <path 
                    d="M160 25 L195 45" 
                    stroke={simState === 'healing' ? '#38bdf8' : '#6366f1'} 
                    strokeWidth="2" 
                    fill="none" 
                    className={simState === 'healing' ? 'path-flow-slow' : 'path-flow-medium'} 
                  />
                )}
                {replicas >= 5 && (
                  <path 
                    d="M160 25 L230 45" 
                    stroke={simState === 'healing' ? '#38bdf8' : '#6366f1'} 
                    strokeWidth="2" 
                    fill="none" 
                    className={simState === 'healing' ? 'path-flow-slow' : 'path-flow-medium'} 
                  />
                )}

                {/* Connection Lines from Replicas to DB (160, 85) */}
                <path d="M90 55 L160 75" stroke="#334155" strokeWidth="1" />
                <path d="M125 55 L160 75" stroke="#334155" strokeWidth="1" />
                <path d="M160 55 L160 75" stroke="#334155" strokeWidth="1" />
                {replicas >= 4 && <path d="M195 55 L160 75" stroke="#334155" strokeWidth="1" />}
                {replicas >= 5 && <path d="M230 55 L160 75" stroke="#334155" strokeWidth="1" />}

                {/* Gateway Node Icon */}
                <g transform="translate(145, 5)">
                  <rect width="30" height="15" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                  <text x="15" y="10" fontSize="7" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">GW</text>
                </g>

                {/* Replicas Nodes (R1-R5) */}
                <circle cx="90" cy="50" r="6" fill={simState === 'spiking' ? '#ef4444' : '#10b981'} stroke="#1e293b" strokeWidth="1.5" />
                <circle cx="125" cy="50" r="6" fill={simState === 'spiking' ? '#ef4444' : '#10b981'} stroke="#1e293b" strokeWidth="1.5" />
                <circle cx="160" cy="50" r="6" fill={simState === 'spiking' ? '#ef4444' : '#10b981'} stroke="#1e293b" strokeWidth="1.5" />
                
                {/* Node 4 (Dynamic) */}
                {replicas >= 4 ? (
                  <motion.circle 
                    variants={circleVariants}
                    initial="hidden"
                    animate="visible"
                    cx="195" 
                    cy="50" 
                    r="6" 
                    fill="#0284c7" 
                    stroke="#1e293b" 
                    strokeWidth="1.5" 
                  />
                ) : (
                  <circle cx="195" cy="50" r="6" fill="transparent" stroke="#334155" strokeDasharray="2,2" strokeWidth="1" />
                )}

                {/* Node 5 (Dynamic) */}
                {replicas >= 5 ? (
                  <motion.circle 
                    variants={circleVariants}
                    initial="hidden"
                    animate="visible"
                    cx="230" 
                    cy="50" 
                    r="6" 
                    fill="#0284c7" 
                    stroke="#1e293b" 
                    strokeWidth="1.5" 
                  />
                ) : (
                  <circle cx="230" cy="50" r="6" fill="transparent" stroke="#334155" strokeDasharray="2,2" strokeWidth="1" />
                )}

                {/* Database Node Icon */}
                <g transform="translate(145, 75)">
                  <rect width="30" height="15" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                  <text x="15" y="10" fontSize="7" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">DB</text>
                </g>
              </svg>
              <span className="absolute bottom-1 right-2 text-[8px] text-slate-600">INFRA_MAP</span>
            </div>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
              {/* Latency Metric */}
              <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
                highlightedKeyword === 'observable'
                  ? 'border-accent bg-accent/10 shadow-[0_0_8px_rgba(99,102,241,0.2)]'
                  : 'border-slate-900 bg-slate-950/40'
              }`}>
                <div className="text-[9px] text-slate-500 mb-1 flex items-center justify-between">
                  <span>LATENCY</span>
                  {simState === 'spiking' && <span className="text-rose-500 text-[8px] animate-pulse">SPIKE</span>}
                </div>
                <div className={`text-sm font-bold tracking-tight ${
                  latency > 100 ? 'text-rose-400' : 'text-slate-200'
                }`}>
                  {latency} <span className="text-[10px] font-normal text-slate-500">ms</span>
                </div>
                {/* Latency Bar */}
                <div className="w-full bg-slate-900 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${latency > 100 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, (latency / 200) * 100)}%` }} 
                  />
                </div>
              </div>

              {/* CPU Usage Metric */}
              <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
                highlightedKeyword === 'resilient'
                  ? 'border-accent bg-accent/10 shadow-[0_0_8px_rgba(99,102,241,0.2)]'
                  : 'border-slate-900 bg-slate-950/40'
              }`}>
                <div className="text-[9px] text-slate-500 mb-1 flex items-center justify-between">
                  <span>CPU LOAD</span>
                  {cpuUsage > 80 && <span className="text-rose-500 text-[8px] animate-pulse">HIGH</span>}
                </div>
                <div className={`text-sm font-bold tracking-tight ${
                  cpuUsage > 80 ? 'text-rose-400' : 'text-slate-200'
                }`}>
                  {cpuUsage} <span className="text-[10px] font-normal text-slate-500">%</span>
                </div>
                {/* CPU Bar */}
                <div className="w-full bg-slate-900 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${cpuUsage > 80 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                    style={{ width: `${cpuUsage}%` }} 
                  />
                </div>
              </div>

              {/* Active Replicas Metric */}
              <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
                highlightedKeyword === 'maintainable'
                  ? 'border-accent bg-accent/10 shadow-[0_0_8px_rgba(99,102,241,0.2)]'
                  : 'border-slate-900 bg-slate-950/40'
              }`}>
                <div className="text-[9px] text-slate-500 mb-1 flex items-center justify-between">
                  <span>REPLICAS</span>
                  {replicas > 3 && <span className="text-sky-400 text-[8px]">SCALED</span>}
                </div>
                <div className="text-sm font-bold tracking-tight text-slate-200">
                  {replicas} <span className="text-[10px] font-normal text-slate-500">/ 5 nodes</span>
                </div>
                {/* Node count dots */}
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-3.5 rounded-sm transition-all duration-300 ${
                        i < replicas 
                          ? (simState === 'spiking' ? 'bg-rose-500' : (i >= 3 ? 'bg-sky-500' : 'bg-emerald-500'))
                          : 'bg-slate-900 border border-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Requests Rate / Health Metric */}
              <div className="p-2.5 rounded-lg border border-slate-900 bg-slate-950/40">
                <div className="text-[9px] text-slate-500 mb-1 flex items-center justify-between">
                  <span>REQUEST RATE</span>
                  <span>ERROR RATE</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-sm font-bold tracking-tight text-slate-200">
                    {reqRate.toLocaleString()} <span className="text-[8px] font-normal text-slate-500">r/s</span>
                  </div>
                  <div className={`text-xs font-bold ${
                    errorRate > 0 ? 'text-rose-400' : 'text-slate-400'
                  }`}>
                    {errorRate}%
                  </div>
                </div>
                {/* Sparkline Visualizer */}
                <div className="flex items-end justify-between h-4 mt-1.5 gap-0.5">
                  {Array.from({ length: 15 }).map((_, i) => {
                    let barHeight = "h-1";
                    if (simState === 'spiking') {
                      barHeight = i > 10 ? "h-3" : (i > 6 ? "h-4" : "h-2");
                    } else if (simState === 'scaling' || simState === 'healing') {
                      barHeight = i > 10 ? "h-2" : (i > 6 ? "h-3" : "h-4");
                    } else {
                      barHeight = i % 3 === 0 ? "h-1.5" : (i % 2 === 0 ? "h-1" : "h-2");
                    }
                    return (
                      <div 
                        key={i} 
                        className={`w-full rounded-t-sm transition-all duration-500 ${barHeight} ${
                          simState === 'spiking' ? 'bg-rose-500/60' : (simState === 'healing' ? 'bg-sky-500/60' : 'bg-slate-800')
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Simulation Control Trigger Button */}
            <button 
              onClick={runSimulation}
              disabled={simState !== "idle"}
              className={`w-full py-2.5 rounded-lg border font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative z-10 ${
                simState === "idle" 
                  ? "border-primary/50 bg-primary/10 hover:bg-primary/20 text-foreground hover:text-primary-foreground" 
                  : "border-slate-900 bg-slate-900 text-slate-500 cursor-not-allowed"
              }`}
            >
              {simState === "idle" && (
                <>
                  <IconServer className="w-3.5 h-3.5 animate-pulse text-primary" />
                  <span>Simulate Resilience Test</span>
                </>
              )}
              {simState === "spiking" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-1" />
                  <span>Load Spike: Latency Rising</span>
                </>
              )}
              {simState === "scaling" && (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-1" />
                  <span>Auto-Scaling Replica Nodes</span>
                </>
              )}
              {simState === "healing" && (
                <>
                  <IconShield className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
                  <span>Auto-Healing System</span>
                </>
              )}
              {simState === "recovered" && (
                <>
                  <span>✓ Node Rebalanced & Healthy</span>
                </>
              )}
            </button>
          </div>
        </div>
        
      </div>
    </motion.section>
  );
};

export default PhilosophySection;
