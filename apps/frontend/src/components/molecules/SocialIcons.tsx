import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faXTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

const SocialIcons = () => {
    return (
        <div className="flex items-center gap-6 md:gap-7 mt-4 sm:mt-6 md:mt-0">
            <Link
                href="/"
                className="text-dark-gray hover:text-mid-gray transition-colors duration-300 ease-in-out text-[26px]"
            >
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link
                href="https://github.com/masayuki-suzuki/"
                className="text-dark-gray hover:text-mid-gray transition-colors duration-300 ease-in-out text-[26px]"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faGithub} />
            </Link>
            <Link
                href="#"
                className="text-dark-gray hover:text-mid-gray transition-colors duration-300 ease-in-out text-[26px]"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faXTwitter} />
            </Link>
            <Link
                href="#"
                className="text-dark-gray hover:text-mid-gray transition-colors duration-300 ease-in-out text-[26px]"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faFacebook} />
            </Link>
        </div>
    )
}

export default SocialIcons
