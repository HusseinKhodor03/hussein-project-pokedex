import {
  isRouteErrorResponse,
  useNavigate,
  useParams,
  useRouteError,
} from "react-router-dom";
import "../styles/ErrorPage.css";
import useErrorStore from "../store";

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  const { name } = useParams();
  let errorText: string = "";
  const {
    isPokemonDetailError,
    isGenerationError,
    isTypeError,
    isRegionError,
    isNaNError,
  } = useErrorStore();

  if (isPokemonDetailError) errorText = `The Pokémon "${name}" was not found.`;
  else if (isGenerationError)
    errorText = `No Pokémon was found in the "${name}" generation.`;
  else if (isTypeError)
    errorText = `No Pokémon was found for the "${name}" type.`;
  else if (isRegionError)
    errorText = `No Pokémon was found in the "${name}" region.`;
  else if (isNaNError) errorText = `The filter "${name}" is not valid.`;
  else if (isRouteErrorResponse(error)) {
    const startIndex = error.error?.message.indexOf('"');
    const endIndex = error.error?.message.indexOf('"', startIndex! + 1);
    const invalidRoute = error.error?.message.slice(startIndex! + 1, endIndex);
    errorText = `The page "${invalidRoute}" was not found =(`;
  }

  return (
    <>
      <section className="error">
        <h2 className="error__heading">Oops! An error occurred...</h2>
        <div className="error__image"></div>
        <p className="error__text">{errorText}</p>
        <button className="error__btn" onClick={() => navigate("/")}>
          Return to Home Page
        </button>
      </section>
    </>
  );
}

export default ErrorPage;
