import Logo from '../atoms/Logo'
import SocialIcons from '../molecules/SocialIcons'

const Header = () => {
    return (
        <header className="border-b border-[#ccc] w-full pt-[30px] pb-5 md:pt-10 md:pb-10 ">
            <div className="flex flex-col md:flex-row justify-between items-center mx-auto max-w-base w-95pct">
                <Logo />
                <SocialIcons />
            </div>
        </header>
    )
}

export default Header
