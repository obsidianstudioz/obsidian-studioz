"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { AutoAnimatedText } from "@/components/ui/animated-text";
import { useDeviceProfile } from "@/components/hooks";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";

const CONTACTS = [
  {
    icon: HiOutlineMail,
    label: "Email",
    value: "studioz.obsidian@gmail.com",
    href: "mailto:studioz.obsidian@gmail.com",
    description: "Drop us a line anytime",
    color: "from-red-500 to-orange-500",
    bgPattern:
      "radial-gradient(circle at 20% 80%, rgba(239,68,68,0.15) 0%, transparent 50%)",
  },
  {
    icon: HiOutlinePhone,
    label: "Phone",
    value: "+91 78629 08941",
    href: "tel:+917862908941",
    description: "Mon-Sat, 10AM-7PM IST",
    color: "from-green-500 to-emerald-500",
    bgPattern:
      "radial-gradient(circle at 80% 20%, rgba(34,197,94,0.15) 0%, transparent 50%)",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@obsidianstudioz",
    href: "https://instagram.com/obsidianstudioz",
    description: "See our latest work",
    color: "from-pink-500 via-purple-500 to-orange-500",
    bgPattern:
      "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.15) 0%, transparent 50%)",
  },
  {
    icon: BsThreads,
    label: "Threads",
    value: "@obsidianstudioz",
    href: "https://threads.net/@obsidianstudioz",
    description: "Join the conversation",
    color: "from-zinc-400 to-zinc-600",
    bgPattern:
      "radial-gradient(circle at 30% 70%, rgba(161,161,170,0.15) 0%, transparent 50%)",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+91 78629 08941",
    href: "https://wa.me/917862908941",
    description: "Quick replies guaranteed",
    color: "from-green-400 to-green-600",
    bgPattern:
      "radial-gradient(circle at 70% 30%, rgba(74,222,128,0.15) 0%, transparent 50%)",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
    value: "Studioz Obsidian",
    href: "https://www.facebook.com/people/Studioz-Obsidian/pfbid022J4mGKLP9HCBNFArDWW4X15iKtPCFbBXvRGeJbRa4fV85ZynyzvxTim8GrqRrgxSl/",
    description: "Follow our journey",
    color: "from-blue-500 to-blue-700",
    bgPattern:
      "radial-gradient(circle at 60% 40%, rgba(59,130,246,0.15) 0%, transparent 50%)",
  },
];

