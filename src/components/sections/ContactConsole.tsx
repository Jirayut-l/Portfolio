"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LOG_STEPS = [
  { text: "[CONNECT] Establishing TLS 1.3 connection to api.jirayut.dev:443...", type: "info" },
  { text: "[TLS] Handshake complete. Cipher: TLS_AES_256_GCM_SHA384", type: "info" },
  { text: "[GATEWAY] Routing request. Rate limiter: PASS (Quota 5/min)", type: "info" },
  { text: "[NET-CORE] Handled by MessageController.cs. Initializing thread...", type: "info" },
  { text: "[VALIDATION] Model validation succeeded. Sanitizing inputs...", type: "info" },
  { text: "[DATABASE] Postgres INSERT INTO \"contacts\" (\"name\", \"email\", \"body\") VALUES ($1, $2, $3)...", type: "db" },
  { text: "[SMTP] Enqueued mail notification job to RabbitMQ queue...", type: "queue" },
  { text: "[RESPONSE] HTTP/2 201 Created - Payload Delivered.", type: "success" }
];

const ContactConsole = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [visibleLogCount, setVisibleLogCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"terminal" | "metrics">("terminal");
  const [successDetails, setSuccessDetails] = useState<{ messageId: string; timestamp: string } | null>(null);

  const [metrics, setMetrics] = useState({
    cpu: 2.1,
    memory: 144,
    connections: 5,
    latency: 12
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Live metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: parseFloat((1.5 + Math.random() * 2.5).toFixed(1)),
        memory: Math.floor(140 + Math.random() * 10),
        connections: Math.floor(4 + Math.random() * 3),
        latency: Math.floor(10 + Math.random() * 6)
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleLogCount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || status === "success") return;

    setStatus("sending");
    setVisibleLogCount(0);
    setSuccessDetails(null);

    let currentLog = 0;
    const interval = setInterval(() => {
      setVisibleLogCount((prev) => prev + 1);
      currentLog++;

      if (currentLog >= LOG_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => {
          setSuccessDetails({
            messageId: `msg_${Math.random().toString(36).substring(2, 10)}`,
            timestamp: new Date().toISOString()
          });
          setStatus("success");
        }, 500);
      }
    }, 350);
  };

  const renderHeartbeat = () => (
    <div className="w-full h-16 bg-zinc-900/30 rounded-xl border border-zinc-800/50 flex items-center justify-between px-4 overflow-hidden relative animate-fade-in">
      <div className="flex flex-col z-10">
        <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Gateway Latency</span>
        <span className="text-xs font-mono font-bold text-emerald-400">{metrics.latency}ms</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <svg className="w-full h-10" viewBox="0 0 300 48" fill="none">
          <path
            d="M0 24 H80 L90 12 L100 36 L110 24 H180 L190 6 L200 42 L210 24 H300"
            stroke="#10b981"
            strokeWidth="1.5"
            className="path-flow-medium"
          />
        </svg>
      </div>
      <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[9px] font-mono font-semibold uppercase text-emerald-400">Live</span>
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-4 py-2 flex-1 flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-800/80">
          <div className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 mb-1 font-mono">CPU Load</div>
          <div className="text-xl font-mono font-bold text-emerald-400">{metrics.cpu}%</div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-400 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, metrics.cpu * 10)}%` }}
            />
          </div>
        </div>
        <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-800/80">
          <div className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 mb-1 font-mono">Memory (RAM)</div>
          <div className="text-xl font-mono font-bold text-sky-400">{metrics.memory} MB</div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-sky-400 h-full transition-all duration-500"
              style={{ width: `${(metrics.memory / 512) * 100}%` }}
            />
          </div>
        </div>
        <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-800/80">
          <div className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 mb-1 font-mono">Active DB Pools</div>
          <div className="text-xl font-mono font-bold text-amber-400">{metrics.connections} Conns</div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-500"
              style={{ width: `${(metrics.connections / 10) * 100}%` }}
            />
          </div>
        </div>
        <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-800/80">
          <div className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 mb-1 font-mono">Engine Runtime</div>
          <div className="text-sm font-mono font-bold text-violet-400">.NET Core 9.0</div>
          <div className="text-[9px] text-zinc-500 mt-2 font-mono">CLR GC Mode: Server</div>
        </div>
      </div>
      {renderHeartbeat()}
    </div>
  );

  const renderLogs = () => {
    if (status === "idle") {
      return (
        <div className="flex-1 flex flex-col justify-between font-mono text-xs text-zinc-400 space-y-4">
          <div className="flex-1 space-y-2 overflow-y-auto max-h-[220px] p-3 bg-zinc-950/60 rounded-xl border border-zinc-900/80">
            <div className="text-zinc-600">{"// Standby telemetry logs..."}</div>
            <div className="text-zinc-500">
              [SYS] <span className="text-emerald-500 font-semibold">OK</span> - API Gateway active on port 443
            </div>
            <div className="text-zinc-500">
              [DB] <span className="text-emerald-500 font-semibold">OK</span> - Postgres connection pool ready
            </div>
            <div className="text-zinc-500">
              [REDIS] <span className="text-emerald-500 font-semibold">OK</span> - Ping latency 1.1ms (Cache warm)
            </div>
            <div className="text-zinc-600 animate-pulse">[READY] Awaiting payload dispatch...</div>
          </div>
          {renderHeartbeat()}
        </div>
      );
    }

    if (status === "sending") {
      return (
        <div className="flex-1 flex flex-col font-mono text-xs text-zinc-400 p-4 bg-zinc-950/60 rounded-xl border border-zinc-900/80 overflow-y-auto max-h-[300px] space-y-2.5">
          {LOG_STEPS.slice(0, visibleLogCount).map((step, idx) => {
            let color = "text-zinc-400";
            if (step.type === "db") color = "text-amber-400/95";
            if (step.type === "queue") color = "text-sky-400/95";
            if (step.type === "success") color = "text-emerald-400 font-bold";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start space-x-2 ${color}`}
              >
                <span>&gt;</span>
                <span className="break-all">{step.text}</span>
              </motion.div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>
      );
    }

    if (status === "success") {
      return (
        <div className="flex-1 flex flex-col font-mono text-xs text-zinc-400 space-y-4">
          <div className="flex-1 p-4 bg-zinc-950/60 rounded-xl border border-zinc-900/80 overflow-y-auto max-h-[240px]">
            <div className="text-emerald-400 font-bold mb-2 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>HTTP/2 201 Created</span>
            </div>
            <div className="text-zinc-600 mb-1">{"// Response Payload"}</div>
            <pre className="text-emerald-400/90 overflow-x-auto whitespace-pre-wrap">
{`{
  "statusCode": 201,
  "status": "Created",
  "data": {
    "messageId": "${successDetails?.messageId || ""}",
    "received": true,
    "payload": {
      "sender": "${formData.name}",
      "email": "${formData.email}",
      "bytesTransmitted": 128
    },
    "timestamp": "${successDetails?.timestamp || ""}"
  }
}`}
            </pre>
          </div>
          <button
            onClick={() => {
              setStatus("idle");
              setFormData({ name: "", email: "", message: "" });
              setVisibleLogCount(0);
              setSuccessDetails(null);
            }}
            className="w-full py-3 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors duration-300 font-bold uppercase tracking-wider text-[10px] text-zinc-300 cursor-pointer"
          >
            Reset Console & Compose New
          </button>
        </div>
      );
    }

    return null;
  };

  const renderJsonBody = () => (
    <div className="bg-zinc-900/40 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-400 overflow-x-auto">
      <div className="text-zinc-600 mb-1">{"// Request Body (JSON)"}</div>
      <div>
        <span className="text-zinc-500">{"{"}</span>
      </div>
      <div className="pl-4">
        <span className="text-emerald-400">&quot;sender&quot;</span>: <span className="text-amber-400">&quot;{formData.name || ""}&quot;</span>,
      </div>
      <div className="pl-4">
        <span className="text-emerald-400">&quot;email&quot;</span>: <span className="text-amber-400">&quot;{formData.email || ""}&quot;</span>,
      </div>
      <div className="pl-4">
        <span className="text-emerald-400">&quot;message&quot;</span>: <span className="text-amber-400">&quot;{formData.message || ""}&quot;</span>
      </div>
      <div>
        <span className="text-zinc-500">{"}"}</span>
      </div>
    </div>
  );

  return (
    <div className="lg:col-span-7">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-t border-x border-zinc-800 rounded-t-2xl font-mono text-[10px] text-zinc-500">
        {/* Status bar */}
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>SERVER STATUS: OPERATIONAL</span>
        </div>
        <div>REGION: AP-SOUTHEAST-1</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border-x border-b border-zinc-800 rounded-b-2xl overflow-hidden">
        {/* Split console */}

        <div className="bg-zinc-950 p-6 flex flex-col space-y-4">
          {/* Left pane: Composer */}
          <div className="flex items-center space-x-2 pb-3 border-b border-zinc-900">
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold">POST</span>
            <span className="font-mono text-[10px] text-zinc-400 truncate">/v1/messages</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-[9px] font-bold mb-1 uppercase tracking-wider text-zinc-500 font-mono">Sender Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-white font-mono placeholder-zinc-500"
                  placeholder="John Doe"
                  required
                  disabled={status === "sending" || status === "success"}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[9px] font-bold mb-1 uppercase tracking-wider text-zinc-500 font-mono">Email Endpoint</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-white font-mono placeholder-zinc-500"
                  placeholder="john@example.com"
                  required
                  disabled={status === "sending" || status === "success"}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[9px] font-bold mb-1 uppercase tracking-wider text-zinc-500 font-mono">Payload Message</label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-white font-mono placeholder-zinc-500 resize-none"
                  placeholder="Project requirements..."
                  required
                  disabled={status === "sending" || status === "success"}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full py-2.5 rounded-lg bg-primary text-white text-[10px] font-bold font-mono hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-primary/10 uppercase tracking-wider cursor-pointer"
              >
                {status === "sending" ? "Dispatching..." : status === "success" ? "Payload Received" : "Execute Request [POST]"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-zinc-950 p-6 flex flex-col min-h-[340px]">
          {/* Right pane: Console logs or JSON body preview */}
          <div className="flex space-x-4 border-b border-zinc-900 pb-3 mb-4 font-mono text-[10px]">
            {/* Tabs */}
            <button
              onClick={() => setActiveTab("terminal")}
              className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer ${activeTab === "terminal" ? "text-primary border-b border-primary font-bold" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              Console Output
            </button>
            <button
              onClick={() => setActiveTab("metrics")}
              className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer ${activeTab === "metrics" ? "text-primary border-b border-primary font-bold" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              System Metrics
            </button>
          </div>

          {activeTab === "terminal" ? renderLogs() : renderMetrics()}

          {activeTab === "terminal" && status === "idle" && (
            <div className="mt-4 border-t border-zinc-900/60 pt-4">
              {renderJsonBody()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactConsole;
