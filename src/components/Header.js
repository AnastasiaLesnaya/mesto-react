import headerLogo from '../images/header-logo.svg';

function Header () {
  return (
    <header className="header">
      <img src={ headerLogo } className="header__logo" alt="логотип Место.Россия" />
    </header>
  )
}

export default Header;