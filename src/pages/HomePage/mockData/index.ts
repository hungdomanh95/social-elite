import brand1 from "@/assets/images/brand/brand1.png";
import brand2 from "@/assets/images/brand/brand2.png";
import brand3 from "@/assets/images/brand/brand3.png";
import brand4 from "@/assets/images/brand/brand4.png";

import talent1 from "@/assets/images/talents/talent1.png";
import talent2 from "@/assets/images/talents/talent2.png";
import talent3 from "@/assets/images/talents/talent3.png";
import talent4 from "@/assets/images/talents/talent4.png";
import talent5 from "@/assets/images/talents/talent5.png";
import talent6 from "@/assets/images/talents/talent6.png";
import talent7 from "@/assets/images/talents/talent7.png";
import talent8 from "@/assets/images/talents/talent8.png";


export type Talent = {
  id: string | number;
  name: string;
  imageSrc: string;
  alt?: string;
  href?: string;
  position?: number;
};

export const leftTalents: Talent[] = [
  {
    id: 1,
    name: "Talent 1",
    imageSrc: talent1,
    alt: "Talent 1",
    href: "#",
    position: 1,
  },
  {
    id: 2,
    name: "Talent 2",
    imageSrc: talent2,
    alt: "Talent 2",
    href: "#",
    position: 2,
  },
  {
    id: 3,
    name: "Talent 3",
    imageSrc: talent3,
    alt: "Talent 3",
    href: "#",
    position: 4,
  },
  {
    id: 4,
    name: "Talent 4",
    imageSrc: talent4,
    alt: "Talent 4",
    href: "#",
    position: 3,
  },
];

export const rightTalents: Talent[] = [
  {
    id: 5,
    name: "Talent 5",
    imageSrc: talent5,
    alt: "Talent 5",
    href: "#",
  },
  {
    id: 6,
    name: "Talent 6",
    imageSrc: talent6,
    alt: "Talent 6",
    href: "#",
  },
  {
    id: 7,
    name: "Talent 7",
    imageSrc: talent7,
    alt: "Talent 7",
    href: "#",
  },
  {
    id: 8,
    name: "Talent 8",
    imageSrc: talent8,
    alt: "Talent 8",
    href: "#",
  },
];

export type CapacityItem = {
  key:
    | "AGENCY_SERVICE"
    | "SOCIAL_CHANNEL_NETWORK"
    | "CREATOR_BUSINESS_MANAGEMENT"
    | "COMPLEX_STUDIO_SERVICE"
    | "MCN";
  title: string; // dùng \n để xuống dòng
  icon: string;
};

export const CAPACITY_ITEMS:CapacityItem[] = [
  {
    key: "AGENCY_SERVICE",
    title: "Agency Service",
    icon: "BadgeCheck", // huy hiệu/chứng nhận
  },
  {
    key: "SOCIAL_CHANNEL_NETWORK",
    title: "Social Channel\nNetwork",
    icon: "Users", // network người dùng
  },
  {
    key: "CREATOR_BUSINESS_MANAGEMENT",
    title: "Creator Business\nManagement",
    icon: "Briefcase", // quản lý/kinh doanh
  },
  {
    key: "COMPLEX_STUDIO_SERVICE",
    title: "Complex Studio\nService",
    icon: "Camera", // studio
  },
  {
    key: "MCN",
    title: "Multi-Channel Network\n(MCN)",
    icon: "Monitor", // màn hình/MCN
  },
];


const DATA_TRUST_BY = [
  {
    id: 1,
    img: brand1,
    alt: 'brand 1',
  },
  {
    id: 2,
    img: brand2,
    alt: 'brand 2',
  },
  {
    id: 3,
    img: brand3,
    alt: 'brand 3',
  },
  {
    id: 4,
    img: brand4,
    alt: 'brand 4',
  },
];

export default DATA_TRUST_BY;

export type SuccessStory = {
  id: string | number;
  title: string;
  category: string;
  imageSrc?: string; // optional
  href?: string;
};

export const SUCCESS_STORIES: SuccessStory[] = [
  { id: 1, title: "Fashion Week Vietnam", category: "Fashion & Lifestyle" },
  { id: 2, title: "Tech Launch Campaign", category: "Technology" },
  { id: 3, title: "Beauty Brand Collab", category: "Beauty & Wellness" },
  { id: 4, title: "Lifestyle Brand", category: "Lifestyle" },
];

export const TICKER_TRENDING = [
  { label: "TRENDING", icon: "TrendingUp" },
  { label: "PERSONAL OPERATION", icon: "Briefcase" },
  { label: "TECHNOLOGY", icon: "Cpu" },
  { label: "SOCIAL FIRST", icon: "Users" },
  { label: "DIGITAL CONTENT", icon: "Monitor" },
];