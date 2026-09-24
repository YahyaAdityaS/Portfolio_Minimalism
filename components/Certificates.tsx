"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Certificate, SealCheck, GraduationCap, Medal } from "@phosphor-icons/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const categories = ["All", "Design", "Tech", "Business & Skill"];

const certificates = [
  {
    name: "Advanced Interaction Design",
    issuer: "Interaction Design Foundation",
    date: "2024",
    category: "Design",
    image: "https://picsum.photos/seed/cert-1/800/600",
    icon: <Certificate size={24} weight="thin" />
  },
  {
    name: "Google UX Design Professional",
    issuer: "Coursera / Google",
    date: "2023",
    category: "Design",
    image: "https://picsum.photos/seed/cert-2/800/600",
    icon: <SealCheck size={24} weight="thin" />
  },
  {
    name: "Mastering Figma & Prototyping",
    issuer: "Design Academy",
    date: "2023",
    category: "Design",
    image: "https://picsum.photos/seed/cert-3/800/600",
    icon: <GraduationCap size={24} weight="thin" />
  },
  {
    name: "Visual Communication Principles",
    issuer: "Creative Arts School",
    date: "2022",
    category: "Design",
    image: "https://picsum.photos/seed/cert-4/800/600",
    icon: <Medal size={24} weight="thin" />
  },
  {
    name: "Full-Stack Web Engineering",
    issuer: "Tech Masters",
    date: "2024",
    category: "Tech",
    image: "https://picsum.photos/seed/cert-5/800/600",
    icon: <Certificate size={24} weight="thin" />
  },
  {
    name: "React & Next.js Advanced Architecture",
    issuer: "Frontend Masters",
    date: "2023",
    category: "Tech",
    image: "https://picsum.photos/seed/cert-6/800/600",
    icon: <SealCheck size={24} weight="thin" />
  },
  {
    name: "Agile Product Management",
    issuer: "Product School",
    date: "2023",
    category: "Business & Skill",
    image: "https://picsum.photos/seed/cert-7/800/600",
    icon: <GraduationCap size={24} weight="thin" />
  },
  {
    name: "Strategic Design Leadership",
    issuer: "Executive Business Institute",
    date: "2022",
    category: "Business & Skill",
    image: "https://picsum.photos/seed/cert-8/800/600",
    icon: <Medal size={24} weight="thin" />
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
      <div className="w-full mx-auto px-6 sm:px-8 md:px-[7%] lg:px-[7%] xl:px-[7%]">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {currentCertificates.map((cert, index) => (
            <motion.div
              key={cert.name + selectedCategory}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.1, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-5 sm:p-6 cursor-pointer transition-all duration-400 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-0 opacity-0 mb-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 group-hover:h-44 sm:group-hover:h-48 group-hover:opacity-100 group-hover:mb-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="w-full h-full object-cover grayscale opacity-85 group-hover:scale-105 transition-transform duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="text-zinc-900 dark:text-white">
                    {cert.icon}
                  </div>
                  <span className="text-zinc-400 dark:text-zinc-500 uppercase">{cert.date}</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg mt-2 tracking-tight leading-tight line-clamp-2 min-h-[3.5rem]">{cert.name}</h3>
              </div>
              <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">{cert.issuer}</span>
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