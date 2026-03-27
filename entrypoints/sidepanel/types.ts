export type SavedItem = {
  id: string;
  type: 'text' | 'link' | 'image';
  content: string;
  linkUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  pageTitle?: string;
  pageUrl?: string;
  createdAt?: string;
};

export type ItemFilter = SavedItem['type'] | 'all';
