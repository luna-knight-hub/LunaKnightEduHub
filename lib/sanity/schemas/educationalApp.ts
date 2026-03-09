import { defineField, defineType } from 'sanity';

/**
 * Schema: EducationalApp (Ứng dụng giáo dục)
 *
 * Metadata cho mỗi ứng dụng/game trong "Kho Ứng Dụng" (/apps).
 * Không chứa logic game — chỉ chứa thông tin hiển thị + cấu hình.
 *
 * Ví dụ: "Mê cung tri thức", "Nối từ", "Quiz đấu trường" ...
 */
export const educationalAppSchema = defineType({
  name: 'educationalApp',
  title: 'Ứng dụng giáo dục',
  type: 'document',
  icon: () => '🎮',
  fields: [
    // ── Tên ứng dụng ──
    defineField({
      name: 'title',
      title: 'Tên ứng dụng',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(80),
    }),

    // ── Slug (dùng làm URL, ví dụ: /apps/knowledge-maze) ──
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 60,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, ''),
      },
      validation: (rule) => rule.required(),
    }),

    // ── Mô tả ngắn ──
    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      rows: 4,
      description: 'Mô tả ngắn gọn hiển thị trên card ở trang /apps.',
      validation: (rule) => rule.required().max(500),
    }),

    // ── Thumbnail (ảnh đại diện) ──
    defineField({
      name: 'thumbnail',
      title: 'Ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
      description: 'Ảnh hiển thị trên card (tỉ lệ 16:9 hoặc 4:3 khuyến nghị).',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),

    // ── Screenshots / Gallery ──
    defineField({
      name: 'screenshots',
      title: 'Ảnh chụp màn hình',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Chú thích',
              type: 'string',
            }),
          ],
        },
      ],
      description: 'Gallery ảnh giới thiệu ứng dụng (tối đa 6 ảnh).',
      validation: (rule) => rule.max(6),
    }),

    // ── Đối tượng sử dụng ──
    defineField({
      name: 'targetAudience',
      title: 'Đối tượng',
      type: 'string',
      options: {
        list: [
          { title: 'Lớp 3', value: 'grade-3' },
          { title: 'Lớp 4', value: 'grade-4' },
          { title: 'Lớp 5', value: 'grade-5' },
          { title: 'Lớp 3–5', value: 'grade-3-5' },
          { title: 'Mọi lứa tuổi', value: 'all-ages' },
        ],
      },
      initialValue: 'grade-3-5',
    }),

    // ── Môn học / Chủ đề ──
    defineField({
      name: 'subject',
      title: 'Môn học / Chủ đề',
      type: 'string',
      options: {
        list: [
          { title: 'Tin học', value: 'tin-hoc' },
          { title: 'Toán học', value: 'toan-hoc' },
          { title: 'Tiếng Việt', value: 'tieng-viet' },
          { title: 'Khoa học', value: 'khoa-hoc' },
          { title: 'Tổng hợp', value: 'tong-hop' },
        ],
      },
      initialValue: 'tin-hoc',
    }),

    // ── Loại ứng dụng ──
    defineField({
      name: 'appType',
      title: 'Loại ứng dụng',
      type: 'string',
      options: {
        list: [
          { title: 'Game giáo dục', value: 'game' },
          { title: 'Bài tập tương tác', value: 'interactive-exercise' },
          { title: 'Công cụ hỗ trợ', value: 'tool' },
          { title: 'Simulation', value: 'simulation' },
        ],
      },
      initialValue: 'game',
    }),

    // ── URL nội bộ (path trong app) ──
    defineField({
      name: 'appRoute',
      title: 'Route trong app',
      type: 'string',
      description:
        'Đường dẫn nội bộ, ví dụ: /apps/knowledge-maze. Để trống nếu app chưa được tích hợp.',
    }),

    // ── Tags / Từ khóa ──
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Từ khóa giúp lọc & tìm kiếm (ví dụ: maze, quiz, drag-drop).',
    }),

    // ── Trạng thái phát triển ──
    defineField({
      name: 'status',
      title: 'Trạng thái',
      type: 'string',
      options: {
        list: [
          { title: '🚧 Đang phát triển', value: 'in-development' },
          { title: '🧪 Beta', value: 'beta' },
          { title: '✅ Hoàn thiện', value: 'released' },
          { title: '📦 Lưu trữ', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'in-development',
    }),

    // ── Nổi bật (Featured) ──
    defineField({
      name: 'isFeatured',
      title: 'Nổi bật?',
      type: 'boolean',
      description: 'Hiển thị trên trang chủ và đầu danh sách.',
      initialValue: false,
    }),

    // ── Phiên bản ──
    defineField({
      name: 'version',
      title: 'Phiên bản',
      type: 'string',
      initialValue: '1.0.0',
    }),

    // ── Hướng dẫn sử dụng (rich text ngắn) ──
    defineField({
      name: 'instructions',
      title: 'Hướng dẫn sử dụng',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 3', value: 'h3' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Hướng dẫn nhanh cho học sinh & giáo viên.',
    }),

    // ── Thứ tự hiển thị ──
    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      description: 'Số nhỏ hơn hiển thị trước.',
      initialValue: 0,
    }),
  ],

  // ── Preview trong Sanity Studio ──
  preview: {
    select: {
      title: 'title',
      status: 'status',
      subject: 'subject',
      media: 'thumbnail',
      isFeatured: 'isFeatured',
    },
    prepare({ title, status, subject, media, isFeatured }) {
      const statusMap: Record<string, string> = {
        'in-development': '🚧',
        beta: '🧪',
        released: '✅',
        archived: '📦',
      };
      const subjectMap: Record<string, string> = {
        'tin-hoc': 'Tin học',
        'toan-hoc': 'Toán',
        'tieng-viet': 'Tiếng Việt',
        'khoa-hoc': 'Khoa học',
        'tong-hop': 'Tổng hợp',
      };
      const star = isFeatured ? '⭐ ' : '';
      return {
        title: `${star}${statusMap[status] || ''} ${title}`,
        subtitle: subjectMap[subject] || subject,
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Thứ tự hiển thị',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Tên (A → Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
