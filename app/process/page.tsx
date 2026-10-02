"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import { useModal } from "@/lib/modal-context";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export default function ProcessPage() {
  const { setIsContactModalOpen } = useModal();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Discovery & strategic alignment",
      description: "Every product begins by understanding the foundational intent. I work closely with stakeholders to map out user psychology, business objectives, and define measurable outcomes before any pixels are drawn.",
      deliverables: "User journeys, information architecture, requirements definition."
    },
    {
      number: "02",
      title: "Systems architecture & wireframing",
      description: "Structure precedes polish. I establish low-to-high fidelity wireframes and modular UI design systems, ensuring scalability, visual coherence, and robust component architecture from tokens to layouts.",
      deliverables: "Design tokens, modular component libraries, wireframes."
    },
    {
      number: "03",
      title: "Visual craft & micro-interactions",
      description: "Precision in grid structures, typography hierarchy, and deliberate motion. I refine every detail so the interface feels intuitive, effortless, and respectful of user focus.",
      deliverables: "High-fidelity mockups, prototypes, interaction specifications."
    },
    {
      number: "04",
      title: "Engineering execution & QA",
      description: "With a strong background in frontend development, I bridge the gap between design and production. I build performant, accessible interfaces in React and Tailwind CSS with zero translation loss.",
      deliverables: "Production-ready code, accessibility compliance, quality assurance."
    }
  ];

  const principles = [
    {
      title: "Clarity over complexity",
      description: "Removing cognitive friction so users achieve their goals instantly without guesswork."
    },
    {
      title: "Scalability by design",
      description: "Building modular systems that adapt seamlessly as products and teams grow."
    },
    {
      title: "Performance minded",
      description: "Ensuring visual fidelity never compromises speed, responsiveness, or accessibility."
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 md:px-16 py-5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
            </button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsContactModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            Let&apos;s Talk
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-24 px-6 sm:px-12 md:px-16 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-24 md:mb-32"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 dark:bg-zinc-100 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900 dark:bg-zinc-100"></span>
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              Methodology
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-8">
            How I bridge <span className="italic">human intent</span> with digital logic.
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
            An end-to-end framework combining rigorous product thinking, modular design systems, and precise frontend execution.
          </p>
        </motion.div>

        {/* Steps List */}
        <div className="space-y-16 md:space-y-24 mb-28">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12 border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="md:col-span-4">
                <span className="text-sm font-mono text-zinc-400 dark:text-zinc-600 block mb-2">
                  STAGE {step.number}
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h2>
              </div>

              <div className="md:col-span-8 space-y-4">
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  {step.description}
                </p>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-2">
                  Outputs: {step.deliverables}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-28 pt-16 border-t border-zinc-200 dark:border-zinc-800"
        >
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-12">Core principles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((p, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{p.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Have a project in mind?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-light max-w-xl mx-auto mb-8 text-base">
            Let&apos;s combine rigorous design thinking and technical execution to bring your vision to life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsContactModalOpen(true)}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium shadow-sm hover:shadow-xl transition-all bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 cursor-pointer text-sm"
            >
              Let&apos;s Talk
              <ArrowUpRight weight="bold" className="transition-transform group-hover:translate-x-1" />
            </motion.button>

            <Link
              href="/"
              className="px-8 py-4 rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all text-sm font-medium"
            >
              Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 px-6 sm:px-12 md:px-16 text-center text-xs text-zinc-500 font-mono">
        YAHYA ADITYA SAPUTRA © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
