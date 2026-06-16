export const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Objectives", href: "#objectives" },
  { label: "Features", href: "#features" },
  { label: "Why Choose", href: "#why-choose" },
  { label: "Discovery", href: "#discovery" },
  { label: "Join", href: "#cta" },
] as const;

export const HERO = {
  badge: "Government Knowledge Platform",
  headline: "Preserving Maharashtra\u2019s Knowledge Heritage for the Digital Age",
  subheadline:
    "A modern digital repository preserving Ambedkarite literature, constitutional studies, social justice archives and public knowledge resources for future generations.",
  primaryCta: "Request Walkthrough",
  secondaryCta: "Explore Platform",
  featuredCollections: [
    { title: "Ambedkar Writings", count: "2,450+ volumes" },
    { title: "Constitution Archives", count: "1,820+ documents" },
    { title: "Social Justice", count: "1,560+ resources" },
  ] as { title: string; count: string }[],
  recentPublications: [
    "Dr. Ambedkar's Vision of Social Democracy",
    "Constitutional Law in Modern India",
    "Caste, Class and Social Transformation",
    "Reservation Policy: A Comprehensive Review",
  ] as string[],
  repositoryCategories: [
    { title: "Ambedkar Literature", color: "navy" },
    { title: "Constitutional Studies", color: "gold" },
    { title: "Social Justice", color: "teal" },
    { title: "Research Papers", color: "navy" },
    { title: "Government Publications", color: "gold" },
    { title: "Archives", color: "teal" },
  ] as { title: string; color: string }[],
} as const;

export const CHALLENGES = {
  cards: [
    {
      title: "Operational Challenges",
      bullets: [
        "Manual cataloging with no centralized inventory",
        "Slow book discovery and search processes",
        "High risk of lost or misplaced books",
        "No automated issue and return workflows",
      ],
    },
    {
      title: "Reader Challenges",
      bullets: [
        "No digital engagement or online access",
        "Manual issue-return without borrowing history",
        "No way to check book availability remotely",
        "Limited access for researchers outside Pune",
      ],
    },
    {
      title: "Management Challenges",
      bullets: [
        "No analytics or operational reporting",
        "Difficult to track resource utilization",
        "No centralized digital archive",
        "Limited visibility into library performance",
      ],
    },
  ] as const,
};

export const OBJECTIVES = {
  vision: "To create Maharashtra's most comprehensive digital knowledge management platform for Ambedkarite literature, social justice studies, constitutional studies and public knowledge resources.",
  forBarti: [
    "Digitize complete library operations",
    "Maintain accurate inventory",
    "Generate management reports",
    "Track resource utilization",
  ],
  forReaders: [
    "Discover books & search resources easily",
    "Reserve books & track borrowing history",
    "Receive smart notifications",
    "Build personal reading profiles",
  ],
} as const;

export const FEATURES_HIGHLIGHT = {
  title: "Core Feature Highlights",
  cards: [
    {
      title: "Barcode-Driven Cataloging",
      description: "Scan ISBN barcode to auto-fetch book metadata and fill details instantly. Reduces manual entry errors and speeds up catalog creation."
    },
    {
      title: "QR-Based Issue & Return",
      description: "Staff scan Member QR card and Book Barcode. System auto-updates inventory, calculates overdue days and marks return in real-time."
    },
    {
      title: "Smart Book Discovery",
      description: "Public portal with advanced search by title, author, subject, language. Filters for Ambedkar literature, social justice, law, constitution and more."
    },
    {
      title: "Configurable Rules Engine",
      description: "Set borrowing limits per member type (student, scholar, officer), custom fine amounts, and duration policies — all configurable by administrators."
    },
    {
      title: "Digital Membership Cards",
      description: "Unique QR-coded membership cards for each member, used seamlessly during all issue and return transactions at the library."
    },
    {
      title: "Government-Grade Reporting",
      description: "Generate monthly, quarterly and annual reports exportable to PDF and Excel for management, government submissions and audit purposes."
    }
  ] as const
};

export const WHY_CHOOSE = {
  title: "Why Choose KLMP for BARTI?",
  cards: [
    {
      title: "Built for Government Institutions",
      description: "Designed to meet compliance, reporting and audit requirements of Maharashtra government bodies."
    },
    {
      title: "Deep Focus on Ambedkarite Heritage",
      description: "Specialized categories and metadata for Ambedkar literature, social justice, and constitutional studies."
    },
    {
      title: "Flexible & Scalable",
      description: "From a single library to a multi-branch network. Configurable rules engine adapts to any policy."
    },
    {
      title: "Data-Driven Decisions",
      description: "Actionable analytics help management identify gaps, popular resources and utilization trends."
    },
    {
      title: "Future-Ready with AI",
      description: "Phase 3 AI engine adds recommendation and conversational search capabilities."
    },
    {
      title: "Inclusive Citizen Access",
      description: "Public discovery portal allows any citizen, student or researcher to search and reserve books digitally."
    }
  ] as const
};

