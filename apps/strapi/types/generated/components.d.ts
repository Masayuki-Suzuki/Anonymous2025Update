import type { Schema, Struct } from '@strapi/strapi'

export interface WidgetsAboutWidget extends Struct.ComponentSchema {
    collectionName: 'components_widgets_about_widgets'
    info: {
        displayName: 'about widget'
    }
    attributes: {
        profile_image: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required
        text_content: Schema.Attribute.RichText & Schema.Attribute.Required
    }
}

declare module '@strapi/strapi' {
    export module Public {
        export interface ComponentSchemas {
            'widgets.about-widget': WidgetsAboutWidget
        }
    }
}
