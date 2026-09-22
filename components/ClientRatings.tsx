"use client";

import { motion } from "motion/react";
import { Star, Quotes } from "@phosphor-icons/react";

const testimonials = [
  {
    name: "Eleanor Vance",
    role: "CEO at Stratos",
    rating: 5,
    quote: "Alex transformed our complex vision into a simple, elegant product. The attention to detail is unparalleled."
  },
  {
    name: "Marcus Thorne",
    role: "Creative Director",
    rating: 5,
    quote: "Working with Alex was a breath of fresh air. A designer who truly understands the balance between business goals and user needs."
  },
  {
    name: "Sienna Miller",
    role: "Product Manager",
    rating: 5,
    quote: "The bold typography and clean layout Alex delivered exceeded our expectations. Our conversion rates have never been better."
  }
];

export function ClientRatings() {
  return (
    <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Client Ratings</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Trusted by industry leaders to deliver exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-10 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
            >
              <Quotes size={48} weight="fill" className="absolute top-8 right-8 text-zinc-100 dark:text-zinc-900 -z-0" />
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} weight="fill" className="text-zinc-900 dark:text-white" />
                  ))}
                </div>
                
                <p className="text-xl font-medium tracking-tight mb-8 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                
                <div>
                  <h4 className="font-bold tracking-tight text-zinc-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
