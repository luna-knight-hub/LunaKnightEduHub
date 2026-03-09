/**
 * Sanity environment variables — validated at build time.
 * Import this file wherever you need Sanity config values.
 */

export const sanityConfig = {
  projectId: assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID — hãy điền vào .env.local',
  ),
  dataset: assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    'Missing env: NEXT_PUBLIC_SANITY_DATASET — hãy điền vào .env.local',
  ),
  apiVersion: '2026-03-09', // Dùng ngày cố định → kết quả query nhất quán
  /**
   * `useCdn: true`  → nhanh nhất, dùng cho public data (blog, app list).
   * `useCdn: false` → realtime, dùng khi cần thấy bản nháp (preview mode).
   */
  useCdn: process.env.NODE_ENV === 'production',
} as const;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === '') {
    throw new Error(errorMessage);
  }
  return v;
}
