"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { animate as anime, stagger } from "animejs";
import { ArrowLeft, ArrowRight, EnvelopeSimple, Sparkle } from "@phosphor-icons/react";
import { useModal } from "@/lib/modal-context";

export default function ProcessPage() {
  const { setIsContactModalOpen } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlideRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const isAnimatingRef = useRef(false);
  const totalSlides = 6;

  // Safe anime function reference using unknown type assertion for anime.js v4 (targets, parameters)
  const animeFn = anime as unknown as (targets: unknown, parameters?: unknown) => unknown;

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  const scrollToSlide = (index: number) => {
    if (isAnimatingRef.current || !containerRef.current) return;
    if (index < 0 || index >= totalSlides) return;
    if (index === currentSlideRef.current) return;

    isAnimatingRef.current = true;
    const slideHeight = containerRef.current.clientHeight;
    const targetScrollTop = index * slideHeight;

    animeFn(containerRef.current, {
      scrollTop: targetScrollTop,
      duration: 1000,
      easing: 'easeInOutCubic',
      complete: () => {
        isAnimatingRef.current = false;
        setCurrentSlide(index);
        currentSlideRef.current = index;
      }
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimatingRef.current) return;
      if (Math.abs(e.deltaY) < 20) return;

      const current = currentSlideRef.current;
      let target = current;

      if (e.deltaY > 0 && current < totalSlides - 1) {
        target = Math.min(current + 1, totalSlides - 1);
      } else if (e.deltaY < 0 && current > 0) {
        target = Math.max(current - 1, 0);
      }

      if (target !== current) {
        scrollToSlide(target);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return;

      const current = currentSlideRef.current;
      let target = current;

      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && current < totalSlides - 1) {
        target = Math.min(current + 1, totalSlides - 1);
        e.preventDefault();
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && current > 0) {
        target = Math.max(current - 1, 0);
        e.preventDefault();
      }

      if (target !== current) {
        scrollToSlide(target);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentSlideEl = slideRefs.current[currentSlide];
    if (!currentSlideEl) return;

    const badgeEl = currentSlideEl.querySelector('.slide-badge');
    const wordEls = currentSlideEl.querySelectorAll('.slide-word');
    const paragraphEl = currentSlideEl.querySelector('.slide-paragraph');

    if (badgeEl) {
      animeFn(badgeEl, {
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 600,
        easing: 'easeOutCubic'
      });
    }

    if (wordEls && wordEls.length > 0) {
      animeFn(wordEls, {
        translateX: [-30, 0],
        opacity: [0, 1],
        letterSpacing: ['0.1em', 'normal'],
        duration: 900,
        delay: stagger(60),
        easing: 'easeOutCubic'
      });
    }

    const headingTotalTime = 900 + (wordEls.length * 60);
    if (paragraphEl) {
      animeFn(paragraphEl, {
        translateY: [15, 0],
        opacity: [0, 1],
        filter: ['blur(4px)', 'blur(0px)'],
        duration: 800,
        delay: Math.min(headingTotalTime - 200, 400),
        easing: 'easeOutCubic'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  const renderStaggeredWords = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="slide-word inline-block mr-[0.25em] opacity-0">
        {word}
      </span>
    ));
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-white"
    >
      {/* Fixed Navigation Header - Aligned with px-6 sm:px-12 md:px-16 */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 md:px-16 py-6 pointer-events-none">
        <Link 
          href="/" 
          className="pointer-events-auto group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <div className="pointer-events-auto bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-full text-xs font-mono tracking-widest text-zinc-600 dark:text-zinc-400 shadow-sm">
          {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
      </header>

      {/* Vertical Progress Dots */}
      <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            className={`transition-all duration-200 rounded-full cursor-pointer ${
              currentSlide === idx 
                ? "w-2 h-8 bg-black dark:bg-white" 
                : "w-2 h-2 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-600"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* SLIDE 1 - The Hook */}
      <section 
        ref={el => { slideRefs.current[0] = el; }}
        className="h-screen w-full snap-start snap-always flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-24 pb-12 relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-200/35 dark:bg-zinc-900/20 opacity-35 rounded-full blur-[120px] pointer-events-none" />
        
        <div>
          <span className="slide-badge opacity-0 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm">
            <Sparkle size={12} weight="fill" className="text-zinc-500 dark:text-zinc-400" />
            Methodology & Process
          </span>
        </div>

        <div className="max-w-5xl my-auto flex-1 flex flex-col justify-center pb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight max-w-5xl leading-tight mb-4">
            {renderStaggeredWords("Design isn't just visual—it's how human intent connects with digital logic.")}
          </h1>
          <p className="slide-paragraph opacity-0 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light max-w-xl">
            Scroll to explore my methodology and how I bridge aesthetic precision with engineering reality.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <span>01 / METHOD</span>
          <span className="animate-bounce">↓ Scroll to start</span>
        </div>
      </section>

      {/* SLIDE 2 - Systems Thinking */}
      <section 
        ref={el => { slideRefs.current[1] = el; }}
        className="h-screen w-full snap-start snap-always flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-24 pb-12 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/80"
      >
        <div>
          <span className="slide-badge opacity-0 inline-block text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm">
            01. SYSTEMS THINKING
          </span>
        </div>

        <div className="max-w-3xl my-auto flex-1 flex flex-col justify-center pb-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4">
            {renderStaggeredWords("Deconstructing Complexity")}
          </h2>
          <p className="slide-paragraph opacity-0 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Every great digital product begins with a robust foundation. I design comprehensive, modular UI Design Systems that ensure visual coherence, scalable architecture, and seamless consistency from the most fundamental tokens to complex layouts.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <span>ARCHITECTURE & TOKENS</span>
          <span>02 / 06</span>
        </div>
      </section>

      {/* SLIDE 3 - Craftsmanship */}
      <section 
        ref={el => { slideRefs.current[2] = el; }}
        className="h-screen w-full snap-start snap-always flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-24 pb-12 relative overflow-hidden"
      >
        <div>
          <span className="slide-badge opacity-0 inline-block text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm">
            02. CRAFTSMANSHIP
          </span>
        </div>

        <div className="max-w-3xl my-auto flex-1 flex flex-col justify-center pb-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4">
            {renderStaggeredWords("Obsession Over Detail")}
          </h2>
          <p className="slide-paragraph opacity-0 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Precision in grid structures, meticulous spacing rules, and deliberate micro-interactions. I believe true luxury in digital design lies in the invisible details—how a transition feels, how typography breathes, and how the interface respects user focus.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <span>GRID & MICRO-INTERACTIONS</span>
          <span>03 / 06</span>
        </div>
      </section>

      {/* SLIDE 4 - Engineering Bridge */}
      <section 
        ref={el => { slideRefs.current[3] = el; }}
        className="h-screen w-full snap-start snap-always flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-24 pb-12 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/80"
      >
        <div>
          <span className="slide-badge opacity-0 inline-block text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm">
            03. DEVELOPER-READY
          </span>
        </div>

        <div className="max-w-3xl my-auto flex-1 flex flex-col justify-center pb-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4">
            {renderStaggeredWords("Bridging Code & Pixel")}
          </h2>
          <p className="slide-paragraph opacity-0 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            With a deep background in Software Engineering, I don&apos;t just design in isolation. Every component I build is optimized for developer handoff, conscious of frontend constraints, state management, and component reusability in React/Tailwind ecosystems.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <span>DESIGN-TO-CODE SYNERGY</span>
          <span>04 / 06</span>
        </div>
      </section>

      {/* SLIDE 5 - Continuous Iteration */}
      <section 
        ref={el => { slideRefs.current[4] = el; }}
        className="h-screen w-full snap-start snap-always flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-24 pb-12 relative overflow-hidden"
      >
        <div>
          <span className="slide-badge opacity-0 inline-block text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm">
            04. REFINEMENT
          </span>
        </div>

        <div className="max-w-3xl my-auto flex-1 flex flex-col justify-center pb-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4">
            {renderStaggeredWords("The Iteration Loop")}
          </h2>
          <p className="slide-paragraph opacity-0 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Design is never truly finished. Through rigorous prototyping, user testing, and data feedback loops, I continuously refine experiences to eliminate friction and elevate user delight.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <span>FEEDBACK & TESTING</span>
          <span>05 / 06</span>
        </div>
      </section>

      {/* SLIDE 6 - The Final Push (CTA) */}
      <section 
        ref={el => { slideRefs.current[5] = el; }}
        className="h-screen w-full snap-start snap-always flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-24 pb-12 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/80 text-center"
      >
        <div>
          <span className="slide-badge opacity-0 inline-block text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full shadow-sm">
            05. COLLABORATION
          </span>
        </div>

        <div className="max-w-4xl mx-auto my-auto flex-1 flex flex-col justify-center pb-6">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-4 leading-tight">
            {renderStaggeredWords("Ready to build something impactful?")}
          </h2>
          <p className="slide-paragraph opacity-0 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light mb-8 max-w-xl mx-auto">
            Let&apos;s combine rigorous design thinking and technical execution to bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="group flex items-center gap-2 bg-black text-white dark:bg-white dark:text-zinc-950 px-8 py-4 rounded-full font-medium text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <EnvelopeSimple size={20} weight="bold" />
              Let&apos;s Talk
              <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              href="/"
              className="px-8 py-4 rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-all font-medium text-base"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <span>06 / FIN</span>
          <span>YAHYA ADITYA © {new Date().getFullYear()}</span>
        </div>
      </section>
    </div>
  );
}
