import { useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import "../styles/PokemonDetailPage.css";

function PokemonDetailPage() {
  const { name } = useParams();
  const { data: pokemonDetail } = usePokemonDetail(name!);

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
              Weight: {pokemonDetail?.weight}
            </p>
            <p className="pokemon-detail__info-text">
              Height: {pokemonDetail?.height}
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
    </section>
  );
}

export default PokemonDetailPage;
