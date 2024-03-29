import { useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import "../styles/PokemonDetailPage.css";
import usePokemon from "../hooks/usePokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonCard from "../components/PokemonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useErrorStore from "../stores/error-store";
import TypeBadge from "../components/TypeBadge";
import EvolutionChain from "../components/EvolutionChain";
import capitalizeFirstLetter from "../services/capitalize-first-letter";

function PokemonDetailPage() {
  const { name } = useParams();
  const {
    data: pokemonDetail,
    isLoading: isPokemonDetailLoading,
    isError: isPokemonDetailError,
  } = usePokemonDetail(name!);

  document.title = `Pokédex - Pokémon: ${capitalizeFirstLetter(name!)}`;

  const pokemonID = pokemonDetail?.id;
  const names: string[] = [];

  const { data: allPokemon } = usePokemon(0, 100000);

  const urls: string[] = [];

  allPokemon?.results.forEach((pokemon) => {
    urls.push(pokemon.url);
  });

  const ids: string[] = [];

  urls.forEach((url) => {
    const parts = url.split("/");
    ids.push(parts[parts.length - 2]);
  });

  const lastFivePokemon = ids.slice(-5).map((id) => parseInt(id));

  function calcOffset(id: number) {
    let offset: number;

    if (id < 6) {
      offset = id;
    } else if (lastFivePokemon.includes(id)) {
      offset = id - 8981;
    } else if (id > 10000) {
      offset = id - 8975;
    } else {
      offset = id - 6;
    }
    return offset;
  }

  const offset = calcOffset(pokemonID!);
  const { data: pokemon, isLoading: isPokemonLoading } = usePokemon(offset, 5);

  pokemon?.results.forEach((pokemon) => names.push(pokemon.name));

  const { data: nearbyPokemon, isLoading: isNearbyLoading } =
    usePokemonDetails(names);

  const setPokemonDetailError = useErrorStore(
    (selector) => selector.setPokemonDetailError
  );
  const setNaNError = useErrorStore((selector) => selector.setNaNError);
  const isNaNError = !isNaN(parseInt(name!));

  setPokemonDetailError(isPokemonDetailError);
  setNaNError(isNaNError);

  if (isPokemonDetailError || isNaNError) throw new Error();

  if (isPokemonDetailLoading || isPokemonLoading || isNearbyLoading)
    return <LoadingSpinner />;

  return (
    <section className="container pokemon-detail">
      <h2 className="pokemon-detail__heading">
        # {pokemonDetail?.id} - {pokemonDetail?.name.replace(/-/g, " ")}
      </h2>
      <div className="pokemon-detail__imginfo-container">
        <section className="pokemon-detail__img-container">
          {pokemonDetail.sprites.front_default ? (
            <>
              <img
                src={pokemonDetail.sprites.front_default}
                className="pokemon-detail__img"
              />
              <img
                src={pokemonDetail.sprites.front_shiny}
                className="pokemon-detail__img"
              />
            </>
          ) : (
            <p className="pokemon-detail__no-img">No sprite available</p>
          )}
        </section>
        <section className="pokemon-detail__info">
          <div id="types-container">
            <h3 className="pokemon-detail__info-heading">Types</h3>
            {pokemonDetail?.types?.map((type, index) => (
              <TypeBadge key={index} typeName={type.type.name} />
            ))}
          </div>
          <span className="line"></span>
          <div id="measurements-container">
            <h3 className="pokemon-detail__info-heading">Measurements</h3>
            <p className="pokemon-detail__info-text">
              Weight: {pokemonDetail?.weight && pokemonDetail.weight / 10} kg
            </p>
            <p className="pokemon-detail__info-text">
              Height: {pokemonDetail?.height && pokemonDetail.height / 10} m
            </p>
          </div>
          <span className="line"></span>
          <div id="abilities-container">
            <h3 className="pokemon-detail__info-heading">Abilities</h3>
            {pokemonDetail?.abilities?.map((ability, index) => (
              <p key={index} className="pokemon-detail__info-text">
                {ability.ability.name.replace(/-/g, " ")}
              </p>
            ))}
          </div>
        </section>
      </div>
      <EvolutionChain pokemon={pokemonDetail} />
      <h3 className="pokemon-detail__stats-heading">Stats</h3>
      <section className="pokemon-detail__stats">
        {pokemonDetail?.stats?.map((stat, index) => (
          <div key={index}>
            <p className="pokemon-detail__stats-text">
              {stat.stat.name.replace(/-/g, " ")}
            </p>
            <p className="pokemon-detail__stats-stat">{stat.base_stat}</p>
          </div>
        ))}
      </section>
      <h3 className="pokemon-detail__nearby-heading">
        Nearby Pokémon in the Pokédex
      </h3>
      <section className="pokemon-detail__nearby">
        {nearbyPokemon?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </section>
  );
}

export default PokemonDetailPage;
