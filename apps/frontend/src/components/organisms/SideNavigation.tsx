'use client'

import SearchBar from '../molecules/SearchBar'
import CategoryList from '../molecules/CategoryList'

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
                {/* Archive component will be added here later */}
                <h3>archives</h3>
            </div>

            {/* Recent Posts Section */}
            <div>
                {/* Recent Posts component will be added here later */}
                <h3>recent posts</h3>
            </div>

            {/* Others Section */}
            <div>
                {/* Others component will be added here later */}
                <h3>others</h3>
            </div>
        </aside>
    )
}

export default SideNavigation
