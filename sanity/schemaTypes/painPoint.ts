import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'painPoint',
  title: 'Pain Point',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Papers (Stack)', value: 'papers' },
          { title: 'Uncertain (Question)', value: 'uncertain' },
          { title: 'Worried (Clock)', value: 'worried' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
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
      title: 'text',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title: `${order}. ${title}`,
      }
    },
  },
})
