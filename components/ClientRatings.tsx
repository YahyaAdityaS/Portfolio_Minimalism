"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Quotes, Pencil } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { RatingModal } from "./RatingModal";

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  quote: string;
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwSqnCLe68M9NpQJmyGC-SNQLdcV2_vn7rcq5M53xqzKidTCcMprja798U7hu8d9o2G/exec";

export function ClientRatings() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<string | number>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();
      setTestimonials(data);
      localStorage.setItem("cached_ratings", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem("cached_ratings");
    if (cached) {
      setTestimonials(JSON.parse(cached));
      setIsLoading(false);
    }
    fetchTestimonials();
  }, []);

  const filteredTestimonials = testimonials.filter(testimonial => 
    selectedRating === "All" || testimonial.rating === selectedRating
  );

  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage) || 1;
  const paginatedTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRatingChange = (rating: string | number) => {
    setSelectedRating(rating);
    setCurrentPage(1);
  };

  return (
    <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <RatingModal 
        isOpen={isRatingModalOpen} 
        onClose={() => setIsRatingModalOpen(false)} 
        onSuccess={fetchTestimonials}
      />
      <div className="w-full mx-auto px-6 sm:px-8 md:px-[7%] lg:px-[7%] xl:px-[7%]">
        <div className="mb-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Client Ratings</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
              Trusted by industry leaders to deliver exceptional digital experiences.
            </p>
          </div>
          <button
            onClick={() => setIsRatingModalOpen(true)}
            className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <Pencil size={16} />
            Write a Review
          </button>
        </div>

        <div className="mb-12 flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleRatingChange("All")}
            className={cn(
              "text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300",
              selectedRating === "All" 
               ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900" 
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={cn(
                "text-sm font-medium px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300",
                selectedRating === rating 
                 ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900" 
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              <span className="text-current">{rating}</span>
              <Star size={14} weight="fill" className="fill-current text-current" />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900/60 animate-pulse h-[280px] p-10 flex flex-col justify-between border border-zinc-200 dark:border-zinc-800" />
            ))
          ) : (
            paginatedTestimonials.map((t, index) => (
              <motion.div
                key={t.name + index}
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
                      <Star key={i} size={16} weight="fill" className="fill-current text-current" />
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
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
