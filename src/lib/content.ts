export type PublicationStatus = "published" | "under_review";
export type PublicationType = "journal_article" | "book" | "manuscript";

export type Publication = {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  publicationType: PublicationType;
  status: PublicationStatus;
  abstract?: string;
  doi?: string;
  isbn?: string;
  externalUrl?: string;
  featured?: boolean;
};

export type ProfileContent = {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  heroQuote: string;
  email: string;
  location: string;
  education: Array<{ year: string; institution: string; award: string }>;
  researchInterests: string[];
  teaching: string[];
  consultancy: string[];
  community: string[];
};

export type AppointmentType = {
  id: string;
  slug: string;
  name: string;
  description: string;
  durationMinutes: number;
  active: boolean;
};

export const profileContent: ProfileContent = {
  name: "Reuben David Kizito",
  title: "Scholar, researcher, lecturer and consultant",
  tagline: "Building practical knowledge for entrepreneurs, family businesses and institutions.",
  intro:
    "Reuben David Kizito is a Ugandan scholar and business consultant whose work connects entrepreneurship research with the everyday decisions that help people and organisations grow. His interests sit at the intersection of family enterprise, entrepreneurial action, strategy and sustainable business practice.",
  heroQuote:
    "Research should be useful enough to change the conversation and practical enough to change what people do next.",
  email: "",
  location: "Kampala, Uganda",
  education: [
    { year: "2019–present", institution: "Makerere University", award: "PhD Candidate, Business Administration (Entrepreneurship)" },
    { year: "2013–2015", institution: "Cavendish University Uganda", award: "Master of Business Administration (Entrepreneurship)" },
    { year: "2011–2013", institution: "Università Cattolica del Sacro Cuore, Milan", award: "MBA, Global Business and Sustainability (Social Entrepreneurship)" },
    { year: "2011", institution: "Law Development Centre", award: "Administrative Officers Law Certificate" },
    { year: "2000–2003", institution: "Ndejje University", award: "Bachelor of Business Administration (Marketing)" },
  ],
  researchInterests: [
    "Family business succession and intergenerational transfer",
    "Entrepreneurial action, alertness and embeddedness",
    "Social innovation and sustainable business practices",
    "Small and medium enterprise strategy",
    "Entrepreneurship education and new venture creation",
    "Marketing, consumer behaviour and service innovation",
  ],
  teaching: [
    "Strategic management and management theory",
    "Entrepreneurship and new venture creation",
    "Marketing, consumer behaviour and service marketing",
    "Agricultural entrepreneurship development",
    "Creativity, innovation and new product development",
    "Business communication, negotiation and business ethics",
  ],
  consultancy: [
    "Business strategy and operating-model design",
    "Entrepreneurship and new-business development",
    "Marketing, product development and service delivery",
    "Human resource and management systems",
    "Social-enterprise development for NGOs",
  ],
  community: [
    "Supporting social enterprises and community health initiatives",
    "Fundraising and sustainability for Oral Health Care Uganda",
    "Outreach programmes in Luwero, Buikwe, Kampala, Wakiso and Kalangala",
    "Board service for community and women-led organisations",
  ],
};

