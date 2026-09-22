"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Certificates", href: "#certificates" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isClickScrolling = useRef(false);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    isClickScrolling.current = true;
    setActiveSection(href);
    const targetId = href.substring(1);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
    setMenuOpen(false);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleScrollObserver = () => {
      if (isClickScrolling.current) return;
      const sections = ["work", "certificates", "services", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollObserver);
    handleScroll();
    handleScrollObserver();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollObserver);
    };
  }, []);

  return (
    <header className={cn(
      "fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out",
      scrolled ? "top-4 px-4 sm:px-6" : "top-0 px-0"
    )}>
      <div className={cn(
        "mx-auto flex items-center justify-between transition-all duration-500 ease-in-out",
        scrolled 
          ? "w-full max-w-5xl bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full px-6 py-3 shadow-sm" 
          : "w-full rounded-none bg-transparent px-6 md:px-12 py-6 border-0 shadow-none"
      )}>
        <Link href="/" className="text-xl font-bold tracking-tighter">
          Yahya Aditya.
        </Link>
        
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-medium px-4 py-2 rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-semibold"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                )}
                onClick={(e) => handleNavLinkClick(e, link.href)}
              >
                {link.name}
              </Link>
            );
          })}

          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center ml-1"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={18} weight="bold" />
              ) : (
                <Moon size={18} weight="bold" />
              )}
            </button>
          )}

          <Link 
            href="#contact"
            className="ml-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            Let&apos;s Talk
          </Link>
        </div>
        
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={cn("w-6 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-transform", menuOpen && "rotate-45 translate-y-2")} />
          <div className={cn("w-6 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-opacity", menuOpen && "opacity-0")} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute left-4 right-4 top-20 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-lg font-medium text-zinc-900 dark:text-zinc-100"
              onClick={(e) => handleNavLinkClick(e, link.href)}
            >
              {link.name}
            </Link>
          ))}
          {mounted && (
            <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Appearance</span>
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium"
              >
                {resolvedTheme === "dark" ? (
                  <>
                    <Sun size={16} weight="bold" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={16} weight="bold" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}