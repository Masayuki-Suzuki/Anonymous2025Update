import { format, isValid, parseISO } from 'date-fns'
import type { Core } from '@strapi/strapi'

async function checkIfArchiveExists(slug: string) {
    console.info(`Checking if Archive exists by slug: ${slug}`)
    const existingArchive = await strapi.documents('api::archive.archive').findMany({
        filters: { slug },
    })

    return existingArchive
}

export async function linkPostToArchive(event: any, strapi: Core.Strapi): Promise<void> {
    const { result } = event

    if (!result && !('id' in result)) {
        console.error('Invalid event structure: result or id not found.')
        return
    }

    if (!result.archive || result.archive.count) {
        console.info('Post already linked to an archive, skipping.')
        return
    }

    const baseDate = (() => {
        const d = parseISO(result.createdAt)
        return isValid(d) ? d : new Date()
    })()

    const date = format(baseDate, 'MMMM yyyy')
    const slug = date.toLowerCase().replace(' ', '-')
    const archive = await checkIfArchiveExists(slug)
    let archiveDocumentId: string

    if (archive.length) {
        archiveDocumentId = archive[0].documentId
    } else {
        console.info('Archive not found, creating a new one')
        const newArchive = await strapi.documents('api::archive.archive').create({
            data: {
                title: date,
                slug,
            },
        })
        archiveDocumentId = newArchive.documentId
    }

    if (!archiveDocumentId) {
        console.error('Failed to retrieve or create archive ID.')
        return
    }

    const res = await strapi.documents('api::post.post').update({
        documentId: result.documentId,
        data: {
            archive: {
                // @ts-ignore-next-line
                connect: [{ documentId: archiveDocumentId }],
            },
        },
    })

    return
}
