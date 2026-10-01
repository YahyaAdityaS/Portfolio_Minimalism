"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, Check, Star, Pencil } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RatingModal({ isOpen, onClose, onSuccess }: RatingModalProps) {
  const [formData, setFormData] = useState({ name: "", role: "", rating: 0, feedback: "" });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) return;
    
    setIsLoading(true);
    setStatus("idle");
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwSqnCLe68M9NpQJmyGC-SNQLdcV2_vn7rcq5M53xqzKidTCcMprja798U7hu8d9o2G/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
      });
      setStatus("success");
      setFormData({ name: "", role: "", rating: 0, feedback: "" });
      onSuccess();
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* macOS Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-100/70 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <button 
                  onClick={onClose} 
                  className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-red-500 dark:hover:bg-red-500 transition-colors flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-white cursor-pointer"
                  title="Close"
                >
                  <X size={9} weight="bold" />
                </button>
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div className="text-xs font-mono font-medium text-zinc-500 tracking-tight flex items-center gap-1.5">
                <Pencil size={13} weight="fill" className="text-zinc-400" />
                Submit_Review.form
              </div>
              <div className="w-12" />
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6 space-y-4"
                >
                {/* Badge with micro-confetti particles */}
                  <div className="relative w-36 h-36 flex items-center justify-center mx-auto my-2">
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.6 }} transition={{ delay: 0.05 }} className="absolute top-2 left-4 w-2 h-2 rounded-full bg-black/50 dark:bg-white/50" />
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.7 }} transition={{ delay: 0.1 }} className="absolute top-0 right-6 text-xs font-bold text-black/60 dark:text-white/60">+</motion.div>
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.5 }} transition={{ delay: 0.15 }} className="absolute top-8 right-2 w-3 h-1.5 rounded-full bg-black/40 dark:bg-white/40 rotate-45" />
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ delay: 0.08 }} className="absolute bottom-6 left-1 w-1.5 h-3 rounded-full bg-black/50 dark:bg-white/50 -rotate-12" />
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.6 }} transition={{ delay: 0.2 }} className="absolute bottom-2 left-10 text-xs font-bold text-black/60 dark:text-white/60">+</motion.div>
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.5 }} transition={{ delay: 0.12 }} className="absolute bottom-1 right-8 w-2 h-2 rounded-full bg-black/40 dark:bg-white/40" />
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.7 }} transition={{ delay: 0.25 }} className="absolute top-12 left-2 w-1.5 h-1.5 rounded-full bg-black/60 dark:bg-white/60" />
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.6 }} transition={{ delay: 0.18 }} className="absolute bottom-8 right-3 text-xs font-bold text-black/50 dark:text-white/50">+</motion.div>
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.5 }} transition={{ delay: 0.22 }} className="absolute top-5 right-14 w-2.5 h-1 rounded-full bg-black/50 dark:bg-white/50 rotate-90" />
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.6 }} transition={{ delay: 0.14 }} className="absolute bottom-4 left-16 w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40" />

                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex items-center justify-center w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-md ring-8 ring-black/5 dark:ring-white/5"
                    >
                      <Check size={30} weight="bold" />
                    </motion.div>
                  </div>

                  <div className="space-y-2 mt-2">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Review Submitted!</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 text-center max-w-xs leading-relaxed">
                      Thanks for your feedback!
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition mt-6 shadow-md active:scale-95 cursor-pointer text-sm"
                  >
                    Done
                  </button>
                </motion.div>
              ) : status === "error" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6 space-y-4"
                >
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 shadow-md">
                    <X size={30} weight="bold" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Failed to Submit</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Something went wrong. Please try again.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="bg-red-600 text-white rounded-full py-2.5 px-6 hover:bg-red-500 transition font-medium text-sm shadow-md cursor-pointer"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1.5">
                      Submit Review & Rating
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Id love to hear about your experience.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Rating</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="cursor-pointer transition-all hover:scale-110"
                            onClick={() => setFormData({...formData, rating: star})}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                          >
                            <Star 
                              size={32} 
                              weight={(hoveredRating || formData.rating) >= star ? "fill" : "regular"} 
                              className={cn(
                                "transition-colors",
                                (hoveredRating || formData.rating) >= star ? "text-zinc-900 dark:text-zinc-100 fill-current" : "text-zinc-300 dark:text-zinc-700"
                              )}
                            />
                          </button>
                        ))}
                        <span className="ml-2 font-mono text-sm text-zinc-500">
                          {hoveredRating || formData.rating || 0} / 5
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Full Name</label>
                        <input
                          type="text"
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Role / Company</label>
                        <input
                          type="text"
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                          value={formData.role}
                          onChange={e => setFormData({...formData, role: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Feedback</label>
                      <textarea
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-3 text-sm min-h-25 resize-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                        value={formData.feedback}
                        onChange={e => setFormData({...formData, feedback: e.target.value})}
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading || formData.rating === 0}
                      className="group w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl py-3.5 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? <span>Submitting...</span> : "Submit Review"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
