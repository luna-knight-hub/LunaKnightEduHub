import { createClient, type QueryParams } from 'next-sanity';

import { sanityConfig } from './env';

/**
 * Sanity client dùng cho Server Components & Route Handlers.
 * Mặc định dùng CDN (production) để tối ưu tốc độ.
 */
export const sanityClient = createClient(sanityConfig);

/**
 * Helper fetch GROQ — bọc gọn error handling + type inference.
 *
 * @example
 * ```ts
 * const posts = await sanityFetch<Post[]>({
 *   query: `*[_type == "post"] | order(publishedAt desc)`,
 *   tags: ['post'],
 * });
 * ```
 */
export async function sanityFetch<T = unknown>({
  query,
  params = {},
  tags = [],
  revalidate = 60, // mặc định revalidate mỗi 60s (ISR)
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? revalidate : false,
      tags,
    },
  });
}
