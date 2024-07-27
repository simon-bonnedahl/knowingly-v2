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
      "50 user seats",
      "Access to AI queries",
      "Integrated video calls",
      "Customization options",
      "Basic analytics",
      "Basic WYSIWYG editor",
      "Community support",
    ],
    featured: false,
    cta: "Get started",
    onClick: () => {},
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
      "500 user seats",
      "Advanced Analytics",
      "AI-powered WYSIWYG editor",
      "AI assistant",
      "Email support within 12 hours",
    ],
    featured: true,
    cta: "Buy Now",
    onClick: () => {},
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
      "Unlimited user seats",
      "24/7 support",
      "Custom domain",
      "Custom integrations",
      "Custom analytics",

    ],
    featured: false,
    cta: "Contact Us",
    onClick: () => {},
  },
];
