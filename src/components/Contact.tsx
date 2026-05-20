"use client";

import { IconMail, IconGithub, IconLinkedin, IconTerminal } from "./Icons";

const socialLinks = [
  { href: "#", icon: <IconGithub className="w-6 h-6" />, label: "GitHub" },
  { href: "#", icon: <IconLinkedin className="w-6 h-6" />, label: "LinkedIn" },
  { href: "mailto:jirayut.laorpongphruek@gmail.com", icon: <IconMail className="w-6 h-6" />, label: "Email" },
];

const Contact = () => {
  return (
    <footer id="contact" className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <IconTerminal className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-foreground">Dev.Backend</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground">
              Let&apos;s build something <br />
              <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">reliable together.</span>
            </h2>
            <p className="text-lg text-foreground/60 mb-8 max-w-md">
              Available for freelance opportunities and full-time architectural roles. 
              Let&apos;s discuss how I can help your team scale.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all text-foreground"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-secondary/50 rounded-3xl p-8 md:p-12 border border-border">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2 uppercase tracking-wider text-foreground/50">Full Name</label>
                <input 
                  id="name"
                  type="text" 
                  className="w-full bg-background border border-border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2 uppercase tracking-wider text-foreground/50">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  className="w-full bg-background border border-border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-2 uppercase tracking-wider text-foreground/50">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-background border border-border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                  placeholder="Describe your project..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-accent transition-all shadow-lg shadow-primary/20">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-foreground/40 gap-4">
          <p>© 2026 Tum Jirayut. Built with Next.js & Tailwind CSS.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
