"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, EnvelopeSimple, Sparkle } from "@phosphor-icons/react";
import { useModal } from "@/lib/modal-context";
import { motion } from "motion/react";

export default function ProcessPage() {
  const { setIsContactModalOpen } = useModal();
  const totalSlides = 6;

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] w-full overflow-x-hidden flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-white">
      {/* Header - Fixed to top, safe area included in px/pt */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 md:px-16 py-6 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-full shadow-sm pointer-events-auto"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </header>

      {/* Main content - Normal flow */}
      <main className="flex-1 flex flex-col">
        {[
          {
            title: "Design isn't just visual—it's how human intent connects with digital logic.",
            badge: "Methodology & Process",
            description: "Scroll to explore my methodology and how I bridge aesthetic precision with engineering reality.",
            bg: ""
          },
          {
            title: "Deconstructing Complexity",
            badge: "01. SYSTEMS THINKING",
            description: "Every great digital product begins with a robust foundation. I design comprehensive, modular UI Design Systems that ensure visual coherence, scalable architecture, and seamless consistency from the most fundamental tokens to complex layouts.",
            bg: "bg-zinc-50/50 dark:bg-zinc-950/80"
          },
          {
            title: "Obsession Over Detail",
            badge: "02. CRAFTSMANSHIP",
            description: "Precision in grid structures, meticulous spacing rules, and deliberate micro-interactions. I believe true luxury in digital design lies in the invisible details—how a transition feels, how typography breathes, and how the interface respects user focus.",
            bg: ""
          },
          {
            title: "Bridging Code & Pixel",
            badge: "03. DEVELOPER-READY",
            description: "With a deep background in Software Engineering, I don't just design in isolation. Every component I build is optimized for developer handoff, conscious of frontend constraints, state management, and component reusability in React/Tailwind ecosystems.",
            bg: "bg-zinc-50/50 dark:bg-zinc-950/80"
          },
          {
            title: "The Iteration Loop",
            badge: "04. REFINEMENT",
            description: "Design is never truly finished. Through rigorous prototyping, user testing, and data feedback loops, I continuously refine experiences to eliminate friction and elevate user delight.",
            bg: ""
          }
        ].map((slide, idx) => (
          <motion.section
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
            variants={sectionVariants}
            style={{ WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
            className={`min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 py-24 ${slide.bg}`}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm w-fit mb-6">
              <Sparkle size={12} weight="fill" />
              {slide.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-6 max-w-4xl">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light max-w-2xl">
              {slide.description}
            </p>
          </motion.section>
        ))}

        {/* Final CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
          variants={sectionVariants}
          style={{ WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
          className="min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 py-24 bg-zinc-50/50 dark:bg-zinc-950/80 text-center pb-[calc(2rem+env(safe-area-inset-bottom))]"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm mb-6">
            <Sparkle size={12} weight="fill" />
            05. COLLABORATION
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-8 leading-tight max-w-4xl">
            Ready to build something impactful?
          </h2>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light mb-10 max-w-xl">
            Let's combine rigorous design thinking and technical execution to bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="group flex items-center gap-2 bg-black text-white dark:bg-white dark:text-zinc-950 px-8 py-4 rounded-full font-medium text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <EnvelopeSimple size={20} weight="bold" />
              Let's Talk
              <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              href="/"
              className="px-8 py-4 rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-all font-medium text-base"
            >
              Back to Portfolio
            </Link>
          </div>
          
          <div className="mt-12 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            YAHYA ADITYA © {new Date().getFullYear()}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
