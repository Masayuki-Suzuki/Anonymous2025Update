import FooterLogo from '../atoms/FooterLogo'
import FooterNavigation from '../molecules/FooterNavigation'

const Footer = () => {
    return (
        <footer className="mt-16 py-5 md:py-8 bg-primary">
            <div className="footer-content flex flex-col-reverse md:flex-row md:justify-between md:items-center w-[95%] max-w-base mx-auto">
                <div className="mx-auto md:mx-0">
                    <FooterLogo />
                </div>
                <div className="footer-navigation-container mb-4 md:mb-0">
                    <FooterNavigation />
                </div>
            </div>
        </footer>
    )
}

export default Footer
