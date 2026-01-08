"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useSpring } from "motion/react";
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";
import { type IconType } from "react-icons";

const footerLinks = {
  services: [
    { name: "Web Development", href: "/services" },
    { name: "App Development", href: "/services" },
    { name: "Video Editing", href: "/services" },
    { name: "Logo Designing", href: "/services" },
  ],
  company: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ],
  connect: [
    { name: "Instagram", href: "https://instagram.com/obsidianstudioz" },
    { name: "Threads", href: "https://threads.net/@obsidianstudioz" },
    {
      name: "Facebook",
      href: "https://www.facebook.com/people/Studioz-Obsidian/pfbid022J4mGKLP9HCBNFArDWW4X15iKtPCFbBXvRGeJbRa4fV85ZynyzvxTim8GrqRrgxSl/",
    },
    { name: "WhatsApp", href: "https://wa.me/917862908941" },
  ],
};

const socialLinks: { name: string; href: string; icon: IconType }[] = [
  {
    name: "Instagram",
    href: "https://instagram.com/obsidianstudioz",
    icon: FaInstagram,
  },
  {
    name: "Threads",
    href: "https://threads.net/@obsidianstudioz",
    icon: BsThreads,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Studioz-Obsidian/pfbid022J4mGKLP9HCBNFArDWW4X15iKtPCFbBXvRGeJbRa4fV85ZynyzvxTim8GrqRrgxSl/",
    icon: FaFacebookF,
  },
  { name: "WhatsApp", href: "https://wa.me/917862908941", icon: FaWhatsapp },
];

// Magnetic link for footer
function MagneticFooterLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 400, damping: 25 });
  const y = useSpring(0, { stiffness: 400, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
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
      className="group relative inline-block text-zinc-400 transition-colors hover:text-orange-400"
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <span>{children}</span>
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-orange-400"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden bg-zinc-950 pt-20 pb-40">
      {/* Top gradient line */}
      <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Main footer content */}
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/">
              <motion.div
                className="mb-6 inline-flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image 
                  src="/logo.svg" 
                  alt="Obsidian Studioz" 
                  width={48}
                  height={48}
                  className="h-12 w-auto transition-transform hover:scale-110"
                />
              </motion.div>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-zinc-500">
              Crafting digital masterpieces that transcend the ordinary.
              Precision is not just our craft, it&apos;s our legacy.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-zinc-300 uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <MagneticFooterLink href={link.href}>
                    {link.name}
                  </MagneticFooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-zinc-300 uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <MagneticFooterLink href={link.href}>
                    {link.name}
                  </MagneticFooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-zinc-300 uppercase">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 transition-colors hover:text-orange-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a
                href="mailto:studioz.obsidian@gmail.com"
                className="block text-sm text-zinc-400 transition-colors hover:text-orange-400"
              >
                📧 studioz.obsidian@gmail.com
              </a>
              <a
                href="tel:+917862908941"
                className="block text-sm text-zinc-400 transition-colors hover:text-orange-400"
              >
                📞 +91 78629 08941
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        {/* <div className="border-t border-zinc-800/50 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-zinc-500">
              © {currentYear} Obsidian Studioz. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href="#" className="transition-colors hover:text-zinc-300">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-zinc-300">
                Terms of Service
              </a>
              <a href="#" className="transition-colors hover:text-zinc-300">
                Cookies
              </a>
            </div>
          </div>
        </div> */}
      </div>

      {/* Large background text */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 overflow-hidden">
        <motion.div
          className="font-title translate-y-1/3 text-center text-[12vw] leading-none font-extralight text-zinc-400/10 uppercase"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Obsidian
        </motion.div>
      </div>
    </footer>
  );
}
