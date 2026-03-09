/**
 * Sanity — Public API
 *
 * Tất cả exports liên quan đến Sanity đều đi qua file này.
 * Import: `import { sanityFetch, urlFor, POSTS_QUERY } from '@/lib/sanity'`
 */

export { sanityClient, sanityFetch } from './client';
export { sanityConfig } from './env';
export { urlFor } from './image';
export {
  APP_BY_SLUG_QUERY,
  APP_SLUGS_QUERY,
  APPS_QUERY,
  FEATURED_APPS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
} from './queries';
export type {
  AppCard,
  EducationalApp,
  Post,
  PostCard,
  SanityImage,
  SanitySlug,
} from './types';
