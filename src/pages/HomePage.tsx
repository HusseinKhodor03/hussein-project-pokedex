import Banner from "../components/Banner";
import PokemonGrid from "../components/PokemonGrid";

function HomePage() {
  document.title = "Pokédex - Home";

  return (
    <>
      <Banner />
      <PokemonGrid />
    </>
  );
}

export default HomePage;
