import { processArchives, getArchives } from '@/lib/archiveUtils'
import ListWrapper from '../atoms/ListWrapper'
import ArchiveListContent from './ArchiveListContent'

// Main ArchiveList component
const ArchiveList = async () => {
  const archives = await getArchives()
  const processedArchives = processArchives(archives)

  return (
    <ListWrapper title="archives">
      <ArchiveListContent processedArchives={processedArchives} />
    </ListWrapper>
  )
}

export default ArchiveList
