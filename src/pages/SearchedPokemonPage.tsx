import { useParams } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import "../styles/SearchedPokemonPage.css";
import SearchedPokemonList from "../components/SearchedPokemonList";

function SearchedPokemonPage() {
  const { query } = useParams();
  const { data: allPokemon } = usePokemon(0, 2000);

  document.title = `Pokedex - Search Results For "${query}"`;

  return (
    <section className="container searched-pokemon">
      <SearchedPokemonList query={query!} allPokemon={allPokemon!} />
    </section>
  );
}

export default SearchedPokemonPage;
