import { otherPages } from '@/lib/otherPages'
import ListWrapper from '../atoms/ListWrapper'
import OthersListContent from './OthersListContent'

const OthersList = () => {
    return (
        <ListWrapper title="others">
            <OthersListContent pages={otherPages} />
        </ListWrapper>
    )
}

export default OthersList
