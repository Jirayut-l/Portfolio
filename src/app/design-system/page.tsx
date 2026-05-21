"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Navbar from "@/components/sections/Navbar";

// --- Helper Components ---

const SectionHeader = ({ title, description, id }: { title: string; description?: string; id?: string }) => (
  <header id={id} className="space-y-4 mb-12 scroll-mt-24">
    <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
    {description && <p className="text-foreground/80 max-w-2xl text-lg leading-relaxed">{description}</p>}
  </header>
);

const ComponentCanvas = ({ children }: { children: React.ReactNode }) => (
  <div className="p-12 bg-secondary/30 rounded-xl border border-border/50 flex flex-wrap gap-8 items-center justify-center">
    {children}
  </div>
);

const TocLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="block text-sm font-medium text-foreground/50 hover:text-foreground transition-all duration-200 py-1.5 border-l border-transparent hover:border-foreground/20 pl-4 -ml-[1px]"
  >
    {children}
  </a>
);

const FadeInSection = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="mb-24 pb-24 border-b border-border/40 last:border-0"
  >
    {children}
  </motion.section>
);

// --- Main Page ---

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="container mx-auto px-spacing-md pt-32 pb-spacing-xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar (Table of Contents) */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-32">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 px-4 mb-6">
                Navigation
              </h3>
              <nav className="border-l border-border/30 space-y-1">
                <TocLink href="#intro">Introduction</TocLink>
                <TocLink href="#typography">Typography</TocLink>
                <TocLink href="#colors">Colors</TocLink>
                <TocLink href="#spacing">Spacing</TocLink>
                <TocLink href="#buttons">Buttons</TocLink>
                <TocLink href="#badges">Badges</TocLink>
                <TocLink href="#cards">Cards</TocLink>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            <section id="intro" className="mb-24 space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tighter lg:text-7xl text-foreground">
                Design System
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl leading-relaxed">
                A refined collection of tokens and components that define the visual language of my portfolio. 
                Built for clarity, performance, and a professional backend-developer aesthetic.
              </p>
            </section>

            <FadeInSection id="typography">
              <SectionHeader 
                title="Typography" 
                description="The project uses Geist Sans for general UI and Geist Mono for code, technical data, and micro-labels. These fonts prioritize legibility and a modern, engineered feel."
              />
              <div className="space-y-12 p-12 border border-border/50 rounded-xl bg-secondary/10">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">Sans Serif - Geist Sans</span>
                  <p className="text-5xl font-bold tracking-tight">Abcdefghijklmnopqrstuvwxyz</p>
                  <p className="text-lg text-foreground/70">ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890</p>
                </div>
                <hr className="border-border/30" />
                <div className="space-y-4 font-mono">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground/50 font-sans">Monospace - Geist Mono</span>
                  <p className="text-3xl font-medium">function optimize(system) {`{ ... }`}</p>
                  <p className="text-lg text-foreground/70">0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection id="colors">
              <SectionHeader 
                title="Design Tokens: Colors" 
                description="A high-contrast palette rooted in deep slates and indigo accents. Designed for optimal accessibility and dark mode performance."
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-spacing-md">
                <ColorSwatch label="Primary" variable="var(--primary)" />
                <ColorSwatch label="Secondary" variable="var(--secondary)" />
                <ColorSwatch label="Accent" variable="var(--accent)" />
                <ColorSwatch label="Muted" variable="var(--muted)" />
                <ColorSwatch label="Background" variable="var(--background)" border />
                <ColorSwatch label="Foreground" variable="var(--foreground)" />
                <ColorSwatch label="Success" variable="var(--success)" />
                <ColorSwatch label="Destructive" variable="var(--destructive)" />
              </div>
            </FadeInSection>

            <FadeInSection id="spacing">
              <SectionHeader 
                title="Design Tokens: Spacing" 
                description="An 8px-based spacing system ensuring consistent rhythm and structural hierarchy throughout the interface."
              />
              <div className="space-y-8 p-12 border border-border/50 rounded-xl bg-secondary/10">
                <SpacingRow label="XS" value="4px" variable="var(--spacing-xs)" />
                <SpacingRow label="SM" value="8px" variable="var(--spacing-sm)" />
                <SpacingRow label="MD" value="16px" variable="var(--spacing-md)" />
                <SpacingRow label="LG" value="24px" variable="var(--spacing-lg)" />
                <SpacingRow label="XL" value="32px" variable="var(--spacing-xl)" />
              </div>
            </FadeInSection>

            <FadeInSection id="buttons">
              <SectionHeader 
                title="Components: Buttons" 
                description="Interactive triggers used for actions. Featuring distinct visual weights and clear states."
              />
              <ComponentCanvas>
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive</Button>
              </ComponentCanvas>
            </FadeInSection>

            <FadeInSection id="badges">
              <SectionHeader 
                title="Components: Badges" 
                description="Visual indicators for status, categories, and technical tags."
              />
              <ComponentCanvas>
                <Badge variant="primary">Next.js</Badge>
                <Badge variant="secondary">API</Badge>
                <Badge variant="outline">v1.2.0</Badge>
                <Badge variant="success">Active</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="destructive">Critical</Badge>
              </ComponentCanvas>
            </FadeInSection>

            <FadeInSection id="cards">
              <SectionHeader 
                title="Components: Cards" 
                description="Content containers used for grouping related information, such as projects or experience entries."
              />
              <div className="grid md:grid-cols-2 gap-spacing-md">
                <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Standard Card</CardTitle>
                    <CardDescription>A clean, versatile container.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Standard spacing and typography applied automatically.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Action</Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-primary/5 border-primary/20 shadow-none">
                  <CardHeader>
                    <CardTitle>Subtle Accent Card</CardTitle>
                    <CardDescription>Highlighted content style.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Badge variant="primary">Featured</Badge>
                      <Badge variant="outline">Backend</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeInSection>
          </main>
        </div>
      </div>
    </div>
  );
}

function ColorSwatch({ label, variable, border = false }: { label: string; variable: string; border?: boolean }) {
  return (
    <div className="space-y-spacing-xs group">
      <div 
        className={`h-24 w-full rounded-radius-lg shadow-sm group-hover:shadow-md transition-all duration-300 ${border ? 'border border-border/60' : ''}`}
        style={{ backgroundColor: variable }}
      />
      <div className="px-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground font-mono truncate">{variable}</p>
      </div>
    </div>
  );
}

function SpacingRow({ label, value, variable }: { label: string; value: string; variable: string }) {
  return (
    <div className="flex items-center gap-spacing-md">
      <div className="w-12 text-xs font-bold text-muted-foreground">{label}</div>
      <div className="flex-1 flex items-center gap-spacing-md">
        <div 
          className="bg-primary/20 border-x border-primary/40 h-8 rounded-sm"
          style={{ width: variable }}
        />
        <div className="text-[10px] text-muted-foreground font-mono">{value} ({variable})</div>
      </div>
    </div>
  );
}
