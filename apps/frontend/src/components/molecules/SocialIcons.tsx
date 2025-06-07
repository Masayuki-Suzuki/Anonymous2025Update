import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faXTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

const SocialIcons = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Link href="/">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <Link href="#">
        <FontAwesomeIcon icon={faGithub} />
      </Link>
      <Link href="#">
        <FontAwesomeIcon icon={faXTwitter} />
      </Link>
      <Link href="#">
        <FontAwesomeIcon icon={faFacebook} />
      </Link>
    </div>
  );
};

export default SocialIcons;
