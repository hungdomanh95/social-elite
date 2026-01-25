export type CmsMedia = {
  id: number;
  documentId: string;
  name: string;
  width?: number;
  height?: number;
  url: string; // "/uploads/..."
  formats?: any;
};

export type LandingLine = {
  id: number;
  line_text: string;
  is_highlight: boolean | null;
};

export type LandingPage = {
  id: number;
  documentId: string;

  title: string;
  summaryHighlight: string;
  highlight: string; // HTML

  serviceTitle: string;

  missionTitle: string;
  missionHighlight: string;
  missionContent: string; // text

  partnerTitle: string;
  partnerHighlight: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  stats: { id: number; number: string; label: string }[];
  features: { id: number; icon: string; text: string }[];
  videos: { id: number; videoUrl: string; video?: any; thumbnail?: any }[];
  services: { id: number; icon: string; text: string }[];

  trustedBranches: CmsMedia[];
  milestones: { id: number; year: string; highlights: string }[];

  branchTitle: LandingLine[];
  engineTitle: LandingLine[];
  engines: { id: number; icon: string; title: string; content: string }[];

  creatorTitle: LandingLine[];
  creatorStats: { id: number; number: string; label: string }[];
  creators: CmsMedia[];
  creatorOffers: { id: number; icon: string; text: string }[];
};

export type LandingResponse = { data: LandingPage };
