/**
 * TypeScript types cho Sanity documents.
 * Dùng khi fetch dữ liệu từ GROQ queries.
 *
 * Lưu ý: Đây là types cho data TRẢ VỀ từ query (không phải schema input).
 * Nếu dùng Sanity TypeGen trong tương lai, có thể tự sinh ra từ schema.
 */

import type { PortableTextBlock } from 'sanity';

// ── Sanity Image ──
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// ── Sanity Slug ──
export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// ── Post ──
export interface Post {
  _id: string;
  title: string;
  slug: SanitySlug;
  author: string;
  mainImage?: SanityImage;
  categories?: string[];
  excerpt?: string;
  body?: PortableTextBlock[];
  publishedAt: string;
  isPublished: boolean;
}

/** Post card — dữ liệu trả về cho danh sách (không có body) */
export type PostCard = Omit<Post, 'body' | 'isPublished'>;

// ── Educational App ──
export interface EducationalApp {
  _id: string;
  title: string;
  slug: SanitySlug;
  description: string;
  thumbnail?: SanityImage;
  screenshots?: SanityImage[];
  targetAudience?: string;
  subject?: string;
  appType?: string;
  appRoute?: string;
  tags?: string[];
  status: 'in-development' | 'beta' | 'released' | 'archived';
  isFeatured: boolean;
  version?: string;
  instructions?: PortableTextBlock[];
  order: number;
}

/** App card — dữ liệu trả về cho danh sách (không có instructions, screenshots) */
export type AppCard = Omit<EducationalApp, 'instructions' | 'screenshots'>;
