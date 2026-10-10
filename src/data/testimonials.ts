export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  service: string;
  review: string;
  rating: number;
  avatar: string; // Initials (e.g., "MC")
  image?: string; // Profile picture URL
  isSample: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "testimonial-1",
    name: "Madhumita Chauhan",
    role: "Business Consultant",
    company: "GrowthEdge Consulting",
    country: "India",
    flag: "🇮🇳",
    service: "Business Website & Automation",
    review:
      "ZYNOVA helped us turn our ideas into a clean and professional digital solution. The communication was clear, the workflow was structured, and the final result was easy for our team to work with.",
    rating: 4.5,
    avatar: "MC",
    image: "/images/testimonials/madhumita-chauhan.jpg",
    isSample: true
  },
  {
    id: "testimonial-2",
    name: "Owen Jane",
    role: "Operations Manager",
    company: "NextWave Solutions",
    country: "France",
    flag: "🇫🇷",
    service: "Excel Dashboard & Reporting",
    review:
      "The Excel dashboard made our reporting process much easier to understand. The data was organized clearly and the dashboard gave our team a much better view of our operational KPIs.",
    rating: 4.5,
    avatar: "OJ",
    image: "/images/testimonials/owen-jane.jpg",
    isSample: true
  },
  {
    id: "testimonial-3",
    name: "Vivaan Chaturvedi",
    role: "Founder",
    company: "UrbanScale Digital",
    country: "India",
    flag: "🇮🇳",
    service: "Power BI Dashboard",
    review:
      "We needed a simple way to visualize our business data, and the Power BI solution provided a much clearer picture of our performance. The dashboard was structured around the metrics that mattered to us.",
    rating: 5.0,
    avatar: "VC",
    image: "/images/testimonials/vivaan-chaturvedi.jpg",
    isSample: true
  },
  {
    id: "testimonial-4",
    name: "Robert Brown",
    role: "Project Manager",
    company: "Northstar Business Solutions",
    country: "United Kingdom",
    flag: "🇬🇧",
    service: "Web Application Development",
    review:
      "The development process was well organized from start to finish. ZYNOVA understood the requirements quickly and delivered a modern interface with a strong focus on usability.",
    rating: 4.0,
    avatar: "RB",
    image: "/images/testimonials/robert-brown.jpg",
    isSample: true
  },
  {
    id: "testimonial-5",
    name: "Valentina López",
    role: "Marketing Director",
    company: "BrightPath Media",
    country: "United States",
    flag: "🇺🇸",
    service: "📱 iOS App Development",
    review:
      "The iOS app development team delivered a smooth and well-structured application that aligned closely with our requirements. I particularly appreciated their attention to detail, responsive communication, and ability to turn our ideas into a polished iOS experience.",
    rating: 5.0,
    avatar: "VL",
    image: "/images/testimonials/valentina-lopez.jpg",
    isSample: true
  },
  {
    id: "testimonial-6",
    name: "Sophia Rodriguez",
    role: "Business Analyst",
    company: "NovaCore Consulting",
    country: "United States",
    flag: "🇺🇸",
    service: "Data Analytics & BI",
    review:
      "The reporting solution presented our data in a much more accessible way. The visualizations were clean, and the overall dashboard structure made it easier to identify important business metrics.",
    rating: 4.5,
    avatar: "SR",
    image: "/images/testimonials/sophia-rodriguez.jpg",
    isSample: true
  }
];
