import Link from 'next/link'

const FooterNavigation = () => {
    return (
        <nav style={{ color: '#fff' }}>
            <ul className="text-sm md:text-base uppercase text-white flex items-center gap-5 justify-center">
                <li className="">
                    <Link href="/" className="hover:text-secondary transition-colors duration-200 ease-in-out">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="hover:text-secondary transition-colors duration-200 ease-in-out">
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:text-secondary transition-colors duration-200 ease-in-out">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default FooterNavigation
