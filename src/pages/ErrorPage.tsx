import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MenuBar from "../components/MenuBar";
import NavigationBar from "../components/NavigationBar";
import "../styles/ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <MenuBar />
      <section className="error">
        <h2 className="error__heading">Oops! An error occurred...</h2>
        <div className="error__image"></div>
        <p className="error__text">
          The page you were looking for was not found =(
        </p>
        <button className="error__btn" onClick={() => navigate("/")}>
          Return to Home Page
        </button>
      </section>
      <Footer />
    </>
  );
}

export default ErrorPage;