export const CAPABILITIES = {
  cards: [
    {
      label: "Core Module",
      title: "Library Operations",
      description: "End-to-end library management with barcode cataloging, inventory tracking, and automated workflows.",
      features: [
        "Barcode Cataloging",
        "Inventory Tracking",
        "Issue & Return Workflows",
        "Member Management",
        "Copy Management",
      ],
    },
    {
      label: "Repository Module",
      title: "Digital Repository",
      description: "Centralized digital archive for research papers, government publications, and historical documents.",
      features: [
        "Research Papers",
        "Archives",
        "Government Publications",
        "Digital Collections",
        "Knowledge Preservation",
      ],
    },
    {
      label: "Discovery Module",
      title: "Knowledge Discovery",
      description: "Advanced search and discovery with intelligent filtering across all collections and resources.",
      features: [
        "Advanced Search",
        "Subject Filtering",
        "Author Discovery",
        "Collection Browsing",
        "Reading History",
      ],
    },
    {
      label: "Intelligence Module",
      title: "AI Intelligence",
      description: "AI-powered knowledge assistant providing recommendations, insights, and intelligent search capabilities.",
      features: [
        "Ask BARTI Assistant",
        "Smart Recommendations",
        "Reading Insights",
        "Trend Detection",
        "Future AI Capabilities",
      ],
    },
  ] as const,
};

export const DISCOVERY = {
  categories: [
    { title: "Ambedkar Literature", count: "2,450+ volumes", color: "navy" },
    { title: "Constitutional Studies", count: "1,820+ documents", color: "gold" },
    { title: "Social Justice", count: "1,560+ resources", color: "teal" },
    { title: "Research Papers", count: "3,200+ papers", color: "navy" },
    { title: "Archives", count: "980+ records", color: "gold" },
    { title: "Government Publications", count: "1,430+ documents", color: "teal" },
  ] as const,
};

export const ORGANIZATIONS = {
  items: [
    {
      title: "Government Libraries",
      description: "State and district library networks across Maharashtra",
      pattern: "grid",
    },
    {
      title: "Universities",
      description: "Academic institutions and research universities",
      pattern: "dots",
    },
    {
      title: "Research Institutions",
      description: "Specialized research centers and archives",
      pattern: "lines",
    },
    {
      title: "Knowledge Repositories",
      description: "Digital preservation and knowledge management centers",
      pattern: "cross",
    },
  ] as const,
};

export const BENEFITS_BARTI = {
  title: "Benefits for BARTI & Readers",
  forBarti: [
    "Accurate inventory tracking across all collections",
    "Automated issue and return workflows",
    "Data-driven analytics and operational reporting",
    "Better resource utilization insights",
    "Reduced administrative overhead",
  ],
  forReaders: [
    "Smart book discovery with advanced search and filters",
    "Online book reservations from anywhere",
    "Complete borrowing history at a glance",
    "Personalized reading recommendations",
    "Digital access to repository documents",
  ],
} as const;

export const STATS = {
  metrics: [
    { value: "12000", label: "Books", suffix: "+" },
    { value: "8000", label: "Members", suffix: "+" },
    { value: "98", label: "Availability", suffix: "%" },
    { value: "24", label: "Access", suffix: "/7" },
  ] as const,
};

export const CTA = {
  headline: "Let\u2019s Transform BARTI\u2019s Library Together",
  subheadline:
    "Digitize operations, improve accessibility and create Maharashtra\u2019s most comprehensive digital knowledge ecosystem.",
  primaryCta: "Request Walkthrough",
  secondaryCta: "Schedule Consultation",
} as const;

export const FOOTER = {
  columns: [
    {
      title: "Platform",
      links: [
        { label: "Capabilities", href: "#capabilities" },
        { label: "Discovery", href: "#discovery" },
        { label: "Roadmap", href: "#roadmap" },
        { label: "Contact", href: "#cta" },
      ],
    },
    {
      title: "Collections",
      links: [
        { label: "Ambedkar Literature", href: "#discovery" },
        { label: "Constitutional Studies", href: "#discovery" },
        { label: "Social Justice", href: "#discovery" },
        { label: "Research Papers", href: "#discovery" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Support", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
    {
      title: "Government",
      links: [
        { label: "Library Management", href: "#capabilities" },
        { label: "Digital Archives", href: "#capabilities" },
        { label: "Knowledge Portals", href: "#capabilities" },
        { label: "Citizen Services", href: "#capabilities" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "BARTI Headquarters", href: "#" },
        { label: "Email Us", href: "#" },
        { label: "Request Demo", href: "#cta" },
        { label: "Support Portal", href: "#" },
      ],
    },
  ] as const,
};
