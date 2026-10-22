export interface ProjectPricing {
  startingPrice: string;
  basicPrice?: string;
  standardPrice: string;
  premiumPrice: string;
  customPrice?: string;
  pricingQualification?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Web" | "E-commerce" | "Business" | "Data" | "UI/UX" | "Mobile Apps" | "iOS App" | "Android App" | string;
  filterCategory: "web" | "ecommerce" | "business" | "data" | "ui-ux" | "mobile" | string;
  shortDesc: string;
  overview: string;
  challenge: string;
  solution: string;
  technologies: string[];
  keyFeatures: string[];
  gradientTheme: string;
  badge: string;
  image: string;
  platform?: "iOS" | "Android";
  pricing: ProjectPricing;
  demoUrl?: string;
  videoSrc?: string;
}

export const projectsData: ProjectItem[] = [
  // --- D. USER-FRIENDLY WEBSITES ---
  {
    id: "trendzo",
    title: "Trendzo",
    subtitle: "Fashion / E-commerce",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Modern fashion e-commerce experience with product discovery, shopping and online checkout.",
    overview: "Trendzo is a modern fashion e-commerce concept engineered for boutique and high-end apparel brands seeking an editorial aesthetic with high-speed browsing and seamless transactional flows.",
    challenge: "Fashion shoppers demand instantaneous image rendering, fluid size/color selector interactions, and zero-friction checkout flows across both mobile and desktop screens.",
    solution: "Engineered a headless React architecture paired with optimized static image delivery, optimistic cart updates, and an intuitive minimal checkout drawer.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Stripe API", "Framer Motion"],
    keyFeatures: [
      "High-fashion curated product catalogue",
      "Men, Women & Seasonal apparel categories",
      "Instant search with autocomplete tags",
      "Size, color, fabric & price filters",
      "Optimistic shopping cart slide-out",
      "Customer wardrobe wishlist",
      "Multi-step frictionless checkout",
      "Encrypted payment gateway integration",
      "Customer login & profile accounts",
      "Order management & tracking dashboard"
    ],
    gradientTheme: "from-purple-900/40 via-indigo-950/40 to-slate-900/50",
    badge: "Fashion / E-commerce",
    image: "/projects/Trendzo.webp",
    pricing: {
      startingPrice: "$420",
      basicPrice: "$420",
      standardPrice: "$540 – $780",
      premiumPrice: "$900 – $1,200",
      customPrice: "Up to $1,440+"
    },
    demoUrl: "https://trendzo-taupe.vercel.app/"
  },
  {
    id: "bizgrow",
    title: "BizGrow",
    subtitle: "Business / Corporate Website",
    category: "Business",
    filterCategory: "business",
    shortDesc: "Professional business website designed for companies, services and lead generation.",
    overview: "BizGrow offers an executive digital presence for consulting firms and B2B enterprises needing to project authority, data-backed trust, and clear client value.",
    challenge: "Creating an engaging B2B experience that guides corporate prospects toward booking qualified advisory calls and reviewing case studies.",
    solution: "Structured a value-first narrative with clear ROI pillars, sector breakdown filters, and integrated consultation scheduling.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Lucide Icons"],
    keyFeatures: [
      "Structured corporate business pages",
      "Service offerings & solution breakdowns",
      "About company narrative & vision",
      "Executive team profiles & leadership",
      "Client project case studies & portfolio",
      "High-converting contact & inquiry forms",
      "Strategic lead generation workflows",
      "WhatsApp & click-to-chat integration",
      "Core SEO architecture & meta tags"
    ],
    gradientTheme: "from-zinc-900 via-slate-950 to-neutral-900",
    badge: "Business / Corporate",
    image: "/projects/BizGrow.webp",
    pricing: {
      startingPrice: "$210",
      basicPrice: "$210",
      standardPrice: "$300 – $420",
      premiumPrice: "$480 – $660",
      customPrice: "Up to $900+"
    },
    demoUrl: ""
  },
  {
    id: "travelaya",
    title: "TraveLaya",
    subtitle: "Travel / Booking Platform",
    category: "Web",
    filterCategory: "web",
    shortDesc: "Travel website with destination pages, packages, enquiries and booking functionality.",
    overview: "Travelaya guides prospective travelers through evocative photo essays, curated multi-day journey roadmaps, package estimates, and booking management across international destinations.",
    challenge: "Presenting multi-destination itineraries with interactive route maps and customizable excursion packages in a cohesive UI.",
    solution: "Built an interactive travel package showcase showing destination highlights, booking enquiry forms, and automated travel notifications.",
    technologies: ["React.js", "Leaflet / Maps API", "Tailwind CSS", "Framer Motion"],
    keyFeatures: [
      "Curated international travel packages",
      "Rich destination guides & photo essays",
      "Destination & budget search engine",
      "Duration, region & season filters",
      "Online itinerary booking & reservation system",
      "Traveler accounts & booking history",
      "Secure online payment gateway",
      "Admin booking management portal",
      "Interactive map routes & pins",
      "Automated itinerary notifications"
    ],
    gradientTheme: "from-sky-950/40 via-blue-950/40 to-slate-900/50",
    badge: "Travel / Booking Platform",
    image: "/projects/TraveLaya.webp",
    pricing: {
      startingPrice: "$480",
      basicPrice: "$480",
      standardPrice: "$600 – $840",
      premiumPrice: "$960 – $1,320",
      customPrice: "Up to $1,800+"
    },
    demoUrl: "https://travelaya.zynova.co.in"
  },
  {
    id: "mediwell",
    title: "MediWell",
    subtitle: "Healthcare Platform",
    category: "Healthcare Platform",
    filterCategory: "business",
    shortDesc: "A modern healthcare platform designed to help users explore healthcare services, medical information, and doctor-related features through an intuitive interface.",
    overview: "MediWell is a modern healthcare platform designed to help users explore healthcare services, medical information, specialist doctor credentials, and appointment inquiry features through an intuitive, accessible digital interface.",
    challenge: "Designing an accessible, dignified interface for visitors while organizing specialist profiles and department inquiries with clarity.",
    solution: "Implemented high-contrast accessible typography, department breakdown directories, and a streamlined doctor appointment consultation request module.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React.js", "Vercel"],
    keyFeatures: [
      "Clinical & healthcare services overview",
      "Specialist doctor profiles & credentials",
      "Appointment consultation enquiries",
      "Patient contact & triage forms",
      "Medical department & clinic pages",
      "Patient enquiry intake routing",
      "Administrative enquiry management",
      "Email & SMS notification dispatch"
    ],
    gradientTheme: "from-teal-950/40 via-cyan-950/40 to-slate-900/50",
    badge: "Healthcare Platform",
    image: "/projects/MediWell.webp",
    pricing: {
      startingPrice: "$420",
      basicPrice: "$420",
      standardPrice: "$540 – $780",
      premiumPrice: "$900 – $1,320",
      customPrice: "Up to $1,800+"
    },
    demoUrl: "https://medi-well-ten.vercel.app/"
  },
  {
    id: "learnhub",
    title: "LearnHub",
    subtitle: "Education / LMS",
    category: "Web",
    filterCategory: "web",
    shortDesc: "Online learning platform for courses, students, instructors and digital education.",
    overview: "LearnHub provides self-paced digital education through modular courses, student learning dashboards, instructor management, and verifiable completion certificates.",
    challenge: "Maintaining high student engagement and completion rates through clear module hierarchy and progress reinforcement.",
    solution: "Built a distraction-free course player with chapter navigation, student progress dashboards, interactive quizzes, and certificate generation.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Express.js"],
    keyFeatures: [
      "Comprehensive digital course catalogue",
      "Student registration & profile management",
      "Dedicated student learning dashboard",
      "Instructor dashboard & course management",
      "Modular video lessons & lecture player",
      "Interactive knowledge check quizzes",
      "Student learning progress tracking",
      "Automated course completion certificates",
      "Course fee payment integration"
    ],
    gradientTheme: "from-violet-950/40 via-purple-950/40 to-slate-900/50",
    badge: "Education / LMS",
    image: "/projects/LearnHub.webp",
    pricing: {
      startingPrice: "$480",
      basicPrice: "$480",
      standardPrice: "$600 – $840",
      premiumPrice: "$960 – $1,320",
      customPrice: "Up to $1,800+"
    },
    demoUrl: ""
  },

  // --- E. PREMIUM COLLECTION ---
  {
    id: "hamhold-jewellery",
    title: "HAMHOLD Jewellery",
    subtitle: "Luxury Jewellery Brand & E-commerce Platform",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Premium luxury jewellery e-commerce website designed for HAMHOLD, featuring an editorial brand experience, campaign-driven visuals, responsive design, jewellery presentation, and a sophisticated luxury shopping interface.",
    overview: "A complete luxury jewellery brand website designed and engineered for HAMHOLD, delivering an editorial digital experience with high-impact hero campaigns, curated collections, brand ambassador spotlights, mobile responsiveness, and conversion-focused product presentation.",
    challenge: "Crafting a bespoke digital luxury experience that captures the heritage and prestige of haute jewellery, balancing high-resolution visual storytelling with lightning-fast load times and seamless mobile commerce.",
    solution: "Engineered an editorial luxury layout with gold and champagne accents, ambassador campaign showcases, curated high-resolution jewellery galleries, and intuitive customer engagement funnels.",
    technologies: ["React.js", "Tailwind CSS", "Responsive Design", "Luxury UI", "E-commerce"],
    keyFeatures: [
      "Editorial luxury homepage & hero campaign",
      "Brand ambassador showcase (HM GET READY / Ayesha Campaign)",
      "Curated collections (Bridal, Gold, Diamonds & Fine Jewellery)",
      "Full responsive design across mobile, tablet & desktop",
      "High-resolution jewellery presentation cards & galleries",
      "Fast-loading performance with smooth micro-interactions",
      "Luxury aesthetics with champagne & warm gold accents",
      "Direct WhatsApp & consultation inquiry integration"
    ],
    gradientTheme: "from-amber-950/40 via-yellow-950/30 to-slate-900/50",
    badge: "Luxury Jewellery",
    image: "/projects/hamhold-jewellery.webp",
    pricing: {
      startingPrice: "$450",
      basicPrice: "$450",
      standardPrice: "$750",
      premiumPrice: "$1,500",
      customPrice: "$2,500+",
      pricingQualification: "Includes luxury editorial UI, campaign hero, mobile responsiveness, product catalogs & direct consultation integration."
    },
    demoUrl: "https://hamhold.zynova.co.in",
    videoSrc: "/videos/HAMHOLD.mp4"
  },
  {
    id: "aaranya-silks",
    title: "Aaranya Silks",
    subtitle: "Luxury Ethnic Fashion & Saree E-commerce Platform",
    category: "Luxury Fashion / Saree E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "A premium Indian ethnic fashion and saree e-commerce website featuring elegant collections and a refined online shopping experience.",
    overview: "A complete luxury Indian ethnic fashion and saree e-commerce website designed and engineered for Aaranya Silks, delivering an editorial digital experience with high-resolution collection lookbooks, bridal saree showcases, mobile responsiveness, and refined shopping presentation.",
    challenge: "Crafting a bespoke digital luxury experience that captures the delicate weaves, rich textures, and heritage of handcrafted silk sarees while ensuring effortless mobile commerce and rapid page delivery.",
    solution: "Engineered an editorial luxury layout with gold and crimson accents, bridal lookbook showcases, curated high-resolution saree galleries, and intuitive customer shopping and inquiry funnels.",
    technologies: ["React.js", "Tailwind CSS", "E-commerce UI", "Cloudflare", "Responsive Design"],
    keyFeatures: [
      "Editorial luxury homepage & hero showcase",
      "Curated silk saree lookbooks & high-resolution visual displays",
      "Curated collections (Bridal, Kanchipuram, Banarasi & Fine Silks)",
      "Full responsive design across mobile, tablet & desktop",
      "High-resolution saree presentation cards & lookbook galleries",
      "Fast-loading performance with smooth micro-interactions",
      "Direct WhatsApp customer inquiry & shopping consultation integration"
    ],
    gradientTheme: "from-rose-950/40 via-amber-950/30 to-slate-900/50",
    badge: "Luxury Fashion",
    image: "/projects/aaranya-silks.webp",
    pricing: {
      startingPrice: "$450",
      basicPrice: "$450",
      standardPrice: "$750",
      premiumPrice: "$1,500",
      customPrice: "$2,500+",
      pricingQualification: "Includes bespoke luxury fashion catalog, collection lookbooks, mobile e-commerce, and direct consultation integration."
    },
    demoUrl: "https://aaranya-silks.zynova.co.in",
    videoSrc: "/videos/Aaranya%20Silks.mp4"
  },
  {
    id: "tastybites",
    title: "TastyBites",
    subtitle: "Restaurant / Food Ordering",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Restaurant website with digital menu, online food ordering and customer enquiries.",
    overview: "TastyBites connects culinary kitchens, cafés, and restaurants directly to diners with instant visual menu browsing and meal checkout flows.",
    challenge: "Handling complex food customization options (toppings, spice levels, combos) without friction during mobile checkout.",
    solution: "Created an intuitive modal modifier interface with real-time subtotal updates and dietary tag filtering (Vegan, Gluten-Free, Keto).",
    technologies: ["React.js", "Node.js", "Express.js", "Tailwind CSS"],
    keyFeatures: [
      "Interactive digital menu showcase",
      "Organized food categories & tags",
      "Detailed dish descriptions & ingredients",
      "Instant online food ordering system",
      "Persistent shopping cart drawer",
      "Fast checkout flow with tip calculations",
      "Secure payment gateway integration",
      "Interactive Google Maps location pin",
      "Live order management pipeline"
    ],
    gradientTheme: "from-orange-950/40 via-red-950/30 to-slate-900/50",
    badge: "Restaurant / Food Ordering",
    image: "/projects/tastybites.webp",
    pricing: {
      startingPrice: "$420",
      basicPrice: "$420",
      standardPrice: "$720",
      premiumPrice: "$1,400",
      customPrice: "$2,200+",
      pricingQualification: "Includes interactive digital menu, dish customization modifiers, cart drawer, payment integration & order pipeline."
    },
    demoUrl: "https://tastybites.zynova.co.in",
    videoSrc: "/videos/Tasty%20Bites.mp4"
  },
  {
    id: "homex",
    title: "HomeX",
    subtitle: "Real Estate Website",
    category: "Web",
    filterCategory: "web",
    shortDesc: "Real estate website for property listings, search, enquiries and lead generation.",
    overview: "HomeX elevates residential and commercial real estate marketing with panoramic imagery, floor plans, neighborhood indices, and lead acquisition pipelines.",
    challenge: "Presenting multi-faceted property data, high-resolution imagery, and financial models without overwhelming the house-hunter.",
    solution: "Built a split-screen map-and-listing view with interactive mortgage sliders and categorized floor plan overlays.",
    technologies: ["React.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    keyFeatures: [
      "Residential & commercial property listings",
      "In-depth property spec & amenity details",
      "Locality, budget & BHK search engine",
      "Faceted filter matrix (price, area, type)",
      "Verified real estate agent profiles",
      "Instant private viewing enquiry forms",
      "Interactive map location integration",
      "Owner & builder property submission portal",
      "CRM-ready lead management pipeline"
    ],
    gradientTheme: "from-stone-900 via-neutral-950 to-slate-950",
    badge: "Real Estate",
    image: "/projects/HomeX.webp",
    pricing: {
      startingPrice: "$440",
      basicPrice: "$440",
      standardPrice: "$740",
      premiumPrice: "$1,450",
      customPrice: "$2,400+",
      pricingQualification: "Includes property listing search matrix, interactive map views, mortgage calculators & CRM-ready lead workflows."
    },
    demoUrl: "https://homex.zynova.co.in"
  },

  // --- F. UI-OPTIMIZED COLLECTION ---
  {
    id: "bookverse",
    title: "BookVerse",
    subtitle: "Book Store / E-commerce",
    category: "Book Store / E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "A modern online bookstore featuring curated books, organized categories, and a user-friendly browsing experience.",
    overview: "BookVerse is a modern online bookstore featuring curated books, organized categories, author spotlights, sample chapter previews, dynamic reading shelves, and a user-friendly shopping experience.",
    challenge: "Balancing editorial typography with efficient e-commerce mechanics and digital excerpt readers without visual noise.",
    solution: "Designed an elegant serif-enhanced reading typography system with an in-browser sample previewer, shopping cart drawer, and custom recommendation engine.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Modern UI/UX", "Cloudflare"],
    keyFeatures: [
      "Extensive literary book catalogue",
      "Genre, fiction & non-fiction categories",
      "Author bios & spotlight bibliographies",
      "Real-time title & ISBN search",
      "Advanced format & price filtering",
      "Dynamic shopping cart drawer",
      "Saved reading shelf & wishlist",
      "One-click secure checkout",
      "Multi-method payment integration"
    ],
    gradientTheme: "from-amber-950/40 via-orange-950/40 to-slate-900/50",
    badge: "Book Store / E-commerce",
    image: "/projects/BookVerse.webp",
    pricing: {
      startingPrice: "$360",
      basicPrice: "$360",
      standardPrice: "$480 – $660",
      premiumPrice: "$780 – $1,020",
      customPrice: "Up to $1,200+"
    },
    demoUrl: "https://book-verse-gold-one.vercel.app/"
  },
  {
    id: "techzone",
    title: "TechZone",
    subtitle: "Electronics / E-commerce",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Electronics e-commerce platform with product discovery, comparison and online purchasing.",
    overview: "TechZone bridges technical precision with consumer appeal, presenting detailed technical specifications, interactive side-by-side device comparisons, and bundle discounts.",
    challenge: "Presenting dense technical specifications without overwhelming the buyer or slowing down mobile performance.",
    solution: "Implemented an interactive spec comparison matrix with collapsible technical tabs and high-resolution multi-angle device zooms.",
    technologies: ["React.js", "Redux Toolkit", "Node.js", "MongoDB", "Tailwind CSS"],
    keyFeatures: [
      "Consumer electronics & gadgets catalogue",
      "Technical product search with specs",
      "Advanced hardware spec & brand filters",
      "Side-by-side device comparison matrix",
      "Detailed technical specification sheets",
      "Persistent cart & warranty add-ons",
      "Device wishlist & price drop alerts",
      "Secure express checkout",
      "Online payment gateway integration",
      "Order status & tracking timeline",
      "Real-time inventory management"
    ],
    gradientTheme: "from-blue-950/40 via-cyan-950/40 to-slate-900/50",
    badge: "Electronics / E-commerce",
    image: "/projects/TechZone.webp",
    pricing: {
      startingPrice: "$420",
      basicPrice: "$420",
      standardPrice: "$540 – $780",
      premiumPrice: "$900 – $1,320",
      customPrice: "Up to $1,800+"
    },
    demoUrl: ""
  },
  {
    id: "bloom-beauty",
    title: "Bloom Beauty",
    subtitle: "Beauty / E-commerce",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Modern beauty and cosmetics e-commerce website designed for product discovery and online shopping.",
    overview: "Bloom Beauty celebrates mindful skincare rituals through delicate aesthetics, ingredient glossaries, and custom regimen builder tools.",
    challenge: "Helping consumers determine suitable products for their specific skin type and complexion online.",
    solution: "Engineered an interactive 4-step skin diagnostic quiz that automatically populates an AM/PM regimen bundle with one-click cart addition.",
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "Framer Motion"],
    keyFeatures: [
      "Luxury cosmetics product catalogue",
      "Skincare & beauty category navigation",
      "Instant smart search with auto-suggest",
      "Ingredient transparency & product details",
      "Smooth slide-out shopping cart",
      "Personalized beauty wishlist",
      "Seamless checkout experience",
      "Secure credit/debit card & UPI payment"
    ],
    gradientTheme: "from-pink-950/40 via-rose-950/30 to-slate-900/50",
    badge: "Beauty / E-commerce",
    image: "/projects/bloom-beauty.webp",
    pricing: {
      startingPrice: "$360",
      basicPrice: "$360",
      standardPrice: "$480 – $660",
      premiumPrice: "$780 – $1,020",
      customPrice: "Up to $1,200+"
    },
    demoUrl: "https://bloom-beauty-cosmetics.vercel.app/"
  },
  {
    id: "freshmart",
    title: "FreshMart",
    subtitle: "Grocery / E-commerce",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Grocery e-commerce platform with online shopping, ordering and product management.",
    overview: "FreshMart delivers an intuitive grocery shopping experience designed to handle large-item baskets, recurring staples, and localized delivery time slot allocations.",
    challenge: "Managing extensive category trees and rapid multi-item cart adjustments without causing UI lag or confusing the consumer.",
    solution: "Developed an optimized categorized grid layout with quick-add stepper controls, persistent sticky mini-cart summaries, and automated delivery slot booking.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "PostgreSQL"],
    keyFeatures: [
      "Fresh produce & supermarket product catalogue",
      "Produce, dairy & pantry category trees",
      "Rapid product search with instant suggestions",
      "Organic, dietary & price filters",
      "Quick-add multi-item shopping cart",
      "Delivery slot booking & scheduled checkout",
      "Integrated online payment gateway",
      "Real-time order management & dispatch",
      "Live inventory & stock management"
    ],
    gradientTheme: "from-emerald-950/40 via-teal-950/40 to-slate-900/50",
    badge: "Grocery / E-commerce",
    image: "/projects/FreshMart.webp",
    pricing: {
      startingPrice: "$480",
      basicPrice: "$480",
      standardPrice: "$600 – $840",
      premiumPrice: "$960 – $1,320",
      customPrice: "Up to $1,560+"
    },
    demoUrl: "https://fresh-mart-nu-cyan.vercel.app/"
  },
  {
    id: "petcare",
    title: "PetCare",
    subtitle: "Pet Store / E-commerce",
    category: "E-commerce",
    filterCategory: "ecommerce",
    shortDesc: "Pet care e-commerce website for products, online shopping and customer orders.",
    overview: "PetCare unifies pet supply retail, breed-specific nutrition, and health accessories into a friendly, approachable e-commerce platform.",
    challenge: "Serving diverse animal needs with varied sizing, dietary formulas, and repeat purchasing needs.",
    solution: "Designed an intuitive category catalog with quick filtering, breed guides, and automated repeat re-order shortcuts.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "MongoDB"],
    keyFeatures: [
      "Comprehensive pet product catalogue",
      "Breed & animal category classification",
      "Real-time instant keyword search",
      "Faceted attribute filtering (diet, size, age)",
      "Interactive shopping cart with item updates",
      "Save-for-later pet wishlist",
      "Secure multi-gateway checkout",
      "Online payment gateway integration",
      "Customer order tracking & timeline"
    ],
    gradientTheme: "from-yellow-950/30 via-amber-950/30 to-slate-900/50",
    badge: "Pet Store / E-commerce",
    image: "/projects/PetCare.webp",
    pricing: {
      startingPrice: "$335",
      basicPrice: "$335",
      standardPrice: "$420 – $600",
      premiumPrice: "$660 – $900",
      customPrice: "Up to $1,080+"
    },
    demoUrl: ""
  }
];

