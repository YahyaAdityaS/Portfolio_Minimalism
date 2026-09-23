"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [variant, setVariant] = useState("default");
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfigInner = { stiffness: 1000, damping: 40 };
  const springConfigOuter = { stiffness: 350, damping: 25 };

  const cursorXSpringInner = useSpring(cursorX, springConfigInner);
  const cursorYSpringInner = useSpring(cursorY, springConfigInner);
  const cursorXSpringOuter = useSpring(cursorX, springConfigOuter);
  const cursorYSpringOuter = useSpring(cursorY, springConfigOuter);

  // Safely check desktop device without synchronous setState warning
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const frame = requestAnimationFrame(() => {
      setIsDesktop(mediaQuery.matches);
    });

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Handle mouse movements and hover states
  useEffect(() => {
    if (!isDesktop) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, [role='button']")) setVariant("button");
      else if (target.closest(".card") || target.tagName === "IMG") setVariant("card");
      else setVariant("default");
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  const variants = {
    default: { scale: 1 },
    button: { scale: 1.25 },
    card: { scale: 1.3 },
  };

  return (
    <div className="pointer-events-none z-[9999] fixed inset-0">
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100 -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorXSpringInner, y: cursorYSpringInner }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-zinc-900/80 dark:border-zinc-100/80 -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorXSpringOuter, y: cursorYSpringOuter }}
        animate={{
          ...variants[variant as keyof typeof variants],
          scale: isClicking ? 0.8 : variants[variant as keyof typeof variants].scale,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </div>
  );
}
