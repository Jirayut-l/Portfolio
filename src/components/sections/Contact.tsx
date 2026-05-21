import { 
  IconMail, 
  IconGithub, 
  IconLinkedin, 
  IconTerminal 
} from "@/components/ui/Icons";
import ContactConsole from "@/components/sections/ContactConsole";

const socialLinks = [
  { href: "https://github.com", icon: <IconGithub className="w-5 h-5" />, label: "GitHub" },
  { href: "https://linkedin.com", icon: <IconLinkedin className="w-5 h-5" />, label: "LinkedIn" },
  { href: "mailto:jirayut.laorpongphruek@gmail.com", icon: <IconMail className="w-5 h-5" />, label: "Email" },
];

const Contact = () => {
  return (
    <footer id="contact" className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Top visual context */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-2 mb-6">
              <IconTerminal className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-foreground">Dev.Backend</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground leading-tight">
              Let&apos;s build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">reliable together.</span>
            </h2>
            
            <p className="text-lg text-foreground/60 mb-8 max-w-md">
              Available for freelance engagements, system optimizations, and full-time architecture roles. 
              Let&apos;s talk API design, database schemas, and caching layers.
            </p>
            
            <div className="flex space-x-5">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-foreground"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <ContactConsole />
        </div>
        
        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-foreground/40 gap-4">
          {/* Footer info */}
          <p>© 2026 Tum Jirayut. Built with Next.js & Tailwind CSS.</p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a 
              href="/cv/jirayut.l Resume 2024.pdf" 
              download
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <span>Download CV Resume</span>
            </a>
            
            <span className="hidden sm:inline text-foreground/20">|</span>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
