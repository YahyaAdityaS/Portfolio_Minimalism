"use client";

import { useEffect } from "react";
import { X, ArrowSquareOut, Certificate as CertIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export interface CertificateData {
  id: number;
  name: string;
  desc: string;
  tags: string[];
  category: string;
  year: string;
  image: string;
}

interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (certificate) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto" 
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* macOS Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-200/50 dark:bg-zinc-800/50 border-b border-zinc-300 dark:border-zinc-700 shrink-0">
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
              <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 truncate max-w-[200px] sm:max-w-xs">
                {certificate.name}
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <CertIcon size={18} />
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              {/* Category & Year Chips */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-200/70 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  {certificate.category}
                </span>
                {certificate.year && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-mono">
                    {certificate.year}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-50">
                {certificate.name}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                {certificate.desc}
              </p>

              {/* Certificate Image Preview */}
              {certificate.image && (
                <div className="relative aspect-[4/3] sm:aspect-video w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800 mb-6">
                  <Image
                    src={certificate.image}
                    alt={certificate.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}

              {/* Tags / Skills */}
              {certificate.tags && certificate.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 font-mono">
                    Skills & Credentials
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {certificate.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 px-3 py-1 rounded-md text-xs font-mono text-zinc-700 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Action */}
              {certificate.image && (
                <div className="flex items-center gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <a
                    href={certificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    <span>View Credential Image</span>
                    <ArrowSquareOut size={16} weight="bold" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}    