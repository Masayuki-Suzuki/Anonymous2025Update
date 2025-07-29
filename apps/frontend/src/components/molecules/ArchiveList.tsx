import { processArchives, getArchives } from '@/lib/archiveUtils'
import ArchiveListContent from './ArchiveListContent'

// Main ArchiveList component
const ArchiveList = async () => {
  const archives = await getArchives()
  const processedArchives = processArchives(archives)

  return (
    <div className="mt-10 font-lato">
      <h3 className="nav-title">archives</h3>
      <ArchiveListContent processedArchives={processedArchives} />
    </div>
  )
}

export default ArchiveList
