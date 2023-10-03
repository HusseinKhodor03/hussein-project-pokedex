import { useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import "../styles/PokemonDetailPage.css";

function PokemonDetailPage() {
  const { name } = useParams();
  const { data: pokemonDetail } = usePokemonDetail(name!);

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
              <p className="pokemon-detail__info-text">{type.type.name}</p>
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
        <div>
          <p className="pokemon-detail__stats-text">
            {pokemonDetail?.stats[0].stat.name}
          </p>
          <p className="pokemon-detail__stats-stat">
            {pokemonDetail?.stats[0].base_stat}
          </p>
        </div>
        <div>
          <p className="pokemon-detail__stats-text">
            {pokemonDetail?.stats[1].stat.name}
          </p>
          <p className="pokemon-detail__stats-stat">
            {pokemonDetail?.stats[1].base_stat}
          </p>
        </div>
        <div>
          <p className="pokemon-detail__stats-text">
            {pokemonDetail?.stats[2].stat.name}
          </p>
          <p className="pokemon-detail__stats-stat">
            {pokemonDetail?.stats[2].base_stat}
          </p>
        </div>
        <div>
          <p className="pokemon-detail__stats-text">
            {pokemonDetail?.stats[3].stat.name}
          </p>
          <p className="pokemon-detail__stats-stat">
            {pokemonDetail?.stats[3].base_stat}
          </p>
        </div>
        <div>
          <p className="pokemon-detail__stats-text">
            {pokemonDetail?.stats[4].stat.name}
          </p>
          <p className="pokemon-detail__stats-stat">
            {pokemonDetail?.stats[4].base_stat}
          </p>
        </div>
        <div>
          <p className="pokemon-detail__stats-text">
            {pokemonDetail?.stats[5].stat.name}
          </p>
          <p className="pokemon-detail__stats-stat">
            {pokemonDetail?.stats[5].base_stat}
          </p>
        </div>
      </section>
    </section>
  );
}

export default PokemonDetailPage;
