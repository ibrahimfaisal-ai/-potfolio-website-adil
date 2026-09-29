export interface ServiceTheme {
  bg: string;
  text: string;
  accent: string;
  tagStyle?: string;
}

export interface ServiceItem {
  isIntro?: boolean;
  /** Service name, rendered as the panel's display heading. */
  name?: string;
  /** Formats delivered under this service, shown as the accent line. */
  deliverables?: string;
  /** One-word watermark behind the panel. */
  watermark?: string;
  description?: string;
  /** Discipline pill above the heading. */
  tag?: string;
  theme: ServiceTheme;
}

export const servicesData: ServiceItem[] = [
  {
    isIntro: true,
    theme: { bg: "bg-[#FAFAFA]", text: "text-[#111111]", accent: "text-[#32A3E6]" }
  },
  {
    name: "AI UGC Ads",
    watermark: "UGC",
    deliverables: "META · TIKTOK · INSTAGRAM · REELS",
    description:
      "Creator-style ads that look and feel like real footage: talking-head testimonials, unboxings, try-ons and day-in-the-life routines, made with Seedance and built to win the first three seconds of the feed.",
    tag: "SOCIAL & PAID ADS",
    theme: { bg: "bg-[#111111]", text: "text-[#FAFAFA]", accent: "text-[#32A3E6]", tagStyle: "bg-[#32A3E6]/10 border-[#32A3E6]/30 text-[#32A3E6]" }
  },
  {
    name: "AI Commercials",
    watermark: "COMMERCIAL",
    deliverables: "BRAND SPOTS · LIFESTYLE · CAMPAIGNS",
    description:
      "High-production commercials without a crew, a location or a shoot day. Lifestyle scenes, city and street spots, and product hero moments with a cinematic finish, at a fraction of the cost of a traditional shoot.",
    tag: "CINEMATIC & BRAND",
    theme: { bg: "bg-[#FAFAFA]", text: "text-[#111111]", accent: "text-[#32A3E6]", tagStyle: "bg-[#32A3E6]/10 border-[#32A3E6]/30 text-[#32A3E6]" }
  },
  {
    name: "Product Campaigns",
    watermark: "CAMPAIGN",
    deliverables: "E-COMMERCE · VARIANTS · A/B HOOKS",
    description:
      "One product photo in, a full campaign out: multiple scenes, angles and hooks for the same product, so e-commerce brands can test creative at volume without booking a new shoot every time.",
    tag: "E-COMMERCE",
    theme: { bg: "bg-[#32A3E6]", text: "text-[#111111]", accent: "text-[#111111]", tagStyle: "bg-[#111111]/10 border-[#111111]/20 text-[#111111]" }
  },
  {
    name: "Psychology-Led Creative",
    watermark: "PSYCHOLOGY",
    deliverables: "HOOKS · SCRIPTS · BUYER TRIGGERS",
    description:
      "Hooks, scripts and angles built on how buyers actually decide: social proof, curiosity, desire and trust. Backed by a Master's degree in Psychology, so every ad has a reason to convert, not just a look.",
    tag: "STRATEGY",
    theme: { bg: "bg-[#111111]", text: "text-[#FAFAFA]", accent: "text-[#32A3E6]", tagStyle: "bg-[#32A3E6]/10 border-[#32A3E6]/30 text-[#32A3E6]" }
  },
];
