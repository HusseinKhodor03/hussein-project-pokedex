import { useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import "../styles/PokemonDetailPage.css";
import usePokemon from "../hooks/usePokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonCard from "../components/PokemonCard";

function PokemonDetailPage() {
  const { name } = useParams();
  const { data: pokemonDetail } = usePokemonDetail(name!);

  const pokemonID = pokemonDetail?.id;
  const names: string[] = [];

  function calcOffset(id: number) {
    let offset: number;

    if (id < 6) {
      offset = id;
    } else {
      offset = id - 6;
    }
    return offset;
  }

  const offset = calcOffset(pokemonID!);
  const { data: pokemon } = usePokemon(offset, 5);

  pokemon?.results.forEach((pokemon) => names.push(pokemon.name));
  const { data: nearbyPokemon } = usePokemonDetails(names);

  function getTypeColor(typeName: string) {
    const typeColorMap: { [type: string]: string } = {
      water: "#4e4feb",
      grass: "#1a5d1a",
      fighting: "#8c3333",
      bug: "#b5c99a",
      steel: "#ffeaea",
      dragon: "#164b60",
      ice: "#c5dff8",
      electric: "#f1c93b",
      dark: "#000",
      normal: "#eee",
      ground: "#e9b384",
      ghost: "#9681eb",
      fire: "#fe0000",
      rock: "#7d7463",
      psychic: "#ff52a2",
      poison: "#6528f7",
      fairy: "#ffd0d0",
      flying: "#b7b7b7",
    };

    return typeColorMap[typeName];
  }

  return (
    <section className="container pokemon-detail">
      <h2 className="pokemon-detail__heading">
        # {pokemonDetail?.id} - {pokemonDetail?.name}
      </h2>
      <div className="pokemon-detail__imginfo-container">
        <section className="pokemon-detail__img-container">
          <img
            className="pokemon-detail__img"
            src={pokemonDetail?.sprites.front_default}
          />
          <img
            className="pokemon-detail__img"
            src={pokemonDetail?.sprites.front_shiny}
          />
        </section>
        <section className="pokemon-detail__info">
          <div>
            <h3 className="pokemon-detail__info-heading">Types</h3>
            {pokemonDetail?.types.map((type) => (
              <p
                id="types"
                className="pokemon-detail__info-text"
                style={{ background: getTypeColor(type.type.name) }}
              >
                {type.type.name}
              </p>
            ))}
          </div>
          <span className="line"></span>
          <div>
            <h3 className="pokemon-detail__info-heading">Measurements</h3>
            <p className="pokemon-detail__info-text">
              Weight: {pokemonDetail?.weight && pokemonDetail.weight / 10} kg
            </p>
            <p className="pokemon-detail__info-text">
              Height: {pokemonDetail?.height && pokemonDetail.height / 10} m
            </p>
          </div>
          <span className="line"></span>
          <div>
            <h3 className="pokemon-detail__info-heading">Abilities</h3>
            {pokemonDetail?.abilities.map((ability) => (
              <p className="pokemon-detail__info-text">
                {ability.ability.name}
              </p>
            ))}
          </div>
        </section>
      </div>
      <h3 className="pokemon-detail__stats-heading">Stats</h3>
      <section className="pokemon-detail__stats">
        {pokemonDetail?.stats.map((stat, index) => (
          <div key={index}>
            <p className="pokemon-detail__stats-text">{stat.stat.name}</p>
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
