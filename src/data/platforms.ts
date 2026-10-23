import { siteConfig } from "../config/siteConfig";

export interface PlatformService {
  number: string;
  title: string;
  url: string;
}

export interface FreelancePlatform {
  id: string;
  name: string;
  configKey: keyof typeof siteConfig.freelancePlatforms;
  brandColor: string;
  profileUrl: string;
  hasServiceList?: boolean;
  services?: PlatformService[];
}

export const platformsData: FreelancePlatform[] = [
  {
    id: "upwork",
    name: "Upwork",
    configKey: "upwork",
    brandColor: "#14A800",
    profileUrl: "https://tinyurl.com/5be2x75x",
    hasServiceList: true,
    services: [
      {
        number: "01",
        title: "Laravel",
        url: "https://tinyurl.com/yc4u4nnz"
      },
      {
        number: "02",
        title: "Full-Stack Development",
        url: "https://tinyurl.com/bdrwtjsf"
      },
      {
        number: "03",
        title: "Back-end Development",
        url: "https://tinyurl.com/2uz5rf58"
      },
      {
        number: "04",
        title: "Front-end Development",
        url: "https://tinyurl.com/2ubd4mjy"
      },
      {
        number: "05",
        title: "Shopify Development",
        url: "https://tinyurl.com/3sxs5faw"
      }
    ]
  },
  {
    id: "fiverr",
    name: "Fiverr",
    configKey: "fiverr",
    brandColor: "#1DBF73",
    profileUrl: "https://tinyurl.com/5eadbvh9",
    hasServiceList: true,
    services: [
      {
        number: "01",
        title: "Excel",
        url: "https://tinyurl.com/y6sbychc"
      },
      {
        number: "02",
        title: "Laravel",
        url: "https://tinyurl.com/e7k3crb3"
      },
      {
        number: "03",
        title: "FullStack",
        url: "https://tinyurl.com/myz5mf5c"
      },
      {
        number: "04",
        title: "Android/iOS App Development",
        url: "https://tinyurl.com/mr22ywnn"
      },
      {
        number: "05",
        title: "Laravel",
        url: "https://tinyurl.com/mp6x3xfh"
      },
      {
        number: "06",
        title: "FullStack",
        url: "https://tinyurl.com/yanyfnzb"
      },
      {
        number: "07",
        title: "Android/iOS App Development",
        url: "https://tinyurl.com/2p9ftvj"
      },
      {
        number: "08",
        title: "Wordpress Web",
        url: "https://tinyurl.com/y8vkey29"
      }
    ]
  },
  {
    id: "freelancer",
    name: "Freelancer",
    configKey: "freelancer",
    brandColor: "#29B2FE",
    profileUrl: "https://www.freelancer.com/",
    hasServiceList: true,
    services: [
      {
        number: "01",
        title: "Full-Stack & Web Applications",
        url: "#contact"
      },
      {
        number: "02",
        title: "Custom Software Architecture",
        url: "#contact"
      }
    ]
  },
  {
    id: "peoplePerHour",
    name: "PeoplePerHour",
    configKey: "peoplePerHour",
    brandColor: "#FF6600",
    profileUrl: "https://www.peopleperhour.com/",
    hasServiceList: true,
    services: [
      {
        number: "01",
        title: "Frontend & UI/UX Engineering",
        url: "#contact"
      },
      {
        number: "02",
        title: "Backend & Cloud Architecture",
        url: "#contact"
      }
    ]
  },
  {
    id: "truelancer",
    name: "Truelancer",
    configKey: "truelancer",
    brandColor: "#2B7DE9",
    profileUrl: "https://www.truelancer.com/",
    hasServiceList: true,
    services: [
      {
        number: "01",
        title: "Enterprise Software Engineering",
        url: "#contact"
      },
      {
        number: "02",
        title: "Data Analytics & Dashboards",
        url: "#contact"
      }
    ]
  }
];
