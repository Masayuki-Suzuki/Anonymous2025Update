import SearchBar from '../molecules/SearchBar'
import CategoryList from '../molecules/CategoryList'
import ArchiveList from '../molecules/ArchiveList'
import RecentPostsList from '../molecules/RecentPostsList'
import OthersList from '../molecules/OthersList'
import AboutWidget from '../molecules/AboutWidget'

const SideNavigation = async () => {
    return (
        <aside>
            {/* Search Bar */}
            <div>
                <SearchBar />
            </div>

            {/* Language Section */}
            {/*<div>*/}
            {/* Language component will be added here later */}
            {/*<h3>language</h3>*/}
            {/* Disabled for now since it's unnecessary */}
            {/*</div>*/}

            {/* Categories Section */}
            <div>
                <CategoryList />
            </div>

            {/* About Section */}
            <div>
                <AboutWidget />
            </div>

            {/* Archive Section */}
            <div>
                <ArchiveList />
            </div>

            {/* Recent Posts Section */}
            <div>
                <RecentPostsList />
            </div>

            {/* Others Section */}
            <div>
                <OthersList />
            </div>
        </aside>
    )
}

export default SideNavigation
