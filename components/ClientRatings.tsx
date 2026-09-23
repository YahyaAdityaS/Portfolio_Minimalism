"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Star, Quotes } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
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
  },
  {
    name: "John Doe",
    role: "Senior Developer",
    rating: 4,
    quote: "Alex's design skills are top-notch. He always delivers on time and exceeds expectations."
  },
  {
    name: "Jane Smith",
    role: "Marketing Manager",
    rating: 3,
    quote: "Alex's attention to detail and user experience is commendable. A great addition to any team."
  },
  {
    name: "Sam Johnson",
    role: "Product Manager",
    rating: 2,
    quote: "Alex provided good design solutions, but there was room for improvement in some areas."
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    rating: 1,
    quote: "There were some communication issues, but overall a decent experience."
  }
];

function filterTestimonials(list: Testimonial[], selectedRating: string | number) {
  return list.filter(testimonial => 
    selectedRating === "All" || testimonial.rating === selectedRating
  );
}

export function ClientRatings() {
  const [selectedRating, setSelectedRating] = useState<string | number>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const filteredTestimonials = filterTestimonials(testimonials, selectedRating);
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage) || 1;

  const paginatedTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRatingChange = (rating: string | number) => {
    setSelectedRating(rating);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="w-full mx-auto px-6 sm:px-8 md:px-[7%] lg:px-[7%] xl:px-[7%]">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Client Ratings</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Trusted by industry leaders to deliver exceptional digital experiences.
          </p>
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
          {paginatedTestimonials.map((t, index) => (
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
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cn(
                  "w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center",
                  currentPage === page 
                   ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900" 
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNext}
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