import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PokemonGenerationPage from "./pages/PokemonGenerationPage";
import ErrorPage from "./pages/ErrorPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import HomePageError from "./pages/HomePageError";
import PokemonTypePage from "./pages/PokemonTypePage";
import PokemonRegionPage from "./pages/PokemonRegionPage";
import ScrollToTop from "./components/ScrollToTop";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchedPokemonPage from "./pages/SearchedPokemonPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout />
        <ScrollToTop />
      </>
    ),
    errorElement: <HomePageError />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "generation/:name",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PokemonGenerationPage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "pokemon/:name",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PokemonDetailPage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "type/:name",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PokemonTypePage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "region/:name",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PokemonRegionPage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "search-results/:query",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SearchedPokemonPage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
