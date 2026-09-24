"use client";

import { motion } from "motion/react";
import { Compass, Rows, Palette, Code } from "@phosphor-icons/react";

const services = [
  {
    title: "Product Design & Strategy",
    description: "End-to-end product creation aligning user needs with business goals.",
    icon: <Compass size={32} weight="thin" />
  },
  {
    title: "User Experience",
    description: "Research, wireframing, and usability testing to ensure seamless flow.",
    icon: <Rows size={32} weight="thin" />
  },
  {
    title: "UI & Brand Identity",
    description: "Crafting distinct visual systems, UI elements, and cohesive graphic identities.",
    icon: <Palette size={32} weight="thin" />
  },
  {
    title: "Web Development",
    description: "Building modern, fast, and responsive web applications with clean code.",
    icon: <Code size={32} weight="thin" />
  }
];

const experience = [
  {
    role: "Senior Product Designer",
    company: "Lumina Labs",
    period: "2022 - Present",
    desc: "Leading the design system and core product experience."
  },
  {
    role: "UX Designer",
    company: "Vertex Agency",
    period: "2020 - 2022",
    desc: "Delivered digital products for Fortune 500 companies."
  },
  {
    role: "Junior Designer",
    company: "Studio Minimal",
    period: "2018 - 2020",
    desc: "Learned the craft of bold typography and clean grids."
  }
];

export function ServicesExperience() {
  return (
    <section className="py-24 md:py-32">
      <div className="w-full mx-auto px-6 sm:px-8 md:px-[7%] lg:px-[7%] xl:px-[7%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32">
          {/* Services */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {services.map((service, index) => (
                <motion.div 
                  key={service.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-zinc-900 dark:text-white mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{service.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">Experience</h2>
            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div 
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative pb-8 border-b border-zinc-200/50 dark:border-zinc-700/50 last:border-0 transition-colors duration-100"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-zinc-500 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-sm text-zinc-400 dark:text-zinc-500 uppercase">
                      {exp.period}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-medium text-zinc-900 dark:text-white">{exp.company}</span>
                    <p className="text-zinc-500 dark:text-zinc-400">{exp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}