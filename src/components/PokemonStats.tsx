import PokemonDetails from "../entities/PokemonDetails";
import "../styles/PokemonStats.css";

interface PokemonStatsProps {
  pokemon: PokemonDetails;
}

function PokemonStats({ pokemon }: PokemonStatsProps) {
  return (
    <>
      <h3 className="pokemon-stats-heading">Stats</h3>
      <section className="pokemon-stats">
        {pokemon.stats?.map((stat, index) => (
          <div key={index}>
            <p className="pokemon-stats__text">
              {stat.stat.name.replace(/-/g, " ")}
            </p>
            <p className="pokemon-stats__stat">{stat.base_stat}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default PokemonStats;
