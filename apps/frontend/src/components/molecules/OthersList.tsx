import { otherPages } from '@/lib/otherPages'
import OthersListContent from './OthersListContent'

const OthersList = () => {
    return (
        <div className="mt-10 font-lato">
            <h3 className="nav-title">others</h3>
            <OthersListContent pages={otherPages} />
        </div>
    )
}

export default OthersList