// Preserved FitLife project data for external or archive references
export const fitlifeProject: ProjectItem = {
  id: "fitlife",
  title: "FitLife",
  subtitle: "Gym / Fitness Website",
  category: "UI/UX",
  filterCategory: "ui-ux",
  shortDesc: "Modern fitness website for gyms, trainers, memberships and customer enquiries.",
  overview: "FitLife connects fitness enthusiasts with structured training regimens, membership tiers, trainer profiles, and class scheduling in a high-converting digital experience.",
  challenge: "Motivating consistent member signups while presenting trainer schedules, amenities, and workout plans with zero clutter.",
  solution: "Crafted a high-energy, dark luxury fitness showcase with class schedule timetables, trainer bios, and seamless inquiry routing.",
  technologies: ["React.js", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
  keyFeatures: [
    "Gym information & facility highlights",
    "Membership plans & tier comparison",
    "Trainer profiles & credentials",
    "Class schedules & timetables",
    "Contact & lead enquiry forms",
    "Client reviews & testimonials",
    "Photo gallery & visual tour",
    "Direct WhatsApp chat integration"
  ],
  gradientTheme: "from-rose-950/40 via-red-950/40 to-slate-900/50",
  badge: "Gym / Fitness Website",
  image: "/projects/FitLife.webp",
  pricing: {
    startingPrice: "$150",
    basicPrice: "$150",
    standardPrice: "$240 – $360",
    premiumPrice: "$420 – $600",
    customPrice: "Up to $720+"
  },
  demoUrl: ""
};

// R & Python Advanced Analytics project with pricing 10-15% higher than HAMHOLD Jewellery
export const rPythonProject: ProjectItem = {
  id: "r-python",
  title: "R & Python Data Analytics",
  subtitle: "Advanced Statistical Modeling, Automation & Machine Learning",
  category: "Data",
  filterCategory: "data",
  shortDesc: "End-to-end data science pipelines, statistical modeling, custom R and Python automation, and predictive machine learning architectures.",
  overview: "Comprehensive data science and automation engineering utilizing Python and R. Specializing in automated data processing, statistical modeling, predictive algorithms, and custom analytical toolkits.",
  challenge: "Translating complex, high-dimensional business data into automated, reproducible statistical insights with production-grade Python and R scripts.",
  solution: "Engineered scalable data extraction, automated transformation pipelines, predictive statistical models, and custom interactive analytical reporting engines.",
  technologies: ["Python", "R", "Pandas", "Scikit-Learn", "Automation", "NumPy"],
  keyFeatures: [
    "Custom Python & R data automation scripts and ETL pipelines",
    "Statistical inference, hypothesis testing, and regression modeling",
    "Predictive machine learning algorithms and classification models",
    "Automated PDF and Excel report generation pipelines",
    "Interactive data visualizations and statistical dashboards",
    "Clean, modular, and documented source code with environment configs"
  ],
  gradientTheme: "from-blue-950/40 via-indigo-950/30 to-slate-900/50",
  badge: "Advanced Analytics",
  image: "/projects/amit-halder-portfolio.webp",
  pricing: {
    startingPrice: "$500",
    basicPrice: "$500",
    standardPrice: "$850",
    premiumPrice: "$1,700",
    customPrice: "$2,800+",
    pricingQualification: "Pricing is 10–15% higher than web projects reflecting specialized mathematical modeling, statistical analysis, and algorithmic engineering."
  },
  demoUrl: "https://amit-mlEngineer.zynova.co.in"
};

// Amit Halder Data Entry Executive Portfolio
export const dataEntryExecutiveProject: ProjectItem = {
  id: "amit-halder-data-entry",
  title: "Amit Halder — Data Entry Executive",
  subtitle: "Executive Data Processing & Spreadsheet Operations",
  category: "Data",
  filterCategory: "data",
  shortDesc: "Accurate data management, automated spreadsheet models, cross-dataset reconciliation, and executive reporting solutions.",
  overview: "Dedicated professional data processing and executive operations portfolio showcasing high-accuracy data consolidation, cleanup pipelines, master records maintenance, and reporting workflows.",
  challenge: "Ensuring zero-error rate, rapid throughput, and automated validation across large-volume disparate business records.",
  solution: "Developed systematic data validation pipelines, keyboard-driven macro automation, and structured indexing architectures.",
  technologies: ["Excel", "Google Sheets", "Power Query", "Data Processing", "Automation"],
  keyFeatures: [
    "High-accuracy data entry, cleaning, and standardization pipelines",
    "Cross-table multi-file master data reconciliation and verification",
    "Automated data validation rules and error-checking workflows",
    "Executive reporting summaries and KPI metric aggregation"
  ],
  gradientTheme: "from-blue-950/40 via-cyan-950/30 to-slate-900/50",
  badge: "Executive Portfolio",
  image: "/projects/amit-halder-portfolio.webp",
  pricing: {
    startingPrice: "$18",
    basicPrice: "$18",
    standardPrice: "$65",
    premiumPrice: "$176"
  },
  demoUrl: "https://amit-halder-data-entry-executive.vercel.app/"
};

export const mobileProjectsData: ProjectItem[] = [
  // --- A. ANDROID APP — COLLECTION 1 (SafeHer MUST be first) ---
  {
    id: "safeher-android",
    title: "SafeHer",
    subtitle: "Personal Safety, Live Location & Emergency Response Network",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "Android",
    badge: "Android Application",
    image: "/images/apps/safeher-android.webp",
    shortDesc: "Life-saving Android safety app featuring 1-tap SOS alerts, encrypted live location sharing, emergency helpline routing, and verified community support.",
    overview: "SafeHer provides women and vulnerable individuals with rapid emergency defense mechanisms, offering instant SOS broadcast notifications, real-time location telemetry to trusted guardians, and regional emergency helpline linkage.",
    challenge: "Ensuring SOS alert delivery even under extreme low-battery, lock-screen, or weak-cellular connectivity states without failure.",
    solution: "Implemented hardware power-button trigger listeners, fallback SMS geocoded dispatching, and foreground Android services for uninterrupted live tracking.",
    technologies: ["Kotlin", "Jetpack Compose", "Google Maps SDK", "FusedLocationProvider", "Firebase Cloud Messaging"],
    keyFeatures: [
      "One-tap instantaneous emergency SOS button with audible alarm and silent trigger modes",
      "Encrypted live GPS location sharing with designated trusted emergency contacts",
      "Direct emergency helpline speed-dialing (Police, Medical, Women's Helpline)",
      "Safety awareness resource guides, self-defense tutorials, and legal aid directory",
      "Offline fallback SMS dispatch with last known GPS coordinates when data drops"
    ],
    gradientTheme: "from-pink-950/40 via-rose-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$260",
      basicPrice: "$260",
      standardPrice: "$740",
      premiumPrice: "$2,140",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },
  {
    id: "skillhub-android",
    title: "SkillHub",
    subtitle: "Interactive On-Demand Learning, Certifications & Community",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "Android",
    badge: "Android Application",
    image: "/images/apps/skillhub-android.webp",
    shortDesc: "Modular Android e-learning platform with video masterclasses, coding sandboxes, skill assessments, verified certificates, and peer community.",
    overview: "SkillHub brings career-accelerating education into the palm of your hand, offering comprehensive courses across design, software development, business, and digital marketing with offline lecture downloads.",
    challenge: "Delivering adaptive video streaming and interactive code/quiz evaluation across varying network conditions in developing markets.",
    solution: "Integrated ExoPlayer with dynamic adaptive bitrate streaming, offline encrypted video caching, and local-first progress synchronization.",
    technologies: ["Kotlin", "Jetpack Compose", "ExoPlayer", "Room DB", "Retrofit", "Coroutines"],
    keyFeatures: [
      "Extensive course catalog spanning Web Development, UI/UX Design, and Digital Marketing",
      "Offline video downloading and playback for uninterrupted on-the-go study",
      "Interactive module quizzes and real-world project submissions with mentor reviews",
      "Verifiable digital completion certificates shareable directly to professional networks",
      "Global peer discussion forums with real-time student Q&A threads"
    ],
    gradientTheme: "from-violet-950/40 via-purple-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$260",
      basicPrice: "$260",
      standardPrice: "$740",
      premiumPrice: "$2,140",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },
  {
    id: "snapstory-android",
    title: "SnapStory",
    subtitle: "Creative Photo & Video Story Editor, Filters & Storytelling",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "Android",
    badge: "Android Application",
    image: "/images/apps/snapstory-android.webp",
    shortDesc: "Expressive Android visual storytelling app featuring professional color grading, cinematic LUT filters, animated text overlays, and multi-clip timelines.",
    overview: "SnapStory enables creators and everyday users to turn photos and video clips into memorable visual stories with professional grading presets, creative typography, stickers, and one-tap social export.",
    challenge: "Achieving real-time 60fps GPU filter rendering and fast video rendering on diverse mid-range and flagship Android smartphones.",
    solution: "Built a high-performance OpenGL ES / Vulkan shader pipeline with MediaCodec hardware video acceleration for instantaneous previews and swift exports.",
    technologies: ["Kotlin", "Jetpack Compose", "OpenGL ES", "CameraX", "MediaCodec", "Vulkan"],
    keyFeatures: [
      "Professional photographic and cinematic film LUT filter collection (Vivid, B&W, Sunset, Retro)",
      "Multi-layer canvas editor with dynamic typography, custom stickers, and frames",
      "Real-time CameraX capture with live exposure, balance, and filter previewing",
      "Curated aesthetic story templates categorized by travel, portrait, street, and pets",
      "Lossless high-resolution image and 4K video export optimized for social platforms"
    ],
    gradientTheme: "from-amber-950/40 via-orange-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$260",
      basicPrice: "$260",
      standardPrice: "$740",
      premiumPrice: "$2,140",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },
  {
    id: "fitzone-android",
    title: "FitZone",
    subtitle: "Personalized Workouts, Nutrition & Habit Progression",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "Android",
    badge: "Android Application",
    image: "/images/apps/fitzone-android.webp",
    shortDesc: "Dynamic Android fitness application with tailored gym and home training regimens, nutrition planning, calorie counters, and milestone trackers.",
    overview: "FitZone empowers active lifestyles through custom workout generators, macro-balanced nutrition guides, daily hydration logging, and motivating visual achievement milestones designed with Material You guidelines.",
    challenge: "Delivering real-time rep counting and interval exercise timers across diverse Android device configurations and power management profiles.",
    solution: "Built a reactive Kotlin architecture with Jetpack Compose, foreground work managers for uninterrupted workout timing, and Room database caching.",
    technologies: ["Kotlin", "Jetpack Compose", "Room DB", "Health Connect", "Coroutines"],
    keyFeatures: [
      "Custom workout routines tailored to individual fitness levels, goals, and equipment",
      "Nutritional macro tracker with high-protein meal recipes and calorie logs",
      "Body weight and physical transformation progression charts with trend indicators",
      "Integrated rest and interval timer with audible and vibration alerts",
      "Community fitness challenges, streak badges, and social accountability groups"
    ],
    gradientTheme: "from-green-950/40 via-emerald-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$260",
      basicPrice: "$260",
      standardPrice: "$740",
      premiumPrice: "$2,140",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },

  // --- B. iOS APP — COLLECTION 1 ---
  {
    id: "nourish-ios",
    title: "Nourish",
    subtitle: "Nutritional Intelligence, Meal Plans & Habit Tracker",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "iOS",
    badge: "iOS Application",
    image: "/images/apps/nourish-ios.webp",
    shortDesc: "Intuitive nutrition tracking app featuring personalized macro targets, healthy recipe exploration, water tracking, and mindful lifestyle coaching.",
    overview: "Nourish empowers sustainable healthy eating habits through barcode scanning, macro breakdowns, bespoke meal planning, and interactive recipe collections tailored to dietary preferences.",
    challenge: "Providing instantaneous food logging and macro calculation without tedious manual entry or complex data inputs.",
    solution: "Engineered a Vision-based barcode and photo scanner integrated with a rapid local food database and animated macro circular progress rings.",
    technologies: ["SwiftUI", "VisionKit", "CoreData", "Combine", "HealthKit"],
    keyFeatures: [
      "Instant calorie and macro ratio (protein, carbs, fats) progress visualization",
      "Curated wholesome recipe library with step-by-step cooking directions",
      "Smart water intake logger with animated hydration progress indicators",
      "Personalized dietary goal configurations (keto, balanced, vegan, athlete)",
      "Weekly nutritional summaries and long-term metabolic progress trends"
    ],
    gradientTheme: "from-emerald-950/40 via-green-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$350",
      basicPrice: "$350",
      standardPrice: "$865",
      premiumPrice: "$2,280",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },
  {
    id: "zenith-ios",
    title: "Zenith",
    subtitle: "AI-Powered Productivity Assistant & Habit Engine",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "iOS",
    badge: "iOS Application",
    image: "/images/apps/zenith-ios.webp",
    shortDesc: "Next-generation iOS productivity assistant featuring conversational AI task triage, time blocking, strategic prioritization, and automated retrospectives.",
    overview: "Zenith acts as an executive AI copilot for knowledge workers, analyzing daily commitments, drafting structured action plans, suggesting deep-work focus blocks, and providing contextual habit guidance.",
    challenge: "Structuring real-time LLM suggestions into actionable task models and schedule items without cognitive friction or latency.",
    solution: "Engineered an on-device streaming LLM client interfacing with native calendar and reminder APIs, utilizing structured JSON function calling.",
    technologies: ["SwiftUI", "OpenAI / Claude APIs", "EventKit", "Combine", "KeychainServices"],
    keyFeatures: [
      "Conversational AI assistant for daily planning, prioritization, and debriefing",
      "Automated smart time-blocking that arranges tasks into optimal calendar gaps",
      "Voice note capture with instant AI transcript summarization and task extraction",
      "Habit formation tracking with adaptive AI encouragement and milestone analysis",
      "Dark-mode executive interface with fluid micro-interactions and haptic feedback"
    ],
    gradientTheme: "from-blue-950/40 via-indigo-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$350",
      basicPrice: "$350",
      standardPrice: "$865",
      premiumPrice: "$2,280",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },
  {
    id: "eventify-ios",
    title: "Eventify",
    subtitle: "Event Discovery, Ticketing & Community Platform",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "iOS",
    badge: "iOS Application",
    image: "/images/apps/eventify-ios.webp",
    shortDesc: "Native iOS event discovery and ticketing platform featuring curated concerts, tech summits, live ticket booking, and community networking.",
    overview: "Eventify connects users with immersive live experiences, music festivals, tech conferences, and local meetups through fluid iOS gesture navigation, interactive seat maps, and Apple Wallet ticket passes.",
    challenge: "Engineering an instantaneous ticket booking pipeline capable of handling high-volume drop traffic with Apple Pay checkout and offline-available QR credentials.",
    solution: "Developed an asynchronous ticket reservation engine built on SwiftUI with optimistic UI state caching, Apple Pay biometric checkout, and PKPass generation for Apple Wallet.",
    technologies: ["SwiftUI", "Swift", "Apple Pay", "EventKit", "CloudKit", "PassKit"],
    keyFeatures: [
      "Location-based real-time event discovery with category filtering",
      "Instant 1-tap Apple Pay ticket purchasing with encrypted receipts",
      "Apple Wallet pass integration with offline dynamic QR validation",
      "Event reminders synchronized with Apple Calendar & Push Notifications",
      "Social attendee profiles and interest-based networking groups"
    ],
    gradientTheme: "from-purple-950/40 via-indigo-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$350",
      basicPrice: "$350",
      standardPrice: "$865",
      premiumPrice: "$2,280",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },
  {
    id: "medsync-ios",
    title: "MedSync",
    subtitle: "Healthcare Management, Appointments & Records",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "iOS",
    badge: "iOS Application",
    image: "/images/apps/medsync-ios.webp",
    shortDesc: "Comprehensive iOS healthcare companion for doctor consultations, digital health records, medicine reminders, and vital telemetry tracking.",
    overview: "MedSync modernizes personal healthcare by unifying doctor discovery, appointment scheduling, prescription tracking, and encrypted laboratory record storage into a compassionate, HIPAA-compliant iOS application.",
    challenge: "Designing an ultra-secure, intuitive interface accessible for patients of all ages while integrating bi-directional health telemetry with Apple HealthKit.",
    solution: "Implemented an end-to-end encrypted HealthKit sync module with high-contrast accessibility typography, slot-based physician calendar booking, and interactive vital trend charts.",
    technologies: ["SwiftUI", "HealthKit", "CryptoKit", "Combine", "CoreData", "REST APIs"],
    keyFeatures: [
      "Direct specialist appointment scheduling with real-time slot availability",
      "Encrypted diagnostic lab report repository with multi-page PDF viewing",
      "Smart medication dosage reminder scheduling with critical iOS alerts",
      "Apple HealthKit synchronization for heart rate, BP, and activity metrics",
      "Family member profile switching for dependent care management"
    ],
    gradientTheme: "from-teal-950/40 via-cyan-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$350",
      basicPrice: "$350",
      standardPrice: "$865",
      premiumPrice: "$2,280",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },

  // --- C. iOS APP — COLLECTION 2 ---
  {
    id: "petpal-ios",
    title: "PetPal",
    subtitle: "All-in-One Pet Care, Health & Activity Tracking",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "iOS",
    badge: "iOS Application",
    image: "/images/apps/petpal-ios.webp",
    shortDesc: "Complete pet wellness app managing vaccination schedules, daily feeding routines, walk tracking, veterinary records, and multi-pet care.",
    overview: "PetPal gives devoted pet owners total peace of mind by centralizing clinical records, auto-scheduled vaccination reminders, meal routines, and exercise logs in a friendly, heartwarming iOS interface.",
    challenge: "Accommodating disparate species and breed requirements while maintaining seamless multi-pet profile transitions and recurring care alerts.",
    solution: "Built a polymorphic pet data model with custom scheduled local notifications, MapKit walk route tracking, and shared household pet profiles.",
    technologies: ["SwiftUI", "MapKit", "CoreData", "UserNotifications", "CloudKit"],
    keyFeatures: [
      "Multi-pet profile management with breed-specific developmental milestones",
      "Automated immunization, grooming, and vet consultation calendar alerts",
      "Daily meal logging, medication administration, and weight tracking curves",
      "GPS walk route and distance tracking with bathroom stop markers",
      "Expert pet care library with behavioral training guides and dietary advice"
    ],
    gradientTheme: "from-amber-950/40 via-orange-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$350",
      basicPrice: "$350",
      standardPrice: "$865",
      premiumPrice: "$2,280",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },
  {
    id: "mindflow-ios",
    title: "MindFlow",
    subtitle: "Mental Wellness, Meditation & Sleep Companion",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "iOS",
    badge: "iOS Application",
    image: "/images/apps/mindflow-ios.webp",
    shortDesc: "Serene mindfulness and meditation app with guided audio journeys, sleep soundscapes, stress reduction exercises, and mood progression logs.",
    overview: "MindFlow creates a calm digital sanctuary for daily mental wellbeing, offering guided breathwork sessions, binaural soundscapes, habit builders, and mindful reflection tools.",
    challenge: "Delivering continuous, gapless high-fidelity audio playback while animating soothing visualizers without draining battery during sleep states.",
    solution: "Built a background-optimized AVFoundation audio engine paired with lightweight Metal particle shaders and offline-capable audio caching.",
    technologies: ["SwiftUI", "AVFoundation", "Metal Shaders", "CoreMotion", "CoreData"],
    keyFeatures: [
      "Curated library of guided meditations, sleep stories, and ambient soundscapes",
      "Interactive tactile breathing pacing guide with CoreHaptics feedback",
      "Daily mood check-ins, gratitude journaling, and mental wellness analytics",
      "Background audio timer with soothing fade-out sleep mode",
      "Mindful minute tracking synced automatically with Apple Health"
    ],
    gradientTheme: "from-indigo-950/40 via-purple-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$350",
      basicPrice: "$350",
      standardPrice: "$865",
      premiumPrice: "$2,280",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },
  {
    id: "taskly-ios",
    title: "Taskly",
    subtitle: "Daily Planning, Focus & Task Management System",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "iOS",
    badge: "iOS Application",
    image: "/images/apps/taskly-ios.webp",
    shortDesc: "Streamlined iOS productivity tool with smart day planning, priority matrices, subtask workflows, focus timers, and completion streaks.",
    overview: "Taskly transforms daily chaos into focused momentum, combining a distraction-free task editor, Eisenhower priority categorization, Pomodoro focus sessions, and motivational streak tracking.",
    challenge: "Maintaining zero-latency task creation and fluid drag-and-drop prioritization while maintaining bidirectional cloud synchronization.",
    solution: "Architected a local-first CoreData cache with background CloudKit synchronization and fluid iOS drag-and-drop table reordering.",
    technologies: ["SwiftUI", "CloudKit", "CoreData", "WidgetKit", "AppIntents"],
    keyFeatures: [
      "Natural language task input with automated date, time, and priority parsing",
      "Customizable priority tags (High, Medium, Low) with smart color coding",
      "Integrated Pomodoro focus timer with ambient sound and Do-Not-Disturb sync",
      "Interactive iOS Home Screen widgets for instant task completion",
      "Weekly productivity analytics showing velocity, completion rates, and streaks"
    ],
    gradientTheme: "from-blue-950/40 via-sky-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$350",
      basicPrice: "$350",
      standardPrice: "$865",
      premiumPrice: "$2,280",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  },
  {
    id: "terratrack-ios",
    title: "TerraTrack",
    subtitle: "Outdoor Exploration, Trail GPS & Expedition Companion",
    category: "Mobile Apps",
    filterCategory: "mobile",
    platform: "iOS",
    badge: "iOS Application",
    image: "/images/apps/terratrack-ios.webp",
    shortDesc: "High-precision outdoor GPS navigation app featuring topographical offline maps, elevation profiles, waypoint markers, and trail tracking.",
    overview: "TerraTrack is built for hikers, mountaineers, and trail runners seeking reliable offline GPS navigation, topographic contour overlays, elevation gain metrics, and community route discoveries.",
    challenge: "Delivering continuous GPS track recording with high elevation accuracy in remote wilderness areas with zero cellular connectivity and low power consumption.",
    solution: "Implemented an energy-efficient CoreLocation telemetry pipeline coupled with vector-tile offline map caching and Barometer elevation smoothing.",
    technologies: ["SwiftUI", "CoreLocation", "MapKit", "CoreMotion", "Offline Vector Maps"],
    keyFeatures: [
      "Offline topographic and satellite map downloads for cell-free wilderness navigation",
      "Real-time trail telemetry: distance, duration, elevation profile, and pace",
      "Custom waypoint tagging with geolocated photos and emergency coordinates",
      "Hike, cycling, and wildlife trail database with difficulty and terrain ratings",
      "SOS coordinate broadcasting and return-to-origin breadcrumb navigation"
    ],
    gradientTheme: "from-cyan-950/40 via-blue-950/40 to-slate-900/50",
    pricing: {
      startingPrice: "$350",
      basicPrice: "$350",
      standardPrice: "$865",
      premiumPrice: "$2,280",
      pricingQualification: "Final pricing may vary depending on features, backend requirements, APIs, integrations and publishing requirements."
    },
    demoUrl: ""
  }
];

// Append mobile applications into master projectsData
projectsData.push(...mobileProjectsData);

// Lookup map for O(1) resolution without duplicating project records
const projectByIdMap = new Map<string, ProjectItem>(
  projectsData.map((p) => [p.id, p])
);

const pickProjectsByIds = (ids: readonly string[]): ProjectItem[] =>
  ids
    .map((id) => projectByIdMap.get(id))
    .filter((p): p is ProjectItem => Boolean(p));

// ============================================================
// PRE-COMPUTED ORDERED COLLECTIONS (Zero Runtime Allocations)
// ============================================================

// 1. Websites -> A. Premium Websites
export const PREMIUM_WEBSITES_COLLECTION: ProjectItem[] = pickProjectsByIds([
  "hamhold-jewellery",
  "aaranya-silks",
  "tastybites",
  "homex"
]);

// 1. Websites -> B. Business Websites
export const BUSINESS_WEBSITES_COLLECTION: ProjectItem[] = pickProjectsByIds([
  "trendzo",
  "bizgrow",
  "travelaya",
  "mediwell",
  "learnhub"
]);

// 1. Websites -> C. UI-Optimized Websites
export const UI_OPTIMIZED_WEBSITES_COLLECTION: ProjectItem[] = pickProjectsByIds([
  "bookverse",
  "techzone",
  "bloom-beauty",
  "freshmart"
]);

// 2. Android Apps (SafeHer MUST be first)
export const ANDROID_APPS_COLLECTION: ProjectItem[] = pickProjectsByIds([
  "safeher-android",
  "skillhub-android",
  "snapstory-android",
  "fitzone-android"
]);

// 3. iOS Apps -> A. Lifestyle & Wellness Apps
export const IOS_LIFESTYLE_WELLNESS_COLLECTION: ProjectItem[] = pickProjectsByIds([
  "nourish-ios",
  "zenith-ios",
  "eventify-ios",
  "medsync-ios"
]);

// 3. iOS Apps -> B. Productivity & Everyday Apps
export const IOS_PRODUCTIVITY_EVERYDAY_COLLECTION: ProjectItem[] = pickProjectsByIds([
  "petpal-ios",
  "mindflow-ios",
  "taskly-ios",
  "terratrack-ios"
]);

