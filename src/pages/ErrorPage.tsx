import {
  isRouteErrorResponse,
  useNavigate,
  useParams,
  useRouteError,
} from "react-router-dom";
import "../styles/ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  const name = useParams();

  return (
    <>
      <section className="error">
        <h2 className="error__heading">Oops! An error occurred...</h2>
        <div className="error__image"></div>
        <p className="error__text">
          {isRouteErrorResponse(error)
            ? "The page you were looking for was not found =("
            : `We didn't find any Pokémon with this filter: "${name.name}"`}
        </p>
        <button className="error__btn" onClick={() => navigate("/")}>
          Return to Home Page
        </button>
      </section>
    </>
  );
}

export default ErrorPage;
