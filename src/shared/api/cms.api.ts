import cmsApi from "@/services/cmsApi";

// Campaigns
export const getCampaigns = async () => (await cmsApi.get("/campaigns")).data;

export const getCampaignDetail = async (documentId: string) =>
  (await cmsApi.get(`/campaigns/${documentId}`)).data;

// Categories
export const getCategories = async () => (await cmsApi.get("/categories")).data;

// Blogs top viewed
export const getBlogsTopViewed = async () => (await cmsApi.get("/blogs/top-viewed")).data;

// Blogs search/filter
export const searchBlogs = async (params: { category?: string; q?: string }) =>
  (await cmsApi.get("/blogs/search", { params })).data;

// Blog detail
export const getBlogDetail = async (documentId: string) =>
  (await cmsApi.get(`/blogs/${documentId}`)).data;

// Related
export const getBlogRelated = async (documentId: string) =>
  (await cmsApi.get(`/blogs/${documentId}/related`)).data;

// Increase view
export const increaseBlogView = async (documentId: string) =>
  (await cmsApi.post(`/blogs/${documentId}/view`)).data;

// Next/Prev navigation
export const getBlogNavigation = async (documentId: string) =>
  (await cmsApi.get(`/blogs/${documentId}/navigation`)).data;
