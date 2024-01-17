import { useRef } from "react";
import "../styles/SearchInput.css";
import SearchIcon from "./SearchIcon";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current?.value && ref.current.value.trim() !== "") {
          navigate(`/pokemon/${ref.current.value.toLowerCase().trim()}`);
          ref.current.value = "";
          ref.current.blur();
        }
      }}
    >
      <div className="input-group">
        <input
          ref={ref}
          className="input"
          type="text"
          placeholder="Search for a specific Pokémon..."
        ></input>
        <SearchIcon />
      </div>
    </form>
  );
}

export default SearchInput;
