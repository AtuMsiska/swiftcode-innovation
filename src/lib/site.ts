/**
 * Central site configuration — single source of truth for brand, nav,
 * company info, services and case studies. Keeps content out of components.
 */

export const site = {
  name: "SwiftCode Innovation",
  legalName: "SwiftCode Innovation (Pty) Ltd",
  domain: "swiftcode.co.za",
  url: "https://swiftcode.co.za",
  tagline: "Where Technology Meets Innovation.",
  description:
    "SwiftCode Innovation is a South African technology company that researches real-world challenges before engineering innovative digital products and enterprise software solutions that shape the future.",
  founded: "2024",
  email: "admin@swiftcode.co.za",
  emailIt: "it@swiftcode.co.za",
  phone: "+27 74 832 8272",
  address: {
    street: "33 Rolls Royce Street",
    suburb: "Impala Park",
    city: "Boksburg",
    province: "Gauteng",
    postalCode: "1459",
    country: "South Africa",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/swiftcode-innovation",
    github: "https://github.com/swiftcode-innovation",
    whatsapp: "https://wa.me/27748328272",
  },
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Innovation Lab", href: "/innovation-lab" },
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
] as const;

export const footerNav = {
  "Quick Links": [
    { label: "Innovation Lab", href: "/innovation-lab" },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
  ],
  Resources: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "PAIA Manual", href: "/paia" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;

/* ---------- Leadership & directors ---------- */
export const leadership = [
  { name: "Atusaye Msiska", role: "Chief Executive Officer", initials: "AM", email: "admin@swiftcode.co.za" },
  { name: "Tumelo Mohlala", role: "Chief Operating Officer", initials: "TM" },
  { name: "Emmanuel Mhlaba", role: "Chief Technology Officer", initials: "EM", email: "it@swiftcode.co.za" },
] as const;

// Every member of the company is a Director (no non-executive directors).
export const directors = [
  { name: "Atusaye Msiska", initials: "AM" },
  { name: "Tumelo Mohlala", initials: "TM" },
  { name: "Emmanuel Mhlaba", initials: "EM" },
  { name: "Mphiwe Ntuli", initials: "MN" },
  { name: "Zamani Msimango", initials: "ZM" },
  { name: "Musa Macheke", initials: "MM" },
] as const;

/* ---------- Services ---------- */
export type Service = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  icon: string; // lucide-react icon name
};

export const services: Service[] = [
  {
    slug: "digital-product-development",
    title: "Digital Product Development",
    summary: "Building scalable web, mobile and enterprise software that people rely on every day.",
    points: ["Web applications", "Mobile apps", "Enterprise platforms", "APIs & integrations"],
    icon: "Rocket",
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence Solutions",
    summary: "Business automation, AI assistants and machine learning that create a defensible edge.",
    points: ["Business automation", "AI assistants", "Machine learning", "Generative AI"],
    icon: "BrainCircuit",
  },
  {
    slug: "software-engineering",
    title: "Software Engineering",
    summary: "Enterprise systems engineered to be reliable, observable and maintainable at scale.",
    points: ["ERP", "CRM", "Portals", "Platforms"],
    icon: "Code2",
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    summary: "Cloud architecture and DevOps across the major providers, built for resilience.",
    points: ["Microsoft Azure", "AWS", "Google Cloud", "DevOps & CI/CD"],
    icon: "CloudCog",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    summary: "Human-centred digital experiences grounded in research and a scalable design system.",
    points: ["Product design", "Design systems", "Prototyping", "Usability research"],
    icon: "PenTool",
  },
  {
    slug: "technology-strategy",
    title: "Technology Strategy",
    summary: "Digital transformation, innovation consulting and R&D to move organisations forward.",
    points: ["Digital transformation", "Innovation consulting", "Research & development"],
    icon: "Compass",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    summary: "Infrastructure, network and cloud security with audits that harden your posture.",
    points: ["Network security", "Cloud security", "Security audits", "Infrastructure"],
    icon: "ShieldCheck",
  },
];

/* ---------- Projects / case studies ---------- */
export type Project = {
  slug: string;
  name: string;
  industry: string;
  type: string;
  summary: string;
  services: string[];
  tech: string[];
  url?: string;
  urlStatus?: "live" | "soon";
  challenge?: string;
  solution?: string;
  outcome?: string;
  logo?: string; // path under /public, e.g. /logos/aiducate.png
  flagship?: boolean;
};

