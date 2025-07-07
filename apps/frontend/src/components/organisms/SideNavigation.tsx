'use client'

import SearchBar from '../molecules/SearchBar'
import CategoryList from '../molecules/CategoryList'
import ArchiveList from '../molecules/ArchiveList'
import RecentPostsList from '../molecules/RecentPostsList'
import OthersList from '../molecules/OthersList'

const SideNavigation = () => {
    return (
        <aside>
            {/* Search Bar */}
            <div>
                <SearchBar />
            </div>

            {/* Language Section */}
            <div>
                {/* Language component will be added here later */}
                <h3>language</h3>
            </div>

            {/* Categories Section */}
            <div>
                <CategoryList />
            </div>

            {/* About Section */}
            <div>
                {/* About component will be added here later */}
                <h3>about</h3>
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
