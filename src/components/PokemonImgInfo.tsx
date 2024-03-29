import PokemonDetails from "../entities/PokemonDetails";
import TypeBadge from "./TypeBadge";
import "../styles/PokemonImgInfo.css";

interface PokemonImgInfoProps {
  pokemon: PokemonDetails;
}

function PokemonImgInfo({ pokemon }: PokemonImgInfoProps) {
  return (
    <>
      <h2 className="pokemon-img-info-heading">
        # {pokemon.id} - {pokemon.name.replace(/-/g, " ")}
      </h2>
      <div className="pokemon-img-info-container">
        <section className="pokemon-img-info-container__img-container">
          {pokemon.sprites.front_default ? (
            <>
              <img
                src={pokemon.sprites.front_default}
                className="img-container__img"
              />
              <img
                src={pokemon.sprites.front_shiny}
                className="img-container__img"
              />
            </>
          ) : (
            <p className="img-container__no-img">No sprite available</p>
          )}
        </section>
        <section className="pokemon-img-info-container__info-container">
          <div id="types-container">
            <h3 className="info-container__heading">Types</h3>
            {pokemon.types?.map((type, index) => (
              <TypeBadge key={index} typeName={type.type.name} />
            ))}
          </div>
          <span className="line"></span>
          <div id="measurements-container">
            <h3 className="info-container__heading">Measurements</h3>
            <p className="info-container__text">
              Weight: {pokemon.weight && pokemon.weight / 10} kg
            </p>
            <p className="info-container__text">
              Height: {pokemon.height && pokemon.height / 10} m
            </p>
          </div>
          <span className="line"></span>
          <div id="abilities-container">
            <h3 className="info-container__heading">Abilities</h3>
            {pokemon.abilities?.map((ability, index) => (
              <p key={index} className="info-container__text">
                {ability.ability.name.replace(/-/g, " ")}
              </p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default PokemonImgInfo;
