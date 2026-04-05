export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  features: string[];
  whatWeAccept: string[];
  whatWeDontAccept: string[];
  faqs: { question: string; answer: string }[];
  seo: { title: string; description: string };
}

export interface ServiceArea {
  slug: string;
  city: string;
  county: string;
  state: string;
  description: string;
  nearbyAreas: string[];
  seo: { title: string; description: string };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export interface QuizOption {
  label: string;
  value: string;
  service?: string;
}

export interface QuizStep {
  id: string;
  question: string;
  type: 'singleSelect' | 'multiSelect';
  options: QuizOption[];
}
