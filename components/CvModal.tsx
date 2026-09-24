"use client";

import { useEffect } from "react";
import { X, File, Copy, Download, ArrowSquareOut } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const cvLink = "https://drive.google.com/file/d/1vC_aM5_BEx-YOUR_DRIVE_FILE_ID/preview";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + cvLink);
    alert("Link CV berhasil disalin!");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" 
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* macOS Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-200/50 dark:bg-zinc-800/50 border-b border-zinc-300 dark:border-zinc-700">
              <div className="flex items-center gap-2">
                <button 
                  onClick={onClose} 
                  className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-red-500 dark:hover:bg-red-500 transition-colors flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-white"
                  title="Close"
                >
                  <X size={9} weight="bold" />
                </button>
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Yahya_Aditya_CV.pdf</div>
              <div className="flex items-center gap-3">
                <a href={cvLink} target="_blank" rel="noopener noreferrer" title="Buka Drive" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  <ArrowSquareOut size={18} />
                </a>
                <button onClick={handleCopyLink} title="Salin Link" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  <Copy size={18} />
                </button>
                <a href={cvLink} download title="Download CV" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  <Download size={18} />
                </a>
              </div>
            </div>

            {/* Content */}
            <iframe src={cvLink} className="w-full h-[70vh] bg-white" title="CV" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
