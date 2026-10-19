export interface SiteConfig {
  brandName: string;
  tagline: string;
  positioning: string;
  email: string;
  phone: string;
  phoneTel: string;
  location: string;
  whatsappGroupURL: string;
  whatsappChatURL: string;
  founder: {
    name: string;
    role: string;
    location: string;
    bio: string;
  };
  metrics: {
    responseTime: string;
    industriesServed: string;
    projectsServed: string;
    clientOwnership: string;
  };
  contact: {
    email: string;
    phone: string;
    phoneTel: string;
    location: string;
    responseGuarantee: string;
    whatsappGroupURL: string;
    whatsappChatURL: string;
    formSubmitEndpoint: string;
    contactApi: string;
    bookingApi: string;
  };
  bookingURL: string;
  fiverrURL: string;
  freelancerURL: string;
  truelancerURL: string;
  peoplePerHourURL: string;
  upworkURL: string;
  freelancePlatforms: {
    fiverr: string;
    freelancer: string;
    truelancer: string;
    peoplePerHour: string;
    upwork: string;
  };
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    instagram: string;
  };
  navigation: Array<{ name: string; href: string }>;
}

export const siteConfig: SiteConfig = {
  brandName: "ZYNOVA",
  tagline: "Building Digital Solutions. Empowering Business Growth.",
  positioning: "Premium Digital Solutions & Software Development",
  email: "team.zynova@gmail.com",
  phone: "+91 70036 60883",
  phoneTel: "+917003660883",
  location: "West Bengal, India",
  whatsappGroupURL: "https://chat.whatsapp.com/invite/zynova",
  whatsappChatURL: "https://wa.me/917003660883?text=Hello%20ZYNOVA%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project%20enquiry.",
  founder: {
    name: "Amit Halder",
    role: "Founder & Managing Director",
    location: "West Bengal, India",
    bio: "Engineering high-performance digital products, intelligent automation workflows, and actionable business intelligence for forward-thinking enterprises."
  },
  metrics: {
    responseTime: "Within 12 Hours",
    industriesServed: "8+",
    projectsServed: "35+",
    clientOwnership: "100%"
  },
  contact: {
    email: "team.zynova@gmail.com",
    phone: "+91 70036 60883",
    phoneTel: "+917003660883",
    location: "West Bengal, India",
    responseGuarantee: "Within 12 Hours",
    whatsappGroupURL: "https://chat.whatsapp.com/invite/zynova",
    whatsappChatURL: "https://wa.me/917003660883?text=Hello%20ZYNOVA%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project%20enquiry.",
    formSubmitEndpoint: "https://formsubmit.co/ajax/team.zynova@gmail.com",
    contactApi: "/api/contact",
    bookingApi: "/api/bookings"
  },
  bookingURL: "#book-call",
  fiverrURL: "https://tinyurl.com/5eadbvh9",
  freelancerURL: "#",
  truelancerURL: "#",
  peoplePerHourURL: "#",
  upworkURL: "https://tinyurl.com/5be2x75x",
  freelancePlatforms: {
    fiverr: "https://tinyurl.com/5eadbvh9",
    freelancer: "#",
    truelancer: "#",
    peoplePerHour: "#",
    upwork: "https://tinyurl.com/5be2x75x"
  },
  socialLinks: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    instagram: "#"
  },
  navigation: [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Why Us", href: "#why-zynova" },
    { name: "Contact", href: "#contact" }
  ]
};
