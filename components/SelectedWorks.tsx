"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = ["All", "UI/UX Design", "Web Development", "Graphic Desain", "Photography"];

const projects = [
  {
    title: "Aetheria Platform",
    category: "UI/UX Design",
    image: "https://picsum.photos/seed/tactile-1/1200/1600",
    link: "#"
  },
  {
    title: "Lumina Brand Identity",
    category: "Graphic Desain",
    image: "https://picsum.photos/seed/geometric-2/1200/1600",
    link: "#"
  },
  {
    title: "Vortex Interface",
    category: "UI/UX Design",
    image: "https://picsum.photos/seed/minimal-3/1200/1600",
    link: "#"
  },
  {
    title: "Nexus Mobile App",
    category: "UI/UX Design",
    image: "https://picsum.photos/seed/shape-4/1200/1600",
    link: "#"
  },
  {
    title: "Krypton Design System",
    category: "Web Development",
    image: "https://picsum.photos/seed/system-5/1200/1600",
    link: "#"
  },
  {
    title: "Solstice Web App",
    category: "Web Development",
    image: "https://picsum.photos/seed/web-6/1200/1600",
    link: "#"
  },
  {
    title: "Zenith E-Commerce",
    category: "Web Development",
    image: "https://picsum.photos/seed/shop-7/1200/1600",
    link: "#"
  },
  {
    title: "Horizon Dashboard",
    category: "UI/UX Design",
    image: "https://picsum.photos/seed/dash-8/1200/1600",
    link: "#"
  },
  {
    title: "Aura Lens Portfolio",
    category: "Photography",
    image: "https://picsum.photos/seed/photo-9/1200/1600",
    link: "#"
  },
  {
    title: "Chronos Gallery",
    category: "Photography",
    image: "https://picsum.photos/seed/photo-10/1200/1600",
    link: "#"
  },
  {
    title: "Vector Type Specimen",
    category: "Graphic Desain",
    image: "https://picsum.photos/seed/graphic-11/1200/1600",
    link: "#"
  },
  {
    title: "Ember Branding System",
    category: "Graphic Desain",
    image: "https://picsum.photos/seed/graphic-12/1200/1600",
    link: "#"
  },
];

export function SelectedWorks() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 4 cols x 2 rows

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Selected Works</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              A collection of projects where form meets function, focusing on clarity and user experience.
            </p>
          </div>
          <Link 
            href="#" 
            className="group flex items-center gap-2 font-medium text-zinc-900 dark:text-white transition-all"
          >
            View All Work
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.title + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group transition-all duration-500 ease-out hover:-translate-y-2"
            >
              <Link href={project.link} className="block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-200 dark:bg-zinc-800 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale opacity-85 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight mb-1">{project.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">
                      {project.category}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 shrink-0">
                    <ArrowRight weight="bold" size={16} />
                  </div>
                </div>
              </Link>
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
