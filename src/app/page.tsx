"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Target, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      {/* Navbar */}
      <header className="px-6 py-4 flex items-center justify-between glass z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary w-6 h-6" />
          <span className="font-bold text-xl tracking-tight">NextHire AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
        </nav>
        <Link 
          href="/builder"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Build Resume
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-sm text-primary mb-8 border-primary/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Resume Builder</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-tight"
        >
          Land your dream job with an <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">ATS-optimized</span> resume.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          NextHire AI uses artificial intelligence to generate professional resume content, analyze ATS compatibility, and export a clean PDF in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href="/builder"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105 shadow-lg shadow-primary/25"
          >
            Create My Resume <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <div id="features" className="mt-32 grid md:grid-cols-3 gap-6 max-w-5xl w-full text-left">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="AI Content Enhancement"
            description="Our AI optimizes your experience and projects into professional, impactful bullet points."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Target className="w-6 h-6 text-indigo-400" />}
            title="ATS Score Analyzer"
            description="Get instant feedback on missing keywords, formatting issues, and overall readability."
            delay={0.5}
          />
          <FeatureCard 
            icon={<FileText className="w-6 h-6 text-purple-400" />}
            title="One-Click PDF Export"
            description="Download a clean, ATS-friendly PDF instantly without any complex formatting steps."
            delay={0.6}
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition-transform border border-white/5"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
