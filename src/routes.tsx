import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PokemonGenerationPage from "./pages/PokemonGenerationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "generation/:id", element: <PokemonGenerationPage /> },
    ],
  },
]);

export default router;
