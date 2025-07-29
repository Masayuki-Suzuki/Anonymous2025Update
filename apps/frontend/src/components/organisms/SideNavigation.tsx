import SearchBar from '../molecules/SearchBar'
import CategoryList from '../molecules/CategoryList'
import ArchiveList from '../molecules/ArchiveList'
import RecentPostsList from '../molecules/RecentPostsList'
import OthersList from '../molecules/OthersList'
import AboutWidget from '../molecules/AboutWidget'

/**
 * SideNavigation component - displays the side navigation with all its sections
 */
const SideNavigation = async () => {
    return (
        <aside>
            {/* Search Bar */}
            <SearchBar />

            {/* Language Section */}
            {/* Language component will be added here later */}
            {/* Disabled for now since it's unnecessary */}

            {/* Categories Section */}
            <CategoryList />

            {/* About Section */}
            <AboutWidget />

            {/* Archive Section */}
            <ArchiveList />

            {/* Recent Posts Section */}
            <RecentPostsList />

            {/* Others Section */}
            <OthersList />
        </aside>
    )
}

export default SideNavigation
