import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PokemonGenerationPage from "./pages/PokemonGenerationPage";
import ErrorPage from "./pages/ErrorPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import HomePageError from "./pages/HomePageError";
import PokemonTypePage from "./pages/PokemonTypePage";
import PokemonRegionPage from "./pages/PokemonRegionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <HomePageError />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "generation/:name",
        element: <PokemonGenerationPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "pokemon/:name",
        element: <PokemonDetailPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "type/:name",
        element: <PokemonTypePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "region/:name",
        element: <PokemonRegionPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
