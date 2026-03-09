import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';

import { sanityConfig } from './env';

const builder = imageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

/**
 * Tạo URL tối ưu cho ảnh từ Sanity.
 *
 * @example
 * ```ts
 * <Image
 *   src={urlFor(post.mainImage).width(800).height(400).format('webp').url()}
 *   alt={post.title}
 * />
 * ```
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
