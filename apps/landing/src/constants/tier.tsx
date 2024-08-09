export type Tier = {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  features: string[];
  featured: boolean;
  cta: string;
  onClick: () => void;
};

export const tiers: Tier[] = [

  {
    name: "Starter",
    id: "tier-starter",
    href: "#",
    priceMonthly: "$0/mo",
    priceYearly: "$0/yr",
    description: "Good option for a small hub",
    features: [
      "50 members",
      "Access to AI queries",
      "Integrated video calls",
      "Customization options",
      "Basic analytics",
      'Basic "Rich Text" editor',
      "Community support",
    ],
    featured: false,
    cta: "Get started",
    onClick: () => {
      window.location.href = "https://app.simbo.casa"
    },
  },
  {
    name: "Professional",
    id: "tier-professional",
    href: "#",
    priceMonthly: "$10/mo",
    priceYearly: "$90/yr",
    description: "Ideal small to mid range organizations.",
    features: [
      "Everything in Starter, plus",
      "300 members",
      "Advanced Analytics",
      'AI-powered "Rich Text" editor',
      "AI assistant",
      "Email support within 12 hours",
    ],
    featured: true,
    cta: "Buy Now",
    onClick: () => {
      window.location.href = "https://app.simbo.casa"
    },
  },

  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "Contact Us",
    priceYearly: "Contact Us",
    description: "If you need the best of the best.",
    features: [
      "Everything in professional, plus",
      "Unlimited members",
      "24/7 support",
      "Custom domain",
      "Custom integrations",
      "Custom analytics",

    ],
    featured: false,
    cta: "Contact Us",
    onClick: () => {
      window.location.href = "https://simbo.casa/contact"
    },
  },
];
