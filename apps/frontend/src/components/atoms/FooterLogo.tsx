import Image from 'next/image'
import Link from 'next/link'

const FooterLogo = () => {
    return (
        <Link href="/" className="flex items-center">
            <Image src="/images/ft_logo.svg" alt="Logo" width={70} height={57} className="w-12" />
            <div style={{ marginLeft: '10px', color: '#fff' }}>
                <div className="text-[25px] text-white font-light tracking-widest leading-none">ANONYMOUS</div>
                <div className="text-xxs text-white font-medium tracking-[0.06em] leading-none">
                    Front-End Developer In Vancouver
                </div>
            </div>
        </Link>
    )
}

export default FooterLogo
