/**
 * SEO Configuration for Obsidian Studioz
 * Contains common SEO settings and utilities
 */

export const SEO_CONFIG = {
  // Site configuration
  site: {
    name: "Obsidian Studioz",
    url: "https://obsidianstudioz.vercel.app",
    description:
      "Obsidian Studioz is a premier digital design studio crafting extraordinary web experiences, apps, and digital masterpieces with precision and artistry.",
    locale: "en_US",
    defaultImage: "https://obsidianstudioz.vercel.app/og-image.png",
  },

  // Social media links
  social: {
    instagram: "https://instagram.com/obsidianstudioz",
    threads: "https://threads.net/@obsidianstudioz",
    facebook:
      "https://www.facebook.com/people/Studioz-Obsidian/pfbid022J4mGKLP9HCBNFArDWW4X15iKtPCFbBXvRGeJbRa4fV85ZynyzvxTim8GrqRrgxSl/",
  },

  // Contact information
  contact: {
    email: "studioz.obsidian@gmail.com",
    phone: "+91-78629-08941",
    whatsapp: "https://wa.me/917862908941",
  },

  // Pages metadata
  pages: {
    home: {
      title: "Obsidian Studioz | Web Design & Digital Studio",
      description:
        "Obsidian Studioz is a premier digital design studio crafting extraordinary web experiences, apps, and digital masterpieces with precision and artistry.",
      keywords: [
        "web design",
        "digital studio",
        "UI/UX design",
        "web development",
        "app development",
        "logo design",
        "branding",
      ],
    },
    services: {
      title: "Our Services | Obsidian Studioz",
      description:
        "Explore our comprehensive digital services including web development, app development, UI/UX design, video editing, logo design, and social media management.",
      keywords: [
        "web development",
        "app development",
        "UI/UX design",
        "video editing",
        "logo design",
        "social media management",
      ],
    },
    contact: {
      title: "Contact Us | Obsidian Studioz",
      description:
        "Get in touch with Obsidian Studioz. Reach out via email, phone, WhatsApp, or social media. We're ready to discuss your next project.",
      keywords: ["contact", "email", "phone", "WhatsApp", "inquiry"],
    },
  },

  // JSON-LD structured data
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Obsidian Studioz",
      url: "https://obsidianstudioz.vercel.app",
      logo: "https://obsidianstudioz.vercel.app/logo.svg",
      description:
        "A premier digital design studio crafting extraordinary web experiences",
      foundingDate: "2024",
      contactPoint: {
        "@type": "ContactPoint",
        name: "Contact Us",
        telephone: "+91-78629-08941",
        contactType: "Sales",
        email: "studioz.obsidian@gmail.com",
      },
      sameAs: [
        "https://instagram.com/obsidianstudioz",
        "https://threads.net/@obsidianstudioz",
        "https://www.facebook.com/people/Studioz-Obsidian/pfbid022J4mGKLP9HCBNFArDWW4X15iKtPCFbBXvRGeJbRa4fV85ZynyzvxTim8GrqRrgxSl/",
      ],
    },
  },
};

/**
 * Generate Open Graph meta tags
 */
export function generateOGTags(
  title: string,
  description: string,
  url: string,
  image?: string,
) {
  return {
    title,
    description,
    url,
    image: image ?? SEO_CONFIG.site.defaultImage,
    type: "website",
  };
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterTags(title: string, description: string) {
  return {
    card: "summary_large_image",
    title,
    description,
    image: SEO_CONFIG.site.defaultImage,
  };
}

/**
 * Generate canonical URL
 */
export function generateCanonicalURL(path: string): string {
  return `${SEO_CONFIG.site.url}${path}`;
}
