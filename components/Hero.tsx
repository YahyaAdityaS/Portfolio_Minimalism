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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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
              Alex Rivera. <br />
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
            className="relative aspect-square w-full md:w-1/2 max-w-[320px] lg:max-w-[360px] shrink-0 grayscale"
          >
            <div className="absolute inset-0 border border-zinc-200 dark:border-zinc-800 rounded-3xl translate-x-4 translate-y-4 -z-10" />
            <div className="w-full h-full overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
               {/* Using Picsum for a monochromatic profile-like shot */}
               <Image 
                src="https://picsum.photos/seed/alex-profile/800/800?grayscale" 
                alt="Profile"
                fill
                className="object-cover"
                priority
               />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
