"use client";

import { motion } from "motion/react";
import { GraduationCap, Buildings } from "@phosphor-icons/react";

const educationData = [
  {
    degree: "Vocational High School - Software Engineering",
    institution: "SMK Telkom Malang",
    period: "2023 - 2026",
    description: "Specialized in full-stack web development and advanced UI/UX design, actively contributing to tech projects and winning regional digital product competitions.",
    icon: <GraduationCap size={32} weight="thin" />
  },
  {
    degree: "Independent Study & Portfolio Development",
    institution: "Self-Directed Learning",
    period: "2026 - Present",
    description: "Continuously refining advanced UI/UX and full-stack development skills through personal projects while actively seeking professional opportunities.",
    icon: <Buildings size={32} weight="thin" />
  }
];

export function Education() {
  return (
    <section className="py-24 md:py-32">
      <div className="w-full mx-auto px-6 sm:px-8 md:px-[7%] lg:px-[7%] xl:px-[7%]">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Education</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Academic background and rigorous training that shape my analytical and creative approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400/50 dark:hover:border-zinc-600/50 transition-colors duration-500 hover:shadow-xl hover:shadow-zinc-950/5 dark:hover:shadow-black/20 flex flex-col justify-between"
            >
              <div>
                <div className="text-zinc-900 dark:text-white mb-6">
                  {edu.icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                    {edu.period}
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">{edu.degree}</h3>
                <h4 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-4">{edu.institution}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}