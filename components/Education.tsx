"use client";

import { motion } from "motion/react";
import { GraduationCap, Buildings } from "@phosphor-icons/react";

const educationData = [
  {
    degree: "Master of Design in Interaction Design",
    institution: "Rhode Island School of Design (RISD)",
    period: "2020 - 2022",
    description: "Focused on advanced digital product design, human factors, and design systems architecture.",
    icon: <GraduationCap size={32} weight="thin" />
  },
  {
    degree: "B.S. in Computer Science & User Experience",
    institution: "Stanford University",
    period: "2016 - 2020",
    description: "Studied core computer science algorithms alongside human-computer interaction research and visual arts.",
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
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-zinc-950/5 dark:hover:shadow-black/20 flex flex-col justify-between"
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