export const publications: Publication[] = [
  {
    id: "pub-2023-social-innovation",
    slug: "social-innovation-collaborative-competence-sustainable-business",
    title: "Social innovation: A mediator between collaborative competence and sustainable business practices",
    authors: ["Kintu, G. J.", "Kizito, R. D.", "Sekitoleko, E."],
    year: 2023,
    venue: "Journal of Business and Management Sciences, 11(2), 161–168",
    publicationType: "journal_article",
    status: "published",
    doi: "10.12691/jbms-11-2-5",
    externalUrl: "https://doi.org/10.12691/jbms-11-2-5",
    featured: true,
  },
  {
    id: "pub-2024-family-business-transfer",
    slug: "entrepreneurial-intentions-family-business-generational-transfers",
    title: "Entrepreneurial intentions and family business generational transfers: The mediating role of re-organization among small and medium enterprises",
    authors: ["Mayanja, S. S.", "Kizito, R. D.", "Mutebi, H.", "Zombeire, R. K."],
    year: 2024,
    venue: "IIMBG Journal of Sustainable Business and Innovation, 2(2), 163–185",
    publicationType: "journal_article",
    status: "published",
    doi: "10.1108/IJSBI-03-2024-0016",
    externalUrl: "https://doi.org/10.1108/IJSBI-03-2024-0016",
    featured: true,
  },
  {
    id: "pub-2025-psychological-contract",
    slug: "psychological-contract-succession-planning-family-businesses",
    title: "Psychological contract and succession planning among small and medium family-owned businesses in Uganda",
    authors: ["Kizito, R. D.", "Matama, R.", "Bagire, V.", "Nabeta, I. N.", "Kyazze, L."],
    year: 2025,
    venue: "Cureus Journal of Business and Economics, 2, es44404-025-06422-0",
    publicationType: "journal_article",
    status: "published",
    doi: "10.7759/s44404-025-06422-0",
    externalUrl: "https://doi.org/10.7759/s44404-025-06422-0",
    featured: true,
  },
  {
    id: "pub-2026-family-embeddedness",
    slug: "family-embeddedness-intergenerational-transfers-reorganization",
    title: "Family embeddedness and intergenerational transfers: The mediating role of reorganization among small and medium family-owned enterprises",
    authors: ["Mayanja, S. S.", "Nkambwe, I.", "Kizito, R. D.", "Nankabirwa, A."],
    year: 2026,
    venue: "Cogent Business & Management, 13(1), Article 2607775",
    publicationType: "journal_article",
    status: "published",
    doi: "10.1080/23311975.2025.2607775",
    externalUrl: "https://doi.org/10.1080/23311975.2025.2607775",
  },
  {
    id: "pub-2026-entrepreneurial-success",
    slug: "demonstrating-entrepreneurial-success-storytelling-ugandan-microentrepreneurs",
    title: "Demonstrating entrepreneurial success: A storytelling approach among Ugandan microentrepreneurs",
    authors: ["Iga, D.", "Mayanja, S. S.", "Byarugaba, J. M.", "Kizito, R. D."],
    year: 2026,
    venue: "Strategic Business Research, 2(1), Article 100108",
    publicationType: "journal_article",
    status: "published",
    doi: "10.1016/j.sbr.2026.100108",
    externalUrl: "https://doi.org/10.1016/j.sbr.2026.100108",
  },
  {
    id: "pub-2026-entrepreneurial-alertness",
    slug: "entrepreneurial-alertness-intergenerational-transfers",
    title: "Entrepreneurial alertness and intergenerational transfers among family-owned businesses in Uganda: The mediating role of family embeddedness",
    authors: ["Nkambwe, I.", "Mayanja, S. S.", "Kizito, R. D.", "Nankabirwa, A."],
    year: 2026,
    venue: "Strategic Business Research, 2, Article 100178",
    publicationType: "journal_article",
    status: "published",
    doi: "10.1016/j.sbr.2026.100178",
    externalUrl: "https://doi.org/10.1016/j.sbr.2026.100178",
  },
  {
    id: "pub-review-bricolage",
    slug: "entrepreneurial-bricolage-qualitative-analysis",
    title: "Entrepreneurial bricolage: A qualitative analysis of microentrepreneurs in an African context",
    authors: ["Iga, D.", "Ssekajja, M. S.", "Kizito, R. D.", "Musoke, D. H. B."],
    year: 2026,
    venue: "Under review in Cogent Business & Management",
    publicationType: "manuscript",
    status: "under_review",
  },
  {
    id: "pub-review-amplifying",
    slug: "amplifying-succession-planning-storytelling",
    title: "Amplifying succession planning in small and medium family-owned enterprises in Uganda: A storytelling approach in an African family enterprise context",
    authors: ["David Kizito, R.", "Bagire, V.", "Nabeeta, D. I. N.", "Kyazze, D. L."],
    year: 2026,
    venue: "Under review in Strategic Business Research",
    publicationType: "manuscript",
    status: "under_review",
  },
  {
    id: "pub-review-orientation",
    slug: "entrepreneurial-orientation-succession-planning",
    title: "Entrepreneurial orientation and succession planning among small and medium family-owned businesses in Uganda",
    authors: ["Kizito, R. D.", "Matama, R.", "Bagire, V.", "Nabeeta, I. N.", "Kyazze, L."],
    year: 2025,
    venue: "Under review in Cogent Business & Management",
    publicationType: "manuscript",
    status: "under_review",
  },
  {
    id: "book-2026-entrepreneurial-actions",
    slug: "entrepreneurial-actions-succession-planning-family-businesses",
    title: "Entrepreneurial actions and succession planning in family businesses in Uganda",
    authors: ["Kizito, R. D."],
    year: 2026,
    venue: "Global Edit, July 2026",
    publicationType: "book",
    status: "published",
    isbn: "978-620-3-004167-5",
    externalUrl: "https://www.morebooks.shop/gb/translation_bundle_05640038a40",
    featured: true,
  },
];

export const appointmentTypes: AppointmentType[] = [
  { id: "research", slug: "research-discussion", name: "Research discussion", description: "Discuss a research question, emerging idea or academic collaboration.", durationMinutes: 45, active: true },
  { id: "academic", slug: "academic-consultation", name: "Academic consultation", description: "A focused conversation about entrepreneurship, management or business research.", durationMinutes: 45, active: true },
  { id: "consulting", slug: "entrepreneurship-consultation", name: "Entrepreneurship consultation", description: "Practical guidance for founders, family businesses and social enterprises.", durationMinutes: 60, active: true },
  { id: "speaking", slug: "speaking-teaching-engagement", name: "Speaking or teaching engagement", description: "Explore a lecture, workshop, keynote or teaching collaboration.", durationMinutes: 30, active: true },
];

export function getPublication(slug: string) {
  return publications.find((publication) => publication.slug === slug);
}

export function getPublicationsByType(type: PublicationType) {
  return publications.filter((publication) => publication.publicationType === type);
}

export function formatAuthors(authors: string[]) {
  return authors.join(", ");
}

export function labelForType(type: PublicationType) {
  if (type === "book") return "Book";
  if (type === "manuscript") return "Manuscript";
  return "Journal article";
}
