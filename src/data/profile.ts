/**
 * Single source for identity and contact details used across the site.
 *
 * Contact fields are left empty until real values are supplied: a link or
 * email that is blank simply isn't rendered, and the contact form falls back
 * to a mailto: draft when EmailJS isn't configured.
 */
export const profile = {
  name: "Muhammad Adil",
  headline: "AI Commercials Expert | Seedance Video Ads",
  location: "Sialkot, Pakistan",
  tagline: "Most AI ads look fake. Mine don't.",
  bio:
    "I create high-production, scroll-stopping UGC-style video ads and AI commercials using Seedance — content that looks and feels like real creator footage, without the cost of a traditional shoot. I help e-commerce brands get ad creative that converts on Meta, TikTok, and Instagram.",
  education: "Master's degree in Psychology",

  email: "",
  links: {
    linkedin: "",
  },
  emailjs: {
    serviceId: "",
    templateId: "",
    publicKey: "",
  },
};

export const socialLinks = [
  { label: "LinkedIn", href: profile.links.linkedin },
].filter((link) => link.href);
