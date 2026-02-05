import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
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
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Timeline (Calendar)', value: 'timeline' },
          { title: 'Milestones (Star)', value: 'milestones' },
          { title: 'Reminders (Bell)', value: 'reminders' },
          { title: 'Emergency (Heart Alert)', value: 'emergency' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorTheme',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Blue)', value: 'primary' },
          { title: 'Healing (Teal)', value: 'healing' },
          { title: 'Accent (Peach)', value: 'accent' },
          { title: 'Error (Red)', value: 'error' },
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
      title: 'title',
      order: 'order',
      iconType: 'iconType',
    },
    prepare({ title, order, iconType }) {
      const icons: Record<string, string> = {
        timeline: '📅',
        milestones: '⭐',
        reminders: '🔔',
        emergency: '❤️',
      }
      return {
        title: `${order}. ${title}`,
        subtitle: icons[iconType] || iconType,
      }
    },
  },
})
