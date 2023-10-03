import { useNavigate } from "react-router-dom";
import PokemonDetails from "../entities/PokemonDetails";
import "../styles/PokemonCard.css";

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();

  return (
    <>
      <div
        key={pokemon.id}
        className="pokemon-card"
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
      >
        <img
          src={pokemon.sprites.front_default}
          className="pokemon-card__image"
        />
        <h3 className="pokemon-card__heading">{pokemon.name}</h3>
      </div>
    </>
  );
}

export default PokemonCard;
