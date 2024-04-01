import {
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from "react-router-dom";
import "../styles/ErrorPage.css";
import useErrorStore from "../stores/error-store";
import { AxiosError } from "axios";

function ErrorPage() {
  const error = useRouteError() as AxiosError;
  const { name: name } = useParams();

  document.title = "Pokédex - Not Found";

  const formattedName = name?.replace(/-/g, " ");

  let errorText: string = "";
  const { isNaNError, isEmptyArrayError } = useErrorStore();

  if (error?.request?.responseURL.includes("pokemon")) {
    errorText = `The Pokémon "${formattedName}" was not found.`;
  } else if (error?.request?.responseURL.includes("generation")) {
    errorText = `No Pokémon was found in the "${formattedName}" generation.`;
  } else if (
    error?.request?.responseURL.includes("type") ||
    isEmptyArrayError
  ) {
    errorText = `No Pokémon was found for the "${formattedName}" type.`;
  } else if (error?.request?.responseURL.includes("region")) {
    errorText = `No Pokémon was found in the "${formattedName}" region.`;
  } else if (isNaNError) {
    errorText = `The filter "${formattedName}" is not valid.`;
  } else if (isRouteErrorResponse(error)) {
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
        <button
          className="error__btn"
          onClick={() => {
            window.location.replace("/");
          }}
        >
          Return to Home Page
        </button>
      </section>
    </>
  );
}

export default ErrorPage;
