import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/images/logo.svg" alt="Logo" width={70} height={57} />
        <div style={{ marginLeft: '10px' }}>
          <div>ANONYMOUS</div>
          <div>Front-End Developer In Vancouver</div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
