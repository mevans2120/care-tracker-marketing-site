import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorInitial',
      title: 'Author Initial (for avatar)',
      type: 'string',
      validation: (Rule) => Rule.required().max(2),
    }),
    defineField({
      name: 'detail',
      title: 'Detail (e.g., procedure type)',
      type: 'string',
      description: 'E.g., "Knee replacement recovery"',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'detail',
      featured: 'featured',
      order: 'order',
    },
    prepare({ title, subtitle, featured, order }) {
      return {
        title: featured ? `⭐ ${order}. ${title}` : `${order}. ${title}`,
        subtitle,
      }
    },
  },
})