// Floating artistic shapes
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large rotating ring */}
      <motion.div
        className="absolute -top-20 -right-20 h-80 w-80 rounded-full border border-orange-500/20 md:-top-40 md:-right-40 md:h-[600px] md:w-[600px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -top-10 -right-10 h-60 w-60 rounded-full border border-dashed border-orange-400/10 md:-top-20 md:-right-20 md:h-[400px] md:w-[400px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-10 h-4 w-4 rounded-full bg-orange-500/60"
        animate={{ y: [0, -30, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-20 h-3 w-3 rounded-full bg-amber-400/50"
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 h-2 w-2 rounded-full bg-orange-300/40"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-orange-600/15 blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 h-[260px] w-[260px] rounded-full bg-amber-500/10 blur-3xl" />
    </div>
  );
}

// Artistic contact card with dramatic hover effects
function ContactCard({
  contact,
  index,
}: {
  contact: (typeof CONTACTS)[0];
  index: number;
}) {
  const Icon = contact.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.a
      href={contact.href}
      target={contact.href.startsWith("http") ? "_blank" : undefined}
      rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative h-56 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl transition-all duration-700 hover:border-white/30"
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.4 } }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: contact.bgPattern }}
      />

      {/* Diagonal stripe accent */}
      <div
        className={`absolute ${isEven ? "-top-20 -right-20" : "-bottom-20 -left-20"} h-40 w-40 rotate-45 bg-linear-to-r ${contact.color} opacity-5 transition-all duration-700 group-hover:scale-150 group-hover:opacity-20`}
      />

      {/* Content container */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        {/* Top section - Icon and label */}
        <div className="flex items-start justify-between">
          {/* Icon container with glow */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div
              className={`absolute inset-0 rounded-2xl bg-linear-to-br ${contact.color} opacity-20 blur-xl transition-all duration-500 group-hover:opacity-60 group-hover:blur-2xl`}
            />
            <div
              className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${contact.color}`}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
          </motion.div>

          {/* Animated arrow */}
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-500 group-hover:border-white/30 group-hover:text-white"
            whileHover={{ x: 5, rotate: -45 }}
          >
            <span className="text-lg">↗</span>
          </motion.div>
        </div>

        {/* Bottom section - Text content */}
        <div>
          <p className="mb-1 text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
            {contact.label}
          </p>
          <h3 className="mb-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-orange-400">
            {contact.value}
          </h3>
          <p className="text-sm text-white/50 transition-colors duration-300 group-hover:text-white/70">
            {contact.description}
          </p>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
    </motion.a>
  );
}

// Large artistic CTA section
function ArtisticCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ rotate, scale }}
      className="relative mx-auto mt-20 max-w-3xl overflow-hidden rounded-[2.5rem] border border-orange-500/30 bg-linear-to-br from-orange-500/10 via-zinc-900/80 to-amber-500/10 p-10 text-center backdrop-blur-xl md:mt-28 md:p-14"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 h-12 w-12 rounded-tl-3xl border-t-2 border-l-2 border-orange-500/50" />
      <div className="absolute top-0 right-0 h-12 w-12 rounded-tr-3xl border-t-2 border-r-2 border-orange-500/50" />
      <div className="absolute bottom-0 left-0 h-12 w-12 rounded-bl-3xl border-b-2 border-l-2 border-orange-500/50" />
      <div className="absolute right-0 bottom-0 h-12 w-12 rounded-br-3xl border-r-2 border-b-2 border-orange-500/50" />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-8 right-12 h-3 w-3 rounded-full bg-orange-500/60"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-12 left-10 h-2 w-2 rounded-full bg-amber-400/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />

      <motion.h3
        className="font-title mb-6 text-4xl font-bold text-white md:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ready to create
        <br />
        <span className="bg-linear-to-r from-orange-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
          something extraordinary
        </span>
        ?
      </motion.h3>
      <p className="mb-10 text-lg text-white/60">
        Let&apos;s turn your vision into reality. No project is too big or too
        small.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <motion.a
          href="mailto:studioz.obsidian@gmail.com"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-10 py-5 font-semibold text-black transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlineMail className="h-5 w-5" />
          <span>Send an Email</span>
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        </motion.a>
        <motion.a
          href="https://wa.me/917862908941"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border-2 border-green-500/50 px-10 py-5 font-semibold text-green-400 transition-all hover:border-green-400 hover:bg-green-500/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp className="h-5 w-5" />
          <span>WhatsApp Us</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const { isMobile } = useDeviceProfile();

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950">
      <FloatingShapes />

      <section className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
        {/* Hero Section - Artistic Typography */}
        <div className="mb-16 text-center md:mb-24">
          {/* Small label */}
          <motion.p
            className="mb-4 text-sm tracking-[0.3em] text-orange-400/70 uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.p>

          {/* Large title with split effect */}
          <div className="relative">
            <AutoAnimatedText
              className="font-title text-6xl font-extralight tracking-tight text-white sm:text-8xl md:text-[12rem]"
              text="HELLO"
            />
            {/* Underline accent */}
            <motion.div
              className="mx-auto mt-2 h-1 w-24 bg-linear-to-r from-orange-500 to-amber-500 md:mt-4 md:w-40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-6 max-w-lg text-lg text-white/60 md:mt-8 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We&apos;re always excited to collaborate on new projects.
            <br />
            <span className="text-orange-400">
              Let&apos;s build something amazing together.
            </span>
          </motion.p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACTS.map((contact, index) => (
            <ContactCard key={contact.label} contact={contact} index={index} />
          ))}
        </div>

        {/* Artistic CTA - only on desktop for performance */}
        {!isMobile && <ArtisticCTA />}

        {/* Mobile CTA - simpler version */}
        {isMobile && (
          <div className="mt-12 flex flex-col gap-4">
            <a
              href="mailto:studioz.obsidian@gmail.com"
              className="flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 px-6 py-5 font-semibold text-black"
            >
              <HiOutlineMail className="h-5 w-5" />
              Email Us
            </a>
            <a
              href="https://wa.me/917862908941"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl border-2 border-green-500/50 px-6 py-5 font-semibold text-green-400"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        )}

        {/* Bottom decorative text */}
        <motion.div
          className="mt-20 text-center md:mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-widest text-white/30 uppercase">
            Obsidian Studioz • Where Vision Meets Craft
          </p>
        </motion.div>
      </section>
    </main>
  );
}
