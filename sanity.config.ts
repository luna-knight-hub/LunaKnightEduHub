'use client';

/**
 * Sanity Studio Configuration
 *
 * Studio được nhúng trực tiếp trong Next.js tại route /studio.
 * Dùng Sanity Studio để quản lý nội dung Blog và App metadata.
 *
 * @see https://www.sanity.io/docs/configuration
 */
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { sanityConfig } from '@/lib/sanity/env';
import { schemaTypes } from '@/lib/sanity/schemas';

export default defineConfig({
  name: 'luna-knight-edu-hub',
  title: 'LunaKnight EduHub',

  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,

  basePath: '/studio', // Studio sẽ chạy tại localhost:3000/studio

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nội dung')
          .items([
            // ── Nhóm: Blog ──
            S.listItem()
              .title('📝 Bài viết')
              .schemaType('post')
              .child(
                S.documentTypeList('post')
                  .title('Tất cả bài viết')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
              ),

            S.divider(),

            // ── Nhóm: Ứng dụng ──
            S.listItem()
              .title('🎮 Ứng dụng giáo dục')
              .schemaType('educationalApp')
              .child(
                S.documentTypeList('educationalApp')
                  .title('Tất cả ứng dụng')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }]),
              ),
          ]),
    }),

    // Vision tool — test GROQ queries trực tiếp trong Studio
    visionTool({ defaultApiVersion: sanityConfig.apiVersion }),

    // Code input — hỗ trợ code blocks trong bài viết
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
});
