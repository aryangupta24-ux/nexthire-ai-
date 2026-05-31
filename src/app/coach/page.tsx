"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Send, User, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { chatWithCoach } from "@/app/actions";

export default function CoachPage() {
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
    { role: 'model', content: "Hi! I'm your NextHire AI Coach. I can help you tailor your resume, prepare for interviews, or answer any career-related questions. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    
    // Add user message to state
    const newMessages: {role: 'user' | 'model', content: string}[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Exclude the first welcome message if it's not needed for context, but it's fine to pass
      const historyToPass = newMessages.slice(1, -1);
      
      const responseText = await chatWithCoach(userMsg, historyToPass);
      
      setMessages([...newMessages, { role: 'model', content: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#020603] text-white">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(2,6,3,0))] -z-10" />

      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between glass z-10 shrink-0 border-b border-white/10 sticky top-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </Link>
          <div className="flex items-center gap-2">
            <Bot className="text-emerald-400 w-6 h-6" />
            <span className="font-bold text-lg sm:text-xl tracking-tight">AI Coach</span>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 sm:p-6 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-1 sm:pr-2 pb-4">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 sm:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border ${msg.role === 'user' ? 'bg-teal-600 border-teal-400' : 'bg-emerald-950 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />}
                </div>
                <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 sm:px-5 sm:py-3 text-sm sm:text-base ${msg.role === 'user' ? 'bg-teal-600 text-white rounded-tr-sm' : 'glass-panel border-emerald-500/20 text-slate-200 rounded-tl-sm'}`}>
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0 whitespace-pre-wrap">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 sm:gap-4"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border bg-emerald-950 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div className="glass-panel border-emerald-500/20 rounded-2xl rounded-tl-sm px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span className="text-xs sm:text-sm text-emerald-400/80 animate-pulse">Coach is thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-4 shrink-0 glass p-2 rounded-2xl border-white/10 shadow-xl flex items-center gap-2 relative">
          <div className="absolute -top-3 left-4 px-2 bg-[#020603] border border-emerald-500/30 rounded-full">
            <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Powered by Gemini</span>
          </div>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') handleSend(); }}
            placeholder="Ask for tips or advice..."
            className="flex-1 bg-transparent border-none outline-none px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-slate-500 focus:ring-0"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary hover:bg-primary/90 text-[#020603] flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 sm:ml-1" />
          </button>
        </div>
      </main>
    </div>
  );
}
