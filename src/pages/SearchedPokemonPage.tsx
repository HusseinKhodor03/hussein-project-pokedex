import { useParams } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonCard from "../components/PokemonCard";
import "../styles/SearchedPokemonPage.css";

function SearchedPokemonPage() {
  const { query } = useParams();
  const { data: allPokemon } = usePokemon(0, 2000);

  const urls: string[] = [];

  allPokemon?.results.forEach((pokemon) => {
    urls.push(pokemon.url);
  });

  const ids: string[] = [];

  urls.forEach((url) => {
    const parts = url.split("/");
    ids.push(parts[parts.length - 2]);
  });

  ids.sort((a, b) => parseInt(a) - parseInt(b));

  const { data: pokemonDetails } = usePokemonDetails(ids, 0);

  const filteredPokemon = pokemonDetails?.filter((pokemon) => {
    return pokemon.name.includes(query!);
  });

  let heading = `Search Results For "${query}"`;

  if (filteredPokemon?.length === 0) {
    heading = "No Results Found";
  }

  return (
    <section className="container searched-pokemon">
      <h2 className="searched-pokemon-heading">{heading}</h2>
      <div className="searched-pokemon-cards">
        {filteredPokemon?.map((pokemonName, index) => (
          <PokemonCard key={index} pokemon={pokemonName} />
        ))}
      </div>
    </section>
  );
}

export default SearchedPokemonPage;
