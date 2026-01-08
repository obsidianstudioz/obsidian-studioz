"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useSpring,
} from "motion/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  // { name: "About", href: "#about" },
  { name: "Contact", href: "/contact" },
];

// Magnetic link component with smooth hover effect
function MagneticLink({
  children,
  href,
  index,
}: {
  children: React.ReactNode;
  href: string;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className="group relative px-2 py-2 text-xs font-medium text-zinc-400 transition-colors hover:text-orange-400 lg:px-4 lg:text-sm"
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index + 0.3, duration: 0.5, ease: "easeOut" }}
    >
      <span className="relative z-10">{children}</span>

      {/* Hover underline */}
      <motion.span
        className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-orange-400 to-orange-600"
        initial={{ width: 0, x: "-50%" }}
        animate={{
          width: isHovered ? "80%" : 0,
          x: "-50%",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Glow effect */}
      <motion.span
        className="absolute inset-0 -z-10 rounded-lg bg-orange-500/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
}

// Animated hamburger icon - simplified
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative h-4 w-5 sm:h-5 sm:w-6">
      <motion.span
        className="absolute left-0 h-0.5 w-full bg-zinc-300"
        animate={{
          top: isOpen ? "50%" : "0%",
          rotate: isOpen ? 45 : 0,
          translateY: isOpen ? "-50%" : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-zinc-300"
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute left-0 h-0.5 w-full bg-zinc-300"
        animate={{
          bottom: isOpen ? "50%" : "0%",
          rotate: isOpen ? -45 : 0,
          translateY: isOpen ? "50%" : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

// Mobile menu overlay - simplified for mobile
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-950/98 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Simple decorative glow */}
          <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-3xl" />

          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="text-2xl font-light text-zinc-200 active:text-orange-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                }}
              >
                {link.name}
              </motion.a>
            ))}

            {/* CTA in mobile menu */}
            <motion.a
              href="#contact"
              onClick={onClose}
              className="mt-4 rounded-full border border-orange-500/50 bg-orange-500/10 px-6 py-2.5 text-base font-medium text-orange-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Get in Touch
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50 px-3 sm:px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.nav
          className="mx-auto flex items-center justify-between border"
          animate={{
            maxWidth: isScrolled ? "64rem" : "100%",
            marginTop: isScrolled ? "0.75rem" : "0rem",
            borderRadius: isScrolled ? "0.75rem" : "0rem",
            paddingLeft: isScrolled ? "1rem" : "0.75rem",
            paddingRight: isScrolled ? "1rem" : "0.75rem",
            paddingTop: isScrolled ? "0.5rem" : "0.75rem",
            paddingBottom: isScrolled ? "0.5rem" : "0.75rem",
            backgroundColor: isScrolled
              ? "rgba(9, 9, 11, 0.9)"
              : "rgba(9, 9, 11, 0.7)",
            borderColor: isScrolled
              ? "rgba(251, 146, 60, 0.15)"
              : "rgba(63, 63, 70, 0.15)",
            backdropFilter: "blur(16px)",
            boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="Obsidian Studioz" 
              width={36}
              height={36}
              className="h-7 w-auto sm:h-9 transition-transform hover:scale-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-0.5 md:flex lg:gap-1">
            {navLinks.map((link, index) => (
              <MagneticLink key={link.name} href={link.href} index={index}>
                {link.name}
              </MagneticLink>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-xs font-medium text-zinc-950 md:block lg:px-6 lg:py-2.5 lg:text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative">Let&apos;s Talk</span>
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            className="relative z-50 flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700/50 bg-zinc-900/80 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
