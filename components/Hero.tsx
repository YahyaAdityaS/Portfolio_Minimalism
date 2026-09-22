"use client";

import { motion } from "motion/react";
import { ArrowUpRight, GithubLogo, TwitterLogo, LinkedinLogo } from "@phosphor-icons/react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 dark:bg-zinc-100 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900 dark:bg-zinc-100"></span>
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Available for projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 pb-1"
            >
              Yahya Aditya. <br />
              <span className="text-zinc-400">Designs digital products</span> with emphasis on <span className="italic">human</span> connection.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <button className="group relative flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-4 rounded-full font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                Let&apos;s Talk
                <ArrowUpRight weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              
              <div className="flex items-center gap-4">
                <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <GithubLogo size={24} />
                </a>
                <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <TwitterLogo size={24} />
                </a>
                <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <LinkedinLogo size={24} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="group relative mx-auto w-full max-w-[320px] sm:max-w-[360px] md:w-[40%] shrink-0"
          >
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden">
              {/* macOS Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Yahya Aditya</p>
                  <div className="flex items-center justify-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 dark:bg-zinc-100 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-900 dark:bg-zinc-100"></span>
                    </span>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">Available</p>
                  </div>
                </div>
                <div className="w-10" /> {/* Spacer for centering */}
              </div>

              {/* Photo */}
              <div className="relative aspect-square overflow-hidden">
                <Image 
                  src="/yahyadityas.webp" 
                  alt="Profile"
                  fill
                  className="object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                  priority
                />
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">@yahyaditya.s</p>
                <p className="text-[10px] text-zinc-500">Product Designer & Developer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
