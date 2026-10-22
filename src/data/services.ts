export interface ServiceItem {
  id: string;
  category: "web-software" | "data-business";
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  deliverables: string[];
  icon: string;
  pricing?: string;
  pricingNote?: string;
  basePrice?: number;
}

export const servicesData: ServiceItem[] = [
  // --- Category 01: Web & Software Development ---
  {
    id: "html-css-web-design",
    category: "web-software",
    number: "01",
    title: "HTML, CSS & Modern Web Design",
    shortDesc: "Pixel-perfect, high-performance responsive web interfaces built with modern semantics and clean CSS architecture.",
    fullDesc: "We craft standards-compliant, blazing fast websites and landing pages engineered for optimal conversion, flawless cross-browser compatibility, and seamless responsiveness across all screen dimensions.",
    technologies: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "Responsive Design"],
    deliverables: [
      "Custom semantic markup with SEO structure",
      "Fully responsive mobile-first layouts",
      "Modern CSS animations & micro-interactions",
      "Cross-browser & cross-device testing",
      "Performance optimization & accessibility audit"
    ],
    icon: "Layout",
    pricing: "$150 – $720",
    pricingNote: "Basic $150 • Standard $360 • Premium $720",
    basePrice: 150
  },
  {
    id: "mern-stack-development",
    category: "web-software",
    number: "02",
    title: "Full-Stack MERN Development",
    shortDesc: "Scalable end-to-end web applications engineered with React.js, Node.js, Express.js, and MongoDB.",
    fullDesc: "From dynamic single-page applications to robust multi-tenant enterprise platforms, we develop production-grade MERN architectures featuring clean modular APIs, real-time sync, and fluid client-side experiences.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "REST APIs"],
    deliverables: [
      "Dynamic interactive React frontend architecture",
      "Robust Express & Node.js backend RESTful services",
      "Database schema modeling & query optimization",
      "Secure authentication (JWT / OAuth / RBAC)",
      "Automated deployment & environment configuration"
    ],
    icon: "Layers",
    pricing: "$240 – $1,800",
    pricingNote: "Basic $240 • Standard $600 • Premium $1,800",
    basePrice: 240
  },
  {
    id: "backend-development-core",
    category: "web-software",
    number: "03",
    title: "Core Backend Engineering & APIs",
    shortDesc: "Resilient server-side systems, microservices, and high-throughput REST and GraphQL endpoints.",
    fullDesc: "We design resilient server architectures capable of handling heavy concurrent traffic, automated job queues, third-party API orchestrations, and secure transactional data pipelines.",
    technologies: ["Node.js", "Express.js", "REST APIs", "GraphQL", "PostgreSQL", "Redis"],
    deliverables: [
      "Scalable API architecture & detailed API documentation",
      "Relational & NoSQL database schema design",
      "Caching layers & queue workers",
      "Security hardening & rate limiting",
      "Cloud deployment & container orchestration"
    ],
    icon: "Server",
    pricing: "$210 – $1,440",
    pricingNote: "Basic $210 • Standard $480 • Premium $1,440",
    basePrice: 210
  },
  {
    id: "android-app-development",
    category: "web-software",
    number: "04",
    title: "Android App Development (Flutter & React Native)",
    shortDesc: "Native-quality Android applications built with Flutter and React Native for optimal performance and smooth UX.",
    fullDesc: "Empower your mobile presence with Android applications engineered for fluid 60fps animations, intuitive material UX, offline-first sync capabilities, and seamless hardware sensor integration.",
    technologies: ["Flutter", "Dart", "React Native", "Android SDK", "Firebase"],
    deliverables: [
      "Cross-platform or native Android application build",
      "State management architecture (Bloc / Provider / Redux)",
      "Push notifications & deep linking setup",
      "Offline caching & local data storage",
      "Play Store release readiness and asset preparation"
    ],
    icon: "Smartphone",
    pricing: "$260 – $2,140",
    pricingNote: "Basic $260 • Standard $740 • Premium $2,140",
    basePrice: 260
  },
  {
    id: "ios-app-development",
    category: "web-software",
    number: "05",
    title: "iOS App Development",
    shortDesc: "Sleek, fluid iOS applications tailored to Apple Human Interface Guidelines and modern performance standards.",
    fullDesc: "Deliver an executive-tier Apple ecosystem experience. We build iOS applications that combine refined aesthetics, smooth haptic micro-interactions, low battery consumption, and reliable network state handling.",
    technologies: ["Flutter", "React Native", "iOS SDK", "Swift Interop", "TestFlight"],
    deliverables: [
      "Production-ready iOS IPA build",
      "Custom navigation & Cupertino-grade UI components",
      "In-App purchase & subscription architecture",
      "Biometric authentication (Face ID / Touch ID)",
      "App Store submission preparation & compliance audit"
    ],
    icon: "AppWindow",
    pricing: "$350 – $2,280",
    pricingNote: "Basic $350 • Standard $865 • Premium $2,280",
    basePrice: 350
  },
  {
    id: "enterprise-backend-stack",
    category: "web-software",
    number: "06",
    title: "Enterprise Backend (Spring Boot, Django, .NET, NestJS)",
    shortDesc: "Mission-critical enterprise backend development using robust typed frameworks for high concurrency and compliance.",
    fullDesc: "For organizations demanding strict architectural patterns and enterprise durability, we deliver services using Spring Boot, Django, .NET, and NestJS, featuring Clean Architecture and Domain-Driven Design.",
    technologies: ["Spring Boot", "Django", ".NET Core", "NestJS", "PostgreSQL", "Docker"],
    deliverables: [
      "Domain-driven backend microservice architecture",
      "Enterprise security compliance & audit logging",
      "Complex business logic workflows & integrations",
      "Unit & integration test suites",
      "CI/CD pipeline automation setup"
    ],
    icon: "Cpu",
    pricing: "$420 – $1,800",
    pricingNote: "Basic $420 • Standard $900 • Premium $1,800",
    basePrice: 420
  },
  {
    id: "blockchain-development",
    category: "web-software",
    number: "07",
    title: "Blockchain Solutions & Web3 Integration",
    shortDesc: "Secure smart contract design, decentralized application (dApp) interfaces, and Web3 protocol integrations.",
    fullDesc: "Harness decentralized ledgers with verified security. We develop smart contracts, token standards, wallet connect flows, and dApp interfaces that bridge Web2 usability with Web3 immutability.",
    technologies: ["Solidity", "Ethers.js", "Web3.js", "Hardhat", "Smart Contracts"],
    deliverables: [
      "Tested & documented smart contracts (ERC-20 / ERC-721)",
      "Web3 wallet connection (MetaMask, WalletConnect)",
      "dApp user interface development",
      "Gas optimization & security review",
      "Testnet & Mainnet deployment guidance"
    ],
    icon: "ShieldCheck",
    pricing: "$480 – $2,400",
    pricingNote: "Basic $480 • Standard $1,200 • Premium $2,400",
    basePrice: 480
  },
  {
    id: "laravel-php-development",
    category: "web-software",
    number: "08",
    title: "PHP & Laravel Full-Stack Engineering",
    shortDesc: "Elegant, scalable web systems and modern SaaS platforms powered by the Laravel ecosystem.",
    fullDesc: "We leverage Laravel's elegant architecture to build feature-rich web applications, SaaS dashboards, billing engines, and robust internal tooling with clean MVC separation and rapid time-to-market.",
    technologies: ["PHP", "Laravel", "Blade", "MySQL", "Livewire", "Tailwind CSS"],
    deliverables: [
      "Clean MVC application architecture",
      "Automated queue processing & notification systems",
      "Payment gateway integration (Stripe, Razorpay, PayPal)",
      "Admin dashboards with granular role permissions",
      "Production deployment & server configuration"
    ],
    icon: "Code2",
    pricing: "$240 – $1,560",
    pricingNote: "Basic $240 • Standard $600 • Premium $1,560",
    basePrice: 240
  },
  {
    id: "wordpress-development",
    category: "web-software",
    number: "09",
    title: "WordPress Custom Development",
    shortDesc: "High-speed custom WordPress themes, bespoke plugins, and headless CMS integrations built without bloat.",
    fullDesc: "Say goodbye to sluggish, bloated templates. We build custom-engineered WordPress themes and custom plugins from scratch, giving clients full content editing autonomy with lightning-fast PageSpeed scores.",
    technologies: ["WordPress", "PHP", "ACF Pro", "Gutenberg", "REST API", "SEO Best Practices"],
    deliverables: [
      "Custom responsive theme built to brand design",
      "Tailored ACF (Advanced Custom Fields) block architecture",
      "Performance optimization (Core Web Vitals 90+)",
      "Security hardening & automated backup configuration",
      "Content migration & client administration guide"
    ],
    icon: "FileCode",
    pricing: "$180 – $1,200",
    pricingNote: "Basic $180 • Standard $450 • Premium $1,200",
    basePrice: 180
  },
  {
    id: "shopify-development",
    category: "web-software",
    number: "10",
    title: "Shopify E-commerce Development",
    shortDesc: "High-converting bespoke Shopify stores, Liquid custom theme builds, and seamless app integrations.",
    fullDesc: "Transform online commerce into a frictionless conversion engine. We build custom Shopify 2.0 themes, optimize checkout flows, configure complex product variants, and integrate inventory management systems.",
    technologies: ["Shopify 2.0", "Liquid", "JavaScript", "HTML/CSS", "Shopify Apps"],
    deliverables: [
      "Custom Shopify 2.0 theme design & Liquid development",
      "Mobile-optimized product & checkout pages",
      "App integrations (reviews, inventory, email marketing)",
      "Speed optimization for higher conversion rates",
      "Full store setup, payment gateway, and launch testing"
    ],
    icon: "ShoppingBag",
    pricing: "$240 – $1,440",
    pricingNote: "Basic $240 • Standard $600 • Premium $1,440",
    basePrice: 240
  },

  // --- Category 02: Data & Business Solutions ---
  {
    id: "data-cleaning-excel",
    category: "data-business",
    number: "01",
    title: "Excel Data Cleaning & Standardization",
    shortDesc: "Systematic cleanup of messy, inconsistent datasets to ensure integrity and reliable downstream analysis.",
    fullDesc: "High-quality decisions require clean data. We detect and fix missing entries, remove duplicates, standardize date/currency formats, resolve syntax inconsistencies, and sanitize raw exports.",
    technologies: ["Microsoft Excel", "Power Query", "Data Cleansing", "Regex / Text Formulas"],
    deliverables: [
      "De-duplicated and formatted clean dataset",
      "Power Query repeatable cleaning pipeline",
      "Standardized naming conventions & field categorizations",
      "Anomaly & outlier detection summary",
      "Cleaned master workbook with original audit trail"
    ],
    icon: "Filter",
    pricing: "$18 – $176",
    pricingNote: "Basic $18 • Standard $65 • Premium $176",
    basePrice: 18
  },
  {
    id: "data-merging-excel",
    category: "data-business",
    number: "02",
    title: "Data Merging & Consolidation in Excel",
    shortDesc: "Intelligent consolidation of multi-source files, relational lookups, and multi-sheet master merging.",
    fullDesc: "We eliminate the chaos of scattered spreadsheets by unifying multi-branch, multi-month, or multi-platform data into cohesive, linked relational master sheets using Power Query and advanced lookup formulas.",
    technologies: ["Microsoft Excel", "Power Query", "XLOOKUP / INDEX-MATCH", "Data Modeling"],
    deliverables: [
      "Automated multi-file consolidation pipeline",
      "Relational data model linking customer/sales/inventory records",
      "One-click refresh data ingestion from folders/files",
      "Discrepancy reconciliation sheets",
      "Structured output for executive review"
    ],
    icon: "GitMerge",
    pricing: "$18 – $176",
    pricingNote: "Basic $18 • Standard $65 • Premium $176",
    basePrice: 18
  },
  {
    id: "excel-dashboards-professional",
    category: "data-business",
    number: "03",
    title: "Professional Excel Dashboard Development",
    shortDesc: "Interactive business dashboards with slicers, dynamic charts, and executive KPI summaries in Excel.",
    fullDesc: "We build intuitive Excel dashboards designed for managers and business owners. Featuring interactive timeline slicers, visual trend charts, and automated refresh buttons for effortless daily monitoring.",
    technologies: ["Excel Dashboards", "Pivot Charts", "Dynamic Slicers", "Conditional Formatting"],
    deliverables: [
      "Interactive executive dashboard tab",
      "Dynamic chart visuals linked to central slicers",
      "Color-coded KPI alerts & variance metrics",
      "Protected user-friendly interface with hidden backend sheets",
      "User instructions for scheduled data refreshing"
    ],
    icon: "BarChart3",
    pricing: "$18 – $176",
    pricingNote: "Basic $18 • Standard $65 • Premium $176",
    basePrice: 18
  },
  {
    id: "excel-dashboards-advanced",
    category: "data-business",
    number: "04",
    title: "Advanced Excel Dashboard & Automation",
    shortDesc: "Enterprise-grade Excel dashboards powered by Power Query pipelines, advanced data models, and VBA/macros.",
    fullDesc: "For complex analytical workflows, we build advanced Excel dashboards integrating multi-dimensional data models, automated VBA routine triggers, scenario analysis, and real-time parameter switches.",
    technologies: ["Excel VBA / Macros", "Power Query ETL", "Data Modeling", "Scenario Modeling"],
    deliverables: [
      "Full-fledged automated analytical dashboard",
      "VBA macros for one-click report generation & PDF export",
      "Dynamic sensitivity / scenario forecasting toggles",
      "High-density visual storytelling design",
      "Maintenance-free automated transformation workflow"
    ],
    icon: "PieChart",
    pricing: "$18 – $176",
    pricingNote: "Basic $18 • Standard $65 • Premium $176",
    basePrice: 18
  },
  {
    id: "power-bi-reporting",
    category: "data-business",
    number: "05",
    title: "Power BI Reporting Solutions",
    shortDesc: "Standardized business intelligence reports that transform raw data into clear, accessible visual narratives.",
    fullDesc: "Empower your stakeholders with modern Power BI reports. We build structured semantic reporting models with clear visual hierarchies, tailored brand themes, and automated scheduled refreshes.",
    technologies: ["Microsoft Power BI", "Power Query ETL", "Data Storytelling", "Visual Analytics"],
    deliverables: [
      "Branded Power BI report (.pbix) files",
      "Structured data transformation pipelines",
      "Standard executive reporting views",
      "Cross-filtering and drill-down interactions",
      "Publishing guidance for Power BI Service"
    ],
    icon: "LineChart",
    pricing: "$21 – $279",
    pricingNote: "Basic $21 • Standard $95 • Premium $279",
    basePrice: 21
  },
  {
    id: "power-bi-dashboards-advanced",
    category: "data-business",
    number: "06",
    title: "Advanced Power BI Dashboard Development",
    shortDesc: "Enterprise Power BI solutions featuring complex DAX calculations, star schema models, and row-level security.",
    fullDesc: "Unlock deep operational intelligence. We architect enterprise Power BI ecosystems incorporating high-performance Star Schemas, advanced DAX time-intelligence metrics, dynamic drill-throughs, and custom tooltips.",
    technologies: ["Power BI", "DAX Formulas", "Star Schema Modeling", "Row-Level Security (RLS)", "Power BI Service"],
    deliverables: [
      "Optimized star-schema data architecture",
      "Complex DAX measures (YOY, MOM, moving averages, forecasting)",
      "Multi-page interactive dashboards with drill-through exploration",
      "Performance optimization for rapid query response",
      "Row-Level Security (RLS) configuration for role-based access"
    ],
    icon: "Activity",
    pricing: "$21 – $279",
    pricingNote: "Basic $21 • Standard $95 • Premium $279",
    basePrice: 21
  }
];
