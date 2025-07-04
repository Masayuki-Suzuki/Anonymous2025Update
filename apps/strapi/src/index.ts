import type { Core } from '@strapi/strapi'
import { linkPostToArchive } from './bootstraps/post-archive-linker'

export default {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register(/* { strapi }: { strapi: Core.Strapi } */) {},

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap({ strapi }: { strapi: Core.Strapi }) {
        // Flag to prevent recursive calls
        let isProcessing = false

        strapi.db.lifecycles.subscribe({
            models: ['api::post.post'],

            async afterCreate(event: any) {
                await linkPostToArchive(event, strapi)
            },
        })
    },
}
