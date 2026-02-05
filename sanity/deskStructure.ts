import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Settings Group
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Homepage Settings')
                .child(
                  S.document()
                    .schemaType('homepageSettings')
                    .documentId('homepageSettings')
                ),
            ])
        ),

      S.divider(),

      // Homepage Content
      S.listItem()
        .title('Pain Points')
        .child(
          S.documentTypeList('painPoint')
            .title('Pain Points')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('How It Works Steps')
        .child(
          S.documentTypeList('howItWorksStep')
            .title('How It Works Steps')
            .defaultOrdering([{ field: 'stepNumber', direction: 'asc' }])
        ),

      S.listItem()
        .title('Features')
        .child(
          S.documentTypeList('feature')
            .title('Features')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Testimonials')
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Provider Features')
        .child(
          S.documentTypeList('providerFeature')
            .title('Provider Features')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
    ])
