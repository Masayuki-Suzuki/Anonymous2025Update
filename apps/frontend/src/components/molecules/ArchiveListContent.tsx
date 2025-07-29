import ArchiveItem from '@/components/atoms/ArchiveItem'
import { ProcessedArchive } from '@/lib/archiveUtils'

type ArchiveListContentProps = {
    processedArchives: ProcessedArchive[]
}

/**
 * ArchiveListContent component - displays the list of archives
 */
const ArchiveListContent = ({ processedArchives }: ArchiveListContentProps) => {
    return (
        <div>
            {processedArchives.length > 0 ? (
                processedArchives.map((archive) => (
                    <ArchiveItem
                        key={archive.documentId}
                        title={archive.title}
                        slug={archive.slug}
                        postCount={archive.postCount}
                        year={archive.year}
                        month={archive.month}
                    />
                ))
            ) : (
                <p className="text-center py-4">No archives</p>
            )}
        </div>
    )
}

export default ArchiveListContent
