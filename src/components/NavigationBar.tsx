import "../styles/NavigationBar.css";
import logo from "../assets/pokeball-logo.png";
import pikachu from "../assets/pikachu.png";
import SearchInput from "./SearchInput";

function NavigationBar() {
  return (
    <div className="nav-wrapper">
      <nav className="container nav">
        <a className="nav__brand" href="/">
          <img className="nav__logo" src={logo} />
          <span className="nav__logo-text">Pokédex</span>
        </a>
        <SearchInput />
        <img className="nav__image" src={pikachu} />
      </nav>
    </div>
  );
}

export default NavigationBar;
