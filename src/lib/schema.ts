export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Obsidian Studioz",
  url: "https://obsidianstudioz.vercel.app",
  logo: "https://obsidianstudioz.vercel.app/logo.svg",
  description:
    "Obsidian Studioz is a premier digital design studio crafting extraordinary web experiences, apps, and digital masterpieces with precision and artistry.",
  foundingDate: "2024",
  contactPoint: [
    {
      "@type": "ContactPoint",
      name: "Contact Us",
      telephone: "+91-78629-08941",
      contactType: "Sales",
      email: "studioz.obsidian@gmail.com",
      areaServed: "IN",
      availableLanguage: "en",
    },
  ],
  sameAs: [
    "https://instagram.com/obsidianstudioz",
    "https://threads.net/@obsidianstudioz",
    "https://www.facebook.com/people/Studioz-Obsidian/pfbid022J4mGKLP9HCBNFArDWW4X15iKtPCFbBXvRGeJbRa4fV85ZynyzvxTim8GrqRrgxSl/",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  service: [
    {
      "@type": "Service",
      name: "Web Development",
      description: "Custom web applications and websites",
    },
    {
      "@type": "Service",
      name: "App Development",
      description: "Mobile and web app development",
    },
    {
      "@type": "Service",
      name: "UI/UX Design",
      description: "User interface and experience design",
    },
    {
      "@type": "Service",
      name: "Logo Design",
      description: "Brand identity and logo creation",
    },
    {
      "@type": "Service",
      name: "Video Editing",
      description: "Professional video editing services",
    },
    {
      "@type": "Service",
      name: "Social Media Management",
      description: "Social media content and management",
    },
  ],
} as const;
