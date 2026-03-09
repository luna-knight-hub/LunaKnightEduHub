/**
 * GROQ Queries — Tập trung tất cả queries ở đây.
 * Import vào Server Components / Route Handlers để fetch dữ liệu.
 *
 * @see https://www.sanity.io/docs/groq
 */

// ═══════════════════════════════════════════
// POST QUERIES
// ═══════════════════════════════════════════

/** Lấy danh sách bài viết đã xuất bản (cho trang /blog) */
export const POSTS_QUERY = `*[_type == "post" && isPublished == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  mainImage,
  categories,
  excerpt,
  publishedAt
}`;

/** Lấy chi tiết bài viết theo slug (cho trang /blog/[slug]) */
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug && isPublished == true][0] {
  _id,
  title,
  slug,
  author,
  mainImage,
  categories,
  excerpt,
  body,
  publishedAt
}`;

/** Lấy tất cả slugs (cho generateStaticParams) */
export const POST_SLUGS_QUERY = `*[_type == "post" && isPublished == true].slug.current`;

// ═══════════════════════════════════════════
// EDUCATIONAL APP QUERIES
// ═══════════════════════════════════════════

/** Lấy danh sách apps có trạng thái released hoặc beta (cho trang /apps) */
export const APPS_QUERY = `*[_type == "educationalApp" && status in ["released", "beta"]] | order(order asc) {
  _id,
  title,
  slug,
  description,
  thumbnail,
  targetAudience,
  subject,
  appType,
  appRoute,
  tags,
  status,
  isFeatured,
  version
}`;

/** Lấy apps nổi bật (cho trang chủ) */
export const FEATURED_APPS_QUERY = `*[_type == "educationalApp" && isFeatured == true && status in ["released", "beta"]] | order(order asc) [0...4] {
  _id,
  title,
  slug,
  description,
  thumbnail,
  appRoute,
  status
}`;

/** Lấy chi tiết app theo slug (cho trang /apps/[slug]) */
export const APP_BY_SLUG_QUERY = `*[_type == "educationalApp" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  thumbnail,
  screenshots,
  targetAudience,
  subject,
  appType,
  appRoute,
  tags,
  status,
  isFeatured,
  version,
  instructions
}`;

/** Lấy tất cả app slugs (cho generateStaticParams) */
export const APP_SLUGS_QUERY = `*[_type == "educationalApp" && status in ["released", "beta"]].slug.current`;
