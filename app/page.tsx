"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Figma,
  Palette,
  Code2,
  ShoppingBag,
  Layout,
  Sparkles,
  ChevronDown,
  ArrowUp,
  Download,
  Send,
  User,
  Briefcase,
  Globe,
  Cpu,
  Menu,
  X,
} from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackground";

// Typing animation hook
function useTyping(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
}

// Typewriter animation component
function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);
    
    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [text]);
  
  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.05 }}
        className="inline-block w-[3px] h-[1em] bg-white ml-[2px] align-middle"
      />
    </span>
  );
}

// Testimonials data
const testimonials = [
  {
    name: "Team Lead",
    role: "Gecko Works Nepal",
    content: "Exceptional UI/UX skills in Figma. Delivered high-quality designs consistently during the internship.",
    rating: 5,
  },
  {
    name: "Project Supervisor",
    role: "University",
    content: "The Online Shoes Store project demonstrated impressive full-stack capabilities and attention to detail.",
    rating: 5,
  },
  {
    name: "Design Mentor",
    role: "Canva Expert",
    content: "Quick learner with excellent eye for design. Created stunning marketing materials for our campaigns.",
    rating: 5,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
};

// Single scrolling dot component for timeline with lightsaber effect
function TimelineDot({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <>
      {/* Glowing lightsaber line */}
      <motion.div
        className="absolute left-0 md:left-1/2 top-0 w-3 md:-translate-x-1/2 z-0"
        style={{ 
          height: glowHeight,
          background: "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(139, 92, 246, 1) 10%, rgba(236, 72, 153, 1) 50%, rgba(139, 92, 246, 1) 90%, rgba(255, 255, 255, 1) 100%)",
          boxShadow: "0 0 50px rgba(139, 92, 246, 1), 0 0 100px rgba(139, 92, 246, 0.98), 0 0 150px rgba(236, 72, 153, 0.95), 0 0 200px rgba(139, 92, 246, 0.9), 0 0 250px rgba(236, 72, 153, 0.8), 0 0 300px rgba(139, 92, 246, 0.6)",
        }}
      />
      {/* The dot */}
      <motion.div
        className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-white z-10 md:-translate-x-1/2 border-2 border-primary"
        style={{ 
          top,
          boxShadow: "0 0 50px rgba(139, 92, 246, 1), 0 0 100px rgba(139, 92, 246, 1), 0 0 150px rgba(236, 72, 153, 1), 0 0 200px rgba(139, 92, 246, 0.95), 0 0 250px rgba(236, 72, 153, 0.9), inset 0 0 30px rgba(139, 92, 246, 0.9)"
        }}
      />
    </>
  );
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuLoading, setMobileMenuLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const timelineRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Page loading effect - 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleResumeDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Resume download started!", {
      description: "Your resume is being downloaded.",
    });
  };

  // Handle mobile menu open with loading animation
  const handleMobileMenuToggle = () => {
    if (!mobileMenuOpen) {
      setMobileMenuLoading(true);
      setMobileMenuOpen(true);
      // Simulate loading for 800ms then show content
      setTimeout(() => {
        setMobileMenuLoading(false);
      }, 800);
    } else {
      setMobileMenuOpen(false);
      setMobileMenuLoading(false);
    }
  };

  return (
    <>
      {/* Page Loading Screen - 3 seconds */}
      <AnimatePresence>
        {pageLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            {/* Glowing orb animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.2, 1],
                opacity: 1,
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Outer glow rings */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-40 h-40 rounded-full border-2 border-primary/30"
                style={{
                  boxShadow: "0 0 60px rgba(139, 92, 246, 0.5), 0 0 120px rgba(236, 72, 153, 0.3), inset 0 0 60px rgba(139, 92, 246, 0.2)"
                }}
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 0.9, 1],
                }}
                transition={{ 
                  rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-4 rounded-full border-2 border-accent/40"
                style={{
                  boxShadow: "0 0 40px rgba(236, 72, 153, 0.4), inset 0 0 40px rgba(236, 72, 153, 0.2)"
                }}
              />
              {/* Center core */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div 
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent"
                  style={{
                    boxShadow: "0 0 50px rgba(139, 92, 246, 0.8), 0 0 100px rgba(236, 72, 153, 0.6), 0 0 150px rgba(139, 92, 246, 0.4)"
                  }}
                />
              </motion.div>
            </motion.div>
            
            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12 text-center"
            >
              <h2 className="text-2xl font-bold gradient-text mb-2">Loading Experience</h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                style={{ width: 200 }}
              />
            </motion.div>
            
            {/* Loading percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-sm text-muted-foreground font-mono"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, times: [0, 0.3, 0.6, 1] }}
              >
                Initializing...
              </motion.span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <main key={pageLoading ? 'loading' : 'loaded'} className={`min-h-screen bg-[#0a0a0a] overflow-x-hidden relative ${pageLoading ? 'overflow-hidden' : ''}`}>
      <AnimatedBackground />

      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-[100] origin-left" style={{ scaleX: scrollYProgress }} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold gradient-text"
          >
            <a href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
              <img src="logo.png" alt="Logo" className="w-40 h-12" />
            </a>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-6 text-sm text-muted-foreground"
          >
            {["About", "Experience", "Projects", "Skills", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-primary transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </motion.div>
          
          {/* Mobile Hamburger Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-border"
            >
              {mobileMenuLoading ? (
                // Loading Animation
                <div className="px-6 py-8 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                  />
                  <p className="text-sm text-muted-foreground mt-4">Loading menu...</p>
                </div>
              ) : (
                // Menu Content
                <div className="px-6 py-4 flex flex-col gap-4">
                  {["About", "Experience", "Projects", "Skills", "Contact"].map(
                    (item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                      >
                        {item}
                      </a>
                    )
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center max-w-5xl mx-auto"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="mb-8"
          >
            <div className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 mx-auto rounded-full p-1 bg-gradient-to-r from-purple-500 to-pink-500 glow">
              <div className="w-full h-full rounded-full bg-[#141414] flex items-center justify-center overflow-hidden">
                <img 
                  src="shreejal.jpeg" 
                  alt="Shreejal Sthapit" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white min-h-[1.2em]"
          >
            <TypewriterText text="Creative UI/UX Designer - Shreejal Sthapit" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Crafting beautiful digital experiences with Figma expertise and modern web technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 cursor-pointer group relative overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Get in Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-4 glass rounded-full font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 cursor-pointer group relative overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              <Briefcase className="w-4 h-4 group-hover:text-primary transition-colors" />
              View Projects
            </a>
            <button
              onClick={handleResumeDownload}
              className="px-8 py-4 glass rounded-full font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 cursor-pointer group relative overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              <Download className="w-4 h-4 group-hover:text-primary transition-colors" />
              Resume
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex justify-center gap-6 mt-12"
          >
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.7 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm">About Me</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Passionate about creating{" "}
                <span className="gradient-text">impactful designs</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I am a creative designer and developer with a strong foundation
                in UI/UX design. My journey began with
                a 3-month internship at Gecko Works Nepal, where I honed my
                skills in Figma and Canva while working on real-world projects.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                During my bachelor&apos;s, I developed a comprehensive Online
                Shoes Store as my major project, showcasing my ability to build
                complete full-stack applications from design to deployment.
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Based in Nepal</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>Open to work</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Remote friendly</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "3+", label: "Months Experience" },
                { value: "10+", label: "Projects Completed" },
                { value: "UI/UX", label: "Specialization" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 glass rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
                  style={{
                    transition: "all 0.3s ease, box-shadow 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Layout className="w-4 h-4 text-primary" />
                <span className="text-sm">Experience & Education</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Work <span className="gradient-text">Experience</span>
              </h2>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative pl-8 md:pl-0" id="experience-timeline" ref={timelineRef}>
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
                
                {/* Single scrolling dot */}
                <TimelineDot containerRef={timelineRef} />

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 80 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                    },
                  }}
                  className="relative mb-12 md:grid md:grid-cols-2 md:gap-8"
                >
                  <div className="hidden md:block" />
                  <div className="relative pl-8 md:pl-8">
                    <div
                      className="glass p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "";
                        e.currentTarget.style.borderColor = "";
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <Figma className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">UI/UX Design Intern</h3>
                          <p className="text-sm text-muted-foreground">
                            Gecko Works Nepal
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        3 Months Internship
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Designed user interfaces using Figma for various client
                          projects
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Created marketing materials and graphics using Canva
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Collaborated with the design team on UX research and
                          wireframing
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Developed design systems and component libraries
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Education - S.E.E */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -80 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                    },
                  }}
                  className="relative mb-12 md:grid md:grid-cols-2 md:gap-8"
                >
                  <div className="relative pr-8 md:text-right md:pr-8">
                    <div
                      className="glass p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "";
                        e.currentTarget.style.borderColor = "";
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-center gap-3 mb-4 md:flex-row-reverse">
                        <div className="p-2 bg-accent/20 rounded-lg">
                          <span className="text-xl">🎓</span>
                        </div>
                        <div className="md:text-right">
                          <h3 className="font-semibold">Secondary Education (S.E.E)</h3>
                          <p className="text-sm text-muted-foreground">
                            Zenith English Secondary School
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Completed 2075 (2018)
                      </p>
                      <p className="text-sm font-medium text-primary">
                        GPA: 3.25
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </motion.div>

                {/* Education - +2 */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 80 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                    },
                  }}
                  className="relative mb-12 md:grid md:grid-cols-2 md:gap-8"
                >
                  <div className="hidden md:block" />
                  <div className="relative pl-8 md:pl-8">
                    <div
                      className="glass p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "";
                        e.currentTarget.style.borderColor = "";
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <span className="text-xl">📚</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">Higher Secondary (+2)</h3>
                          <p className="text-sm text-muted-foreground">
                            NCCS College
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Completed 2078 (2021)
                      </p>
                      <p className="text-sm font-medium text-primary">
                        GPA: 2.8
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Education - Bachelor */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -80 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                    },
                  }}
                  className="relative mb-12 md:grid md:grid-cols-2 md:gap-8"
                >
                  <div className="relative pr-8 md:text-right md:pr-8">
                    <div
                      className="glass p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "";
                        e.currentTarget.style.borderColor = "";
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-center gap-3 mb-4 md:flex-row-reverse">
                        <div className="p-2 bg-accent/20 rounded-lg">
                          <span className="text-xl">🎓</span>
                        </div>
                        <div className="md:text-right">
                          <h3 className="font-semibold">Bachelor&apos;s Degree</h3>
                          <p className="text-sm text-muted-foreground">
                            NCCS College
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Completed
                      </p>
                      <p className="text-sm font-medium text-primary">
                        GPA: Better Performance
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-sm">Projects</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Featured <span className="gradient-text">Projects</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Project 1 - Online Shoes Store */}
                <a
                  href="https://your-shoes-store-demo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl overflow-hidden glow-subtle hover:glow transition-all duration-300 hover:scale-[1.02] cursor-pointer group block"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">Online Shoes Store</h3>
                        <p className="text-xs text-muted-foreground">Bachelor&apos;s Project</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      Full-stack e-commerce application for footwear with user auth, shopping cart, and admin dashboard.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["React", "Node.js", "MongoDB"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <ExternalLink className="w-4 h-4" />
                      <span>View Project</span>
                    </div>
                  </div>
                </a>

                {/* Project 2 - Portfolio Website */}
                <a
                  href="https://your-portfolio-demo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl overflow-hidden glow-subtle hover:glow transition-all duration-300 hover:scale-[1.02] cursor-pointer group block"
                >
                  <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 opacity-60 group-hover:opacity-70 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Globe className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">Portfolio Website</h3>
                        <p className="text-xs text-muted-foreground">Personal Project</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      Modern animated portfolio with Next.js, featuring smooth scroll animations and dark theme.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Next.js", "TypeScript", "Framer Motion"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                      <ExternalLink className="w-4 h-4" />
                      <span>View Project</span>
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Palette className="w-4 h-4 text-primary" />
                <span className="text-sm">Skills</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Skills & <span className="gradient-text">Expertise</span>
              </h2>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {/* Design Skills */}
              <div
                className="glass p-8 rounded-2xl glow-subtle transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-3 bg-primary/20 rounded-xl w-fit mb-6">
                  <Figma className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">UI/UX Design</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Expert-level proficiency in Figma with hands-on experience
                  creating user interfaces, prototypes, and design systems.
                </p>
                <div className="space-y-3">
                  {[
                    { name: "Figma", level: 95 },
                    { name: "Canva", level: 90 },
                    { name: "Prototyping", level: 85 },
                    { name: "Design Systems", level: 80 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Web Development Skills */}
              <div
                className="glass p-8 rounded-2xl glow-subtle transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-3 bg-primary/20 rounded-xl w-fit mb-6">
                  <Code2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Web Development</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Building responsive websites with core web technologies and
                  modern best practices.
                </p>
                <div className="space-y-3">
                  {[
                    { name: "HTML", level: 95 },
                    { name: "CSS", level: 90 },
                    { name: "JavaScript", level: 85 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">Get in Touch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let&apos;s Work <span className="gradient-text">Together</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have a project in mind? Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div variants={fadeInUp}>
                <form onSubmit={handleFormSubmit} className="glass p-8 rounded-2xl">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-secondary rounded-lg border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                        placeholder="Tell me about your project..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:glow transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={fadeInUp} className="flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">your.email@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">Nepal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Availability</h3>
                      <p className="text-muted-foreground">Open to freelance & full-time opportunities</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Services</h3>
                      <p className="text-muted-foreground">UI/UX Design, Web Development, Prototyping</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Or connect with me on social media</p>
                  <div className="flex gap-4">
                    {[Github, Linkedin, Figma].map((Icon, index) => (
                      <a
                        key={index}
                        href="#"
                        className="p-3 glass rounded-full transition-all duration-300 hover:scale-110 cursor-pointer group relative overflow-hidden"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(236, 72, 153, 0.3), inset 0 0 15px rgba(139, 92, 246, 0.1)";
                          e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = "";
                          e.currentTarget.style.borderColor = "";
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icon className="w-5 h-5 relative z-10 group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Portfolio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed with <span className="text-primary">Figma</span> & Built with <span className="text-primary">Next.js</span>
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:glow transition-all z-50"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
    </>
  );
}

