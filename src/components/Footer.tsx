import logo from "../assets/pokeball-logo.png";
import pikachu from "../assets/pikachu.png";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <footer className="container footer">
        <div>
          <img className="footer__logo" src={logo} />
          <span className="footer__logo-text">Pokédex</span>
        </div>
        <p className="footer__text">Developed by Hussein Khodor &copy; 2023</p>
        <img className="footer__image" src={pikachu} />
      </footer>
    </div>
  );
}

export default Footer;
