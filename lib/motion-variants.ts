import { Variants } from "framer-motion";

// Fade in from below — default entrance for cards, sections
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Fade in without movement — for overlays, text swaps
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

// Slide from right — for forward navigation (next module, next step)
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// Stagger container — wraps children that each use fadeInUp
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Scale up from center — for celebration moments
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// Hover/tap gestures for interactive cards
export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: { duration: 0.2, ease: "easeOut" as const },
};

export const cardTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};
