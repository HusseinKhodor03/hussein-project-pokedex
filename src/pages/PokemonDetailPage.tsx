import { useNavigate, useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import "../styles/PokemonDetailPage.css";
import usePokemon from "../hooks/usePokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonCard from "../components/PokemonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useErrorStore from "../store";

function PokemonDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const {
    data: pokemonDetail,
    isLoading: isPokemonDetailLoading,
    isError: isPokemonDetailError,
  } = usePokemonDetail(name!);

  function transformName(name: string) {
    const names = name.split("-");

    const capitalizedNames = names.map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    );

    return capitalizedNames.join(" ");
  }

  document.title = `Pokédex - Pokémon: ${transformName(name!)}`;

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

  function getTypeColor(typeName: string) {
    const typeColorMap: {
      [type: string]: { background: string; border: string; color: string };
    } = {
      water: { background: "#4e4feb", border: "#fff", color: "#fff" },
      grass: { background: "#1a5d1a", border: "#fff", color: "#fff" },
      fighting: { background: "#8c3333", border: "#fff", color: "#fff" },
      bug: { background: "#b5c99a", border: "#202020", color: "#202020" },
      steel: { background: "#ffeaea", border: "#3f2305", color: "#3f2305" },
      dragon: { background: "#164b60", border: "#fff", color: "#fff" },
      ice: { background: "#c5dff8", border: "#202020", color: "#202020" },
      electric: { background: "#f1c93b", border: "#202020", color: "#202020" },
      dark: { background: "#000", border: "#bfbfbf", color: "#bfbfbf" },
      normal: { background: "#eee", border: "#202020", color: "#202020" },
      ground: { background: "#e9b384", border: "#202020", color: "#202020" },
      ghost: { background: "#9681eb", border: "#000", color: "#000" },
      fire: { background: "#fe0000", border: "#fff", color: "#fff" },
      rock: { background: "#7d7463", border: "#fff", color: "#fff" },
      psychic: { background: "#ff52a2", border: "#2b2a4c", color: "#2b2a4c" },
      poison: { background: "#6528f7", border: "#fff", color: "#fff" },
      fairy: { background: "#ffd0d0", border: "#202020", color: "#202020" },
      flying: { background: "#b7b7b7", border: "#202020", color: "#202020" },
    };

    return typeColorMap[typeName];
  }

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
            {pokemonDetail?.types.map((type, index) => {
              const typeColors = getTypeColor(type.type.name);
              return (
                <p
                  key={index}
                  id="types"
                  className="pokemon-detail__info-text"
                  style={{
                    background: typeColors.background,
                    border: `3px solid ${typeColors.border}`,
                    color: typeColors.color,
                  }}
                  onClick={() => navigate(`/type/${type.type.name}`)}
                >
                  {type.type.name}
                </p>
              );
            })}
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
            {pokemonDetail?.abilities.map((ability, index) => (
              <p key={index} className="pokemon-detail__info-text">
                {ability.ability.name.replace(/-/g, " ")}
              </p>
            ))}
          </div>
        </section>
      </div>
      <h3 className="pokemon-detail__stats-heading">Stats</h3>
      <section className="pokemon-detail__stats">
        {pokemonDetail?.stats.map((stat, index) => (
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
