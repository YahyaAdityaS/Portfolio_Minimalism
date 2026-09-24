"use client";

import { GithubLogo, TwitterLogo, LinkedinLogo, InstagramLogo, DribbbleLogo, ArrowUp } from "@phosphor-icons/react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-100">
      <div className="w-full mx-auto px-6 sm:px-8 md:px-[7%] lg:px-[7%] xl:px-[7%]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold tracking-tighter">Yahya Aditya.</span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} / Made with focus and clarity.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/YahyaAdityaS" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <GithubLogo size={24} />
            </a>
            <a href="https://linkedin.com/in/yahyadityas" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <LinkedinLogo size={24} />
            </a>
            <a href="https://dribbble.com/Putra204247T" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <DribbbleLogo size={24} />
            </a>
            {/* <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <TwitterLogo size={24} />
            </a> */}
            {/* <a href="https://www.instagram.com/yahyaditya.s/" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <InstagramLogo size={24} />
            </a> */}
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