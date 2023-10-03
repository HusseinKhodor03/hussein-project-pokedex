import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PokemonGenerationPage from "./pages/PokemonGenerationPage";
import ErrorPage from "./pages/ErrorPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "generation/:name", element: <PokemonGenerationPage /> },
      { path: "pokemon/:name", element: <PokemonDetailPage /> },
    ],
  },
]);

export default router;
