import "../styles/SearchInput.css";
import SearchIcon from "./SearchIcon";

function SearchInput() {
  return (
    <>
      <div className="input-group">
        <input
          className="input"
          type="text"
          placeholder="Search for a specific Pokémon..."
        ></input>
        <SearchIcon />
      </div>
    </>
  );
}

export default SearchInput;
