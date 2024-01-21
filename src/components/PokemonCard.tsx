import { useNavigate } from "react-router-dom";
import PokemonDetails from "../entities/PokemonDetails";
import "../styles/PokemonCard.css";

interface PokemonCardProps {
  pokemon: PokemonDetails;
  isCurrentPokemon?: boolean;
}

function PokemonCard({ pokemon, isCurrentPokemon }: PokemonCardProps) {
  const navigate = useNavigate();

  return (
    <>
      <div
        key={pokemon.id}
        className={`pokemon-card ${isCurrentPokemon ? "current-pokemon" : ""}`}
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      >
        {pokemon.sprites.front_default ? (
          <img
            src={pokemon.sprites.front_default}
            className="pokemon-card__image"
          />
        ) : (
          <p className="pokemon-card__no-image">No sprite available</p>
        )}
        <h3 className="pokemon-card__heading">
          {pokemon.name.replace(/-/g, " ")}
        </h3>
      </div>
    </>
  );
}

export default PokemonCard;
