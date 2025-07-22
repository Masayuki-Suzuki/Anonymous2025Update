import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href="/">
            <h1 className="flex items-center">
                <Image
                    className="h-auto w-10 sm:w-14 md:w-[70px] mr-4"
                    src="/images/logo.svg"
                    alt="Logo"
                    width={70}
                    height={57}
                />
                <span className="font-lato text-primary font-light inline-flex flex-col leading-ex-tight">
                    <span className="tracking-widest text-2xl sm:text-[28px] md:text-3xl">ANONYMOUS</span>
                    <span className="inline-block text-xxs sm:text-[11px] md:text-xs font-normal tracking-logo-small sm:tracking-[0.07em] md:tracking-logo-medium mt-0.5">
                        Front-End Developer In Vancouver
                    </span>
                </span>
            </h1>
        </Link>
    )
}

export default Logo
