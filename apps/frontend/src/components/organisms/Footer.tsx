import FooterLogo from '../atoms/FooterLogo';
import FooterNavigation from '../molecules/FooterNavigation';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#3c3c3c' }} className="p-5">
      <div className="footer-content">
        <div className="footer-logo-container">
          <FooterLogo />
        </div>
        <div className="footer-navigation-container">
          <FooterNavigation />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
