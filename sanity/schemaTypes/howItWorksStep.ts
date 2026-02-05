import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'howItWorksStep',
  title: 'How It Works Step',
  type: 'document',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visualType',
      title: 'Visual Type',
      type: 'string',
      options: {
        list: [
          { title: 'QR Code / Scan', value: 'scan' },
          { title: 'Download', value: 'download' },
          { title: 'Follow / Checklist', value: 'follow' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visualLabel',
      title: 'Visual Label',
      type: 'string',
      description: 'Text shown below the icon in the visual area',
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
      title: 'Step Number',
      name: 'stepAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      stepNumber: 'stepNumber',
    },
    prepare({ title, stepNumber }) {
      return {
        title: `Step ${stepNumber}: ${title}`,
      }
    },
  },
})
