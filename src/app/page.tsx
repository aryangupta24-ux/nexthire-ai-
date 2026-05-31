"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Target, Zap, ArrowRight, Bot, CheckCircle2, MessageSquare, Star, Mail, Phone, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full blur-[120px] -z-10 animate-pulse duration-[10000ms]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[150px] -z-10" />

      {/* Navbar */}
      <header className="px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between glass z-50 sticky top-0 transition-all">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary w-6 h-6" />
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">NextHire AI</span>
          </div>
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-6 md:gap-8 text-sm font-medium text-muted-foreground w-full md:w-auto mt-4 md:mt-0 pb-4 md:pb-0`}>
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">How it works</Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="/coach" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1 hover:text-primary transition-colors text-emerald-400">
            <Bot className="w-4 h-4" /> AI Coach
          </Link>
          <Link 
            href="/builder"
            className="bg-primary hover:bg-primary/80 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] px-5 py-2 rounded-lg font-medium transition-all hover:scale-105 w-full md:w-auto text-center mt-2 md:mt-0"
          >
            Build Resume
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-sm text-primary mb-8 border-primary/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-medium tracking-wide uppercase text-xs">Next-Gen Resume Builder</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-tight text-white drop-shadow-lg px-2"
        >
          Land your dream job with an <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">ATS-Optimized</span> resume.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-10 font-light px-4"
        >
          NextHire AI uses advanced artificial intelligence to generate professional resume content, analyze ATS compatibility, and export a pristine PDF in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4"
        >
          <Link 
            href="/builder"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-500 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)] w-full sm:w-auto"
          >
            Create My Resume <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/coach"
            className="flex items-center justify-center gap-2 glass hover:bg-white/5 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105 w-full sm:w-auto"
          >
            <Bot className="w-5 h-5 text-emerald-400" /> Try AI Interview Coach
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <div id="features" className="mt-24 sm:mt-32 grid md:grid-cols-3 gap-6 max-w-6xl w-full text-left scroll-mt-24 px-4 sm:px-0">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-emerald-400" />}
            title="AI Content Enhancement"
            description="Our AI optimizes your experience and projects into professional, high-impact bullet points instantly."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Target className="w-6 h-6 text-teal-400" />}
            title="ATS Score Analyzer"
            description="Get real-time feedback on missing keywords, formatting issues, and readability to beat the bots."
            delay={0.5}
          />
          <FeatureCard 
            icon={<FileText className="w-6 h-6 text-emerald-300" />}
            title="Native PDF Export"
            description="Download a perfectly formatted, selectable text PDF that is 100% compatible with all ATS systems."
            delay={0.6}
          />
        </div>

        {/* How it works Section */}
        <div id="how-it-works" className="mt-24 sm:mt-32 w-full max-w-5xl scroll-mt-24 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Build your professional resume in three simple steps using the power of AI.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -z-10" />
            
            <StepCard number="01" title="Input Your Data" desc="Paste your basic information, education, and rough experience notes." delay={0.1} />
            <StepCard number="02" title="AI Optimization" desc="Our AI rewrites your points to sound professional and highlights key achievements." delay={0.2} />
            <StepCard number="03" title="Export & Apply" desc="Check your ATS score and export a clean PDF ready for applications." delay={0.3} />
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials" className="mt-24 sm:mt-32 w-full max-w-6xl scroll-mt-24 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">See how NextHire AI has helped candidates land their dream roles.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <TestimonialCard 
              quote="The AI transformed my messy bullet points into a highly professional resume. I got 3 interviews in the first week!"
              author="Sarah Jenkins"
              role="Software Engineer @ TechCorp"
            />
            <TestimonialCard 
              quote="The ATS checker is a game changer. It told me exactly what keywords I was missing. Landed a Senior role."
              author="Michael Chen"
              role="Product Manager"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mt-24 sm:mt-32 w-full max-w-5xl mb-16 sm:mb-24 scroll-mt-24 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Start building your resume for free. Upgrade for unlimited AI power.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-4xl font-bold mb-6">$0<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> 1 Resume PDF Export</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> Basic ATS Checker</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> 5 AI Enhancements</li>
              </ul>
              <Link href="/builder" className="w-full py-3 text-center rounded-xl glass hover:bg-white/10 transition-colors font-medium">Get Started</Link>
            </div>
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-primary/50 relative flex flex-col shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <div className="absolute top-0 right-6 sm:right-8 -translate-y-1/2 bg-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2 text-primary">Pro</h3>
              <p className="text-4xl font-bold mb-6">$9<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> Unlimited PDF Exports</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> Advanced ATS Analytics</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> Unlimited AI Enhancements</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-primary" /> AI Interview Coach Access</li>
              </ul>
              <Link href="/builder" className="w-full py-3 text-center rounded-xl bg-primary hover:bg-primary/90 text-white transition-colors font-medium shadow-[0_0_15px_rgba(16,185,129,0.4)]">Upgrade to Pro</Link>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-16 sm:mt-24 w-full max-w-4xl mb-16 sm:mb-24 scroll-mt-24 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Contact Me</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Have questions or want to collaborate? Feel free to reach out!</p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <motion.a 
              href="mailto:aryan102030gupta@gmail.com"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 flex items-center gap-4 hover:border-primary/50 hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-xs sm:text-sm text-slate-400 font-medium">Email</p>
                <p className="text-sm sm:text-lg font-bold text-white group-hover:text-primary transition-colors truncate">aryan102030gupta@gmail.com</p>
              </div>
            </motion.a>
            
            <motion.a 
              href="tel:7000300729"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 flex items-center gap-4 hover:border-primary/50 hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm text-slate-400 font-medium">Phone</p>
                <p className="text-sm sm:text-lg font-bold text-white group-hover:text-primary transition-colors">7000300729</p>
              </div>
            </motion.a>
          </div>
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
      className="glass-panel p-6 sm:p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 border border-white/5 group"
    >
      <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StepCard({ number, title, desc, delay }: { number: string, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center relative z-10"
    >
      <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-2xl font-bold text-primary mb-6 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
        {number}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-sm sm:text-base text-slate-400">{desc}</p>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative"
    >
      <MessageSquare className="w-10 h-10 text-primary/20 absolute top-6 right-6 hidden sm:block" />
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
      </div>
      <p className="text-base sm:text-lg italic text-slate-300 mb-6 relative z-10">"{quote}"</p>
      <div>
        <h4 className="font-bold text-white">{author}</h4>
        <p className="text-xs sm:text-sm text-primary">{role}</p>
      </div>
    </motion.div>
  );
}