export const projects: Project[] = [
  {
    slug: "aiducate",
    name: "AIDucate",
    industry: "Education · Social Impact",
    type: "Flagship Innovation",
    summary:
      "A USSD-powered intelligent information platform that bridges the digital divide — delivering accessible search, education and information services to any mobile phone, no smartphone or data required. Built for underserved communities across Africa.",
    services: ["Product research", "USSD engineering", "AI/search", "Platform architecture"],
    tech: ["Python", "Node.js", "PostgreSQL", "OpenAI", "USSD Gateway"],
    challenge:
      "Millions across Africa rely on basic feature phones with no smartphone and little or no data — locking them out of digital information and education.",
    solution:
      "We researched the real barriers, then engineered a USSD platform that delivers search, education and essential information on any mobile phone — no app, no data.",
    outcome:
      "A fully developed, genuinely inclusive platform now preparing for launch, with a clear path to reach communities across the continent.",
    logo: "/logos/aiducate.png",
    flagship: true,
  },
  {
    slug: "tectarch",
    name: "TectArch (Pty) Ltd",
    industry: "Architecture",
    type: "Corporate Website",
    summary:
      "A corporate website and brand positioning platform for an architecture practice — responsive, fast and built to convert.",
    services: ["UX design", "Web development", "SEO", "Brand positioning"],
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    url: "https://www.tectarch.co.za",
    urlStatus: "live",
    challenge:
      "A respected architecture practice needed a digital presence that matched the quality of their built work and positioned them for larger commissions.",
    solution:
      "We delivered a fast, responsive corporate website with considered UX, strong brand positioning and SEO foundations to grow on.",
    outcome:
      "A polished, high-performance presence that reflects the practice's craft and converts visitors into enquiries.",
    logo: "/logos/tectarch.png",
  },
  {
    slug: "mute-it",
    name: "Mute IT (Pty) Ltd",
    industry: "Technology",
    type: "Corporate Website",
    summary:
      "A corporate website and product showcase with responsive design and business branding for a technology company.",
    services: ["Web development", "Product showcase", "Responsive design", "Branding"],
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    url: "https://muteit.co.za",
    urlStatus: "soon",
    challenge:
      "A growing technology company needed a credible online presence to showcase its products and services.",
    solution:
      "We built a responsive corporate website and product showcase with clean branding and a clear information architecture.",
    outcome:
      "A professional presence ready to support the company's growth as it prepares to go live.",
    logo: "/logos/mute-it.png",
  },
];

/* ---------- Technology stack ---------- */
export const techStack = [
  "React", "Next.js", "TypeScript", "Python", "Flutter", "Node.js",
  "Docker", "Azure", "AWS", "Google Cloud", "OpenAI", "TensorFlow",
  "PostgreSQL", "Redis", "Supabase", "TailwindCSS",
];

/* ---------- Innovation process (research-first) ---------- */
export const processSteps = [
  { title: "Research", body: "We study the real-world problem, its people and its market — deeply, before anything is built." },
  { title: "Validation", body: "We test assumptions early, proving the problem is worth solving and the direction is right." },
  { title: "Innovation", body: "We invent the solution — designing technology that doesn't yet exist for the challenge at hand." },
  { title: "Engineering", body: "Cross-functional squads build production-grade software with craft and reliability." },
  { title: "Launch", body: "We release with confidence — instrumented, monitored and ready for real-world load." },
  { title: "Scale", body: "We measure, harden and evolve the product as it grows across the continent." },
];

/* ---------- Industries ---------- */
export const industries = [
  { name: "Architecture", icon: "DraftingCompass" },
  { name: "Construction", icon: "HardHat" },
  { name: "Government", icon: "Landmark" },
  { name: "Education", icon: "GraduationCap" },
  { name: "Healthcare", icon: "HeartPulse" },
  { name: "Retail", icon: "ShoppingBag" },
  { name: "Finance", icon: "Banknote" },
  { name: "Manufacturing", icon: "Factory" },
  { name: "Agriculture", icon: "Sprout" },
  { name: "Mining", icon: "Pickaxe" },
];

/* ---------- Company statistics ---------- */
export const stats = [
  { value: 6, suffix: "+", label: "Innovation projects" },
  { value: 10, suffix: "+", label: "Products researched" },
  { value: 3, suffix: "", label: "Software solutions delivered" },
  { value: 16, suffix: "", label: "Technologies in our stack" },
  { value: 25, suffix: "+", label: "Years of combined experience" },
  { value: 5, suffix: "+", label: "Countries targeted" },
];

/* ---------- FAQ (also powers FAQ schema) ---------- */
export const faqs = [
  {
    q: "What makes SwiftCode Innovation different from a software agency?",
    a: "We're an innovation company, not an agency. We research real-world problems and their markets before engineering solutions — technology comes second to understanding the challenge.",
  },
  {
    q: "What is AIDucate?",
    a: "AIDucate is our flagship innovation: a USSD-powered platform that delivers search, education and information to any mobile phone — no smartphone or data required. It's fully developed and preparing for launch.",
  },
  {
    q: "Where are you based?",
    a: "We're headquartered in Boksburg, Gauteng, South Africa, and work with organisations across the country and the continent.",
  },
  {
    q: "What technologies do you build with?",
    a: "Our stack spans React, Next.js, TypeScript, Python, Flutter, Node.js, cloud platforms (Azure, AWS, Google Cloud), AI (OpenAI, TensorFlow) and modern data infrastructure.",
  },
];
