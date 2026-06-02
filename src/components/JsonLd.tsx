import { SERVICE_PILLARS } from "@/lib/data";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hone Studio",
  url: "https://honestudio.cv",
  logo: "https://honestudio.cv/logo.svg",
  description:
    "Custom software, AI tools, and web development for founders and small teams, built by one developer.",
  founder: {
    "@type": "Person",
    name: "Niell Alfajora",
    jobTitle: "Founder & Developer",
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
  serviceType: "Custom Software, AI Tools, and Web Development",
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
      name: "What does Hone Studio build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mostly custom software: internal tools, AI pipelines, and web apps built with Next.js, Firebase, and Gemini for teams that don't have a developer to spare. Hone Studio also builds websites on Kajabi, Shopify, Squarespace, Webflow, and custom stacks, and plans every project with competitive research and a clear scope first.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Hone Studio different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Niell is a developer who thinks like an operator because he is one. He works out what a business actually needs built before opening a code editor, then handles the strategy, design, and code himself, so nothing gets lost between brief and ship.",
      },
    },
    {
      "@type": "Question",
      name: "Who does Hone Studio work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Founders and lean teams who need custom tools or a web app without a technical co-founder, small businesses whose tools don't talk to each other, and agencies that need a reliable white-label technical execution partner.",
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
