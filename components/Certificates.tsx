"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Medal, ArrowClockwise } from "@phosphor-icons/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CertificateData, CertificateModal } from "./CertificatesModal";
import { fetchFromGAS } from "@/lib/api";

const GAS_URL = "https://script.google.com/macros/s/AKfycby2xBbKIOIgxgV2vJP0HUh-ChqUoI47GKKImeMT_u9WKBOUqPL5oH-a6TdnVbJ2wyAG/exec";

const categories = ["All", "Design", "Tech", "Business & Skill"];

interface GasCertificate {
  id?: number | string;
  name?: string;
  title?: string;
  desc?: string;
  description?: string;
  tags?: string[] | string;
  category?: string;
  year?: string;
  image?: string;
  img?: string;
}

function CertificateSkeleton() {
  return (
    <div className="group">
      <div className="aspect-4/3 w-full rounded-3xl bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-6" />
      <div className="flex items-center justify-between">
        <div className="w-full">
          <div className="h-5 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-2" />
          <div className="h-3 w-1/3 rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0 ml-4" />
      </div>
    </div>
  );
}

export function Certificates() {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchCertificates = async () => {
    const data = await fetchFromGAS(GAS_URL, "cached_certificates");
    if (!data) {
      setIsLoading(false);
      return;
    }

    const rawData = data as { data?: GasCertificate[]; certificates?: GasCertificate[]; [key: string]: unknown };
    const items = Array.isArray(data) ? data : rawData?.data || rawData?.certificates;
    
    if (items && Array.isArray(items) && items.length > 0) {
      const mapped: CertificateData[] = items.map((item: GasCertificate, idx: number) => ({
        id: Number(item.id) || idx + 1,
        name: item.name || item.title || "Untitled Certificate",
        desc: item.desc || item.description || "",
        tags: Array.isArray(item.tags)
          ? item.tags
          : typeof item.tags === "string"
          ? item.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
          : ["Design", "Certificate"],
        category: item.category || "Design",
        year: item.year || "2024",
        image: item.image || item.img || `https://picsum.photos/seed/cert-${idx + 1}/800/600`,
      }));
      React.startTransition(() => {
        setCertificates(mapped);
        localStorage.setItem("cached_certificates", JSON.stringify(mapped));
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const restoreCachedCertificates = () => {
      try {
        const cached = localStorage.getItem("cached_certificates");
        if (!cached || !isMounted) return;

        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          React.startTransition(() => {
            setCertificates(parsed);
            setIsLoading(false);
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    restoreCachedCertificates();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchTimeout = window.setTimeout(() => {
      void fetchCertificates();
    }, 0);

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCertificates = selectedCategory === "All"
    ? certificates
    : certificates.filter(c => c.category.toLowerCase() === selectedCategory.toLowerCase());

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCertificates = filteredCertificates.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section id="certificates" className="py-24 md:py-32">
      <div className="w-full mx-auto px-6 sm:px-8 md:px-[7%] lg:px-[7%] xl:px-[7%]">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Certificates</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Continuous learning is the foundation of my practice. These certifications represent my dedication to the craft.
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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <CertificateSkeleton key={i} />
            ))}
          </div>
        ) : filteredCertificates.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="col-span-full py-16 sm:py-20 px-6 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col items-center justify-center text-center max-w-xl mx-auto my-8 backdrop-blur-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center text-zinc-500 dark:text-zinc-400 mb-5 shadow-inner">
              <Medal size={28} weight="duotone" />
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 mb-3 border border-zinc-300/40 dark:border-zinc-700/40">
              0 Certificates Found
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
              No Certificates in This Category
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed mb-6">
              Certifications for this category are currently being updated. You can explore other categories or view all certificates.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setCurrentPage(1);
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
            >
              <ArrowClockwise size={16} weight="bold" />
              <span>View All Certificates</span>
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {currentCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className="block">
                  <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-zinc-200 dark:bg-zinc-800 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    {cert.image && (
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        fill
                        unoptimized
                        className="object-cover grayscale opacity-85 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight mb-1 line-clamp-2">{cert.name}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">
                        {cert.category} {cert.year ? `• ${cert.year}` : ""}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 shrink-0">
                      <Medal weight="bold" size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modern Minimalist Pagination */}
        {!isLoading && totalPages > 1 && (
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

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}
