import Link from 'next/link';

const FooterNavigation = () => {
  return (
    <nav style={{ color: '#fff' }}>
      <ul style={{ display: 'flex', flexDirection: 'column' }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNavigation;
