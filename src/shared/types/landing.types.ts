export type CmsImageFormat = {
  name?: string;
  hash?: string;
  ext?: string;
  mime?: string;
  path?: string | null;
  width: number;
  height: number;
  size?: number;
  sizeInBytes?: number;
  url: string;
};

export type CmsFormats =
  | (Partial<{
      thumbnail: CmsImageFormat;
      small: CmsImageFormat;
      medium: CmsImageFormat;
      large: CmsImageFormat;
    }> &
      Record<string, CmsImageFormat>)
  | null;

export type CmsMedia = {
  id: number;
  documentId: string;
  name: string;

  alternativeText?: string | null;
  caption?: string | null;

  width?: number | null;
  height?: number | null;

  formats?: CmsFormats;
  url: string; // "/uploads/..."

  // optional extras (video object của bạn đang có các field này)
  ext?: string;
  mime?: string;
  size?: number;
  previewUrl?: string | null;
  provider?: string | null;
  folderPath?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string | null;
};

export type LandingLine = {
  id: number;
  line_text: string;
  is_highlight: boolean | null;
};

export type LandingVideoItem = {
  id: number;
  videoUrl: string | null;
  video?: CmsMedia | null;
  thumbnail?: CmsMedia | null;
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
  locale: string | null;

  livestreams: unknown | null;

  stats: { id: number; number: string; label: string }[];
  features: { id: number; icon: string; text: string; ico?: string }[];
  videos: LandingVideoItem[];
  services: { id: number; icon: string; text: string; ico?: string }[];

  trustedBranches: CmsMedia[];
  partnerLogos: CmsMedia[]; // ✅ thêm theo JSON

  milestones: { id: number; year: string; highlights: string }[];

  branchTitle: LandingLine[];
  engineTitle: LandingLine[];
  engines: { id: number; icon: string; title: string; content: string; ico?: string }[];

  creatorTitle: LandingLine[];
  creatorStats: { id: number; number: string; label: string }[];
  creators: CmsMedia[];
  creatorOffers: { id: number; icon: string; text: string; ico?: string }[];
};

export type LandingResponse = {
  data: LandingPage;
};
