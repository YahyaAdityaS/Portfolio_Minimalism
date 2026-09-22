"use client";

import { GithubLogo, TwitterLogo, LinkedinLogo, InstagramLogo, ArrowUp } from "@phosphor-icons/react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-100 dark:border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold tracking-tighter">Alex Rivera.</span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} / Made with focus and clarity.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <GithubLogo size={24} />
            </a>
            <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <TwitterLogo size={24} />
            </a>
            <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <LinkedinLogo size={24} />
            </a>
            <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <InstagramLogo size={24} />
            </a>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Back to top
            <ArrowUp size={16} weight="bold" className="transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
