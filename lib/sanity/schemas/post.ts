import { defineField, defineType } from 'sanity';

/**
 * Schema: Post (Bài viết Blog)
 *
 * Lưu trữ tất cả bài viết blog trong Sanity.
 * Sử dụng Portable Text cho nội dung (hỗ trợ rich text, code blocks, embeds).
 */
export const postSchema = defineType({
  name: 'post',
  title: 'Bài viết',
  type: 'document',
  icon: () => '📝',
  fields: [
    // ── Tiêu đề ──
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(120),
    }),

    // ── Slug (URL-safe) ──
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, ''),
      },
      validation: (rule) => rule.required(),
    }),

    // ── Tác giả ──
    defineField({
      name: 'author',
      title: 'Tác giả',
      type: 'string',
      initialValue: 'Ngô Quang Hải',
    }),

    // ── Ảnh đại diện ──
    defineField({
      name: 'mainImage',
      title: 'Ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text (mô tả ảnh cho SEO)',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // ── Danh mục ──
    defineField({
      name: 'categories',
      title: 'Danh mục',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Tin học', value: 'tin-hoc' },
          { title: 'Lập trình', value: 'lap-trinh' },
          { title: 'Giáo dục', value: 'giao-duc' },
          { title: 'Công nghệ', value: 'cong-nghe' },
          { title: 'Sáng kiến kinh nghiệm', value: 'sang-kien' },
          { title: 'Khác', value: 'khac' },
        ],
      },
    }),

    // ── Mô tả ngắn (Excerpt) ──
    defineField({
      name: 'excerpt',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
      description: 'Hiển thị trong danh sách bài viết và meta description (SEO).',
      validation: (rule) => rule.max(300),
    }),

    // ── Nội dung chính (Portable Text) ──
    defineField({
      name: 'body',
      title: 'Nội dung',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Mở tab mới?',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        // ── Hỗ trợ nhúng ảnh trong bài viết ──
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Chú thích',
              type: 'string',
            }),
          ],
        },
        // ── Code blocks ──
        {
          type: 'code',
          title: 'Code Block',
          options: {
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'Python', value: 'python' },
              { title: 'SQL', value: 'sql' },
              { title: 'Bash', value: 'bash' },
              { title: 'JSON', value: 'json' },
            ],
          },
        },
      ],
    }),

    // ── Ngày đăng ──
    defineField({
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // ── Trạng thái ──
    defineField({
      name: 'isPublished',
      title: 'Đã xuất bản?',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  // ── Preview trong Sanity Studio ──
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      publishedAt: 'publishedAt',
      isPublished: 'isPublished',
    },
    prepare({ title, author, media, publishedAt, isPublished }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('vi-VN')
        : 'Chưa đặt ngày';
      const status = isPublished ? '✅' : '📝';
      return {
        title: `${status} ${title}`,
        subtitle: `${author} · ${date}`,
        media,
      };
    },
  },

  // ── Sắp xếp mặc định trong Studio ──
  orderings: [
    {
      title: 'Ngày đăng (mới nhất)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Tiêu đề (A → Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
