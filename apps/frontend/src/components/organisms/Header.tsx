import Logo from '../atoms/Logo';
import SearchBar from '../molecules/SearchBar';
import SocialIcons from '../molecules/SocialIcons';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5">
      <Logo />
      <div className="flex-1 mx-4">
        <SearchBar />
      </div>
      <SocialIcons />
    </header>
  );
};

export default Header;
