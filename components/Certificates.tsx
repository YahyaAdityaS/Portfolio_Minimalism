"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Certificate, SealCheck, GraduationCap, Medal } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const categories = ["All", "Design", "Tech", "Business & Skill"];

const certificates = [
  {
    name: "Advanced Interaction Design",
    issuer: "Interaction Design Foundation",
    date: "2024",
    category: "Design",
    icon: <Certificate size={32} weight="thin" />
  },
  {
    name: "Google UX Design Professional",
    issuer: "Coursera / Google",
    date: "2023",
    category: "Design",
    icon: <SealCheck size={32} weight="thin" />
  },
  {
    name: "Mastering Figma & Prototyping",
    issuer: "Design Academy",
    date: "2023",
    category: "Design",
    icon: <GraduationCap size={32} weight="thin" />
  },
  {
    name: "Visual Communication Principles",
    issuer: "Creative Arts School",
    date: "2022",
    category: "Design",
    icon: <Medal size={32} weight="thin" />
  },
  {
    name: "Full-Stack Web Engineering",
    issuer: "Tech Masters",
    date: "2024",
    category: "Tech",
    icon: <Certificate size={32} weight="thin" />
  },
  {
    name: "React & Next.js Advanced Architecture",
    issuer: "Frontend Masters",
    date: "2023",
    category: "Tech",
    icon: <SealCheck size={32} weight="thin" />
  },
  {
    name: "Agile Product Management",
    issuer: "Product School",
    date: "2023",
    category: "Business & Skill",
    icon: <GraduationCap size={32} weight="thin" />
  },
  {
    name: "Strategic Design Leadership",
    issuer: "Executive Business Institute",
    date: "2022",
    category: "Business & Skill",
    icon: <Medal size={32} weight="thin" />
  }
];

export function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 4 items per page for certificates

  const filteredCertificates = selectedCategory === "All"
    ? certificates
    : certificates.filter(c => c.category === selectedCategory);

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCertificates = filteredCertificates.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Certificates</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Continuous learning is the foundation of my design practice. These certifications represent my dedication to the craft.
          </p>
        </div>

        {/* Minimalist Tabbing / Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                    : "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-100"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCertificates.map((cert, index) => (
            <motion.div
              key={cert.name + index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-zinc-950/5 dark:hover:shadow-black/20"
            >
              <div className="text-zinc-900 dark:text-white mb-6">
                {cert.icon}
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-2 leading-tight">{cert.name}</h3>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{cert.issuer}</span>
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">{cert.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modern Minimalist Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center",
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md"
                      : "border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-100"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
