import { SERVICE_PILLARS } from "@/lib/data";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hone Studio",
  url: "https://honestudio.cv",
  logo: "https://honestudio.cv/logo.svg",
  description:
    "Fractional ops & tech partner — strategy, systems, and websites with zero overhead.",
  founder: {
    "@type": "Person",
    name: "Niell Alfajora",
    jobTitle: "Founder",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@honestudio.cv",
  },
  sameAs: [],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "Organization",
    name: "Hone Studio",
  },
  serviceType: "Fractional Operations & Technology Partner",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICE_PILLARS.map((pillar, index) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: pillar.title,
        description: pillar.description,
      },
      position: index + 1,
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Hone Studio offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hone Studio offers three integrated services: Web Design & Development (Kajabi, Shopify, Squarespace, Next.js, custom apps), AI & Automation (workflows, CRM, AI tools, email flows, chatbots), and Strategy & Research (market research, competitive intel, discovery, audits).",
      },
    },
    {
      "@type": "Question",
      name: "What makes Hone Studio different from an agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike agencies where you work with multiple people who rarely talk to each other, Hone Studio is one senior partner who handles strategy, systems, and websites together. This means faster decisions, tighter execution, and no miscommunication between departments.",
      },
    },
    {
      "@type": "Question",
      name: "Who does Hone Studio work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hone Studio works with founders, small businesses, and agencies who need ops and tech support without building a full team. Clients range from education businesses to VC firms to e-commerce brands.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by booking a discovery call through the contact page. We'll discuss what you're working on, identify where I can help, and map out a plan if it's a good fit.",
      },
    },
  ],
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
