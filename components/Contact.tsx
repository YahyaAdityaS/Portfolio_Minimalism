"use client";

import { useModal } from "@/lib/modal-context";
import { motion } from "motion/react";
import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react";

export function Contact() {
  const { setIsContactModalOpen } = useModal();
  
  return (
    <section className="py-24 md:py-40 bg-zinc-950 text-white overflow-hidden relative" id="contact">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <div className="w-full mx-auto px-6 sm:px-8 md:px-[7%] lg:px-[7%] xl:px-[7%] relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
            Have a project <br /> in mind?
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light">
            I&apos;m always looking for new challenges and interesting people to collaborate with.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="group flex items-center gap-3 bg-white text-zinc-950 px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <EnvelopeSimple size={24} weight="bold" />
              Let&apos;s Talk
              <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" />
            </button>
            
            <a 
              href="/process"
              className="text-white font-medium hover:text-zinc-400 transition-colors py-4 px-8"
            >
              View My Process
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
