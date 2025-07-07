import Image from 'next/image';
import Link from 'next/link';

const FooterLogo = () => {
  return (
    <Link href="/">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/images/ft_logo.svg" alt="Logo" width={70} height={57} />
        <div style={{ marginLeft: '10px', color: '#fff' }}>
          <div>ANONYMOUS</div>
          <div>Front-End Developer In Vancouver</div>
        </div>
      </div>
    </Link>
  );
};

export default FooterLogo;
