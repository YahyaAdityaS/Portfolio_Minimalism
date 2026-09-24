"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/lib/modal-context";
import { cn } from "@/lib/utils";
import { X, ArrowRight, Check, Sparkle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

const categories = ["UI/UX Design", "Web App", "Design System", "Other"];

export function ContactModal() {
  const { isContactModalOpen, setIsContactModalOpen } = useModal();
  const [formData, setFormData] = useState({ nama: "", email: "", kategori: "UI/UX Design", pesan: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsContactModalOpen(false);
    };
    if (isContactModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isContactModalOpen, setIsContactModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzh685CM39ZYwKrfbfDO5ayIFsHSOJoAwhCCnMijT6yyU0UJNv3e80mVKT2uZHo1glG/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
      });
      setStatus("success");
      setFormData({ nama: "", email: "", kategori: "UI/UX Design", pesan: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Something went wrong while delivering your message. Please try again or email me directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsContactModalOpen(false);
    setTimeout(() => {
      setStatus("idle");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* macOS Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-100/70 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleClose} 
                  className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-red-500 dark:hover:bg-red-500 transition-colors flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-white cursor-pointer"
                  title="Close"
                >
                  <X size={9} weight="bold" />
                </button>
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div className="text-xs font-mono font-medium text-zinc-500 tracking-tight flex items-center gap-1.5">
                <Sparkle size={13} weight="fill" className="text-zinc-400" />
                Let's_Talk.form
              </div>
              <div className="w-12" />
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Message Sent!</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 text-center max-w-xs leading-relaxed">
                      Thanks for reaching out! I&apos;ve received your brief and will get back to you shortly.
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition mt-6 shadow-md active:scale-95 cursor-pointer text-sm"
                  >
                    Done
                  </button>
                </motion.div>
              ) : status === "error" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center py-6 space-y-4"
                >
                  <div className="relative my-4 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-red-500/10 ring-8 ring-red-500/10 animate-pulse" />
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 shadow-md">
                      <X size={30} weight="bold" />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Failed to Send</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 text-center max-w-xs leading-relaxed">
                      Something went wrong while delivering your message. Please try again or email me directly.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-6 w-full justify-center">
                    <button
                      onClick={() => setStatus("idle")}
                      className="bg-red-600 text-white rounded-full py-2.5 px-6 hover:bg-red-500 transition font-medium text-sm shadow-md cursor-pointer"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleClose}
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-sm py-2.5 px-4 transition cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1.5">
                      Let&apos;s build something great.
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Fill out the details below and let&apos;s start a conversation.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Your Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                          value={formData.nama}
                          onChange={e => setFormData({...formData, nama: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Email Address</label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Project Category</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            type="button"
                            className={cn(
                              "px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border",
                              formData.kategori === cat 
                                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm" 
                                : "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                            )}
                            onClick={() => setFormData({...formData, kategori: cat})}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Project Brief</label>
                      <textarea
                        placeholder="Tell me about your project, goals, and timeline..."
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all min-h-[110px] resize-none"
                        value={formData.pesan}
                        onChange={e => setFormData({...formData, pesan: e.target.value})}
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="group w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl py-3.5 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
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
