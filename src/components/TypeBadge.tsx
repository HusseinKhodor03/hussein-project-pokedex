import { useNavigate } from "react-router-dom";

interface TypeBadgeProps {
  typeName: string;
}

function TypeBadge({ typeName }: TypeBadgeProps) {
  const navigate = useNavigate();

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

  const typeColors = typeColorMap[typeName];

  return (
    <p
      className="info-container__text"
      id="types"
      style={{
        background: typeColors.background,
        border: `3px solid ${typeColors.border}`,
        color: typeColors.color,
      }}
      onClick={() => navigate(`/type/${typeName}`)}
    >
      {typeName}
    </p>
  );
}

export default TypeBadge;
