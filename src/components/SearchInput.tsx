import { useEffect, useRef } from "react";
import "../styles/SearchInput.css";
import SearchIcon from "./SearchIcon";
import { useLocation, useNavigate } from "react-router-dom";

function SearchInput() {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const query = ref.current?.value.toLowerCase().trim().replace(/\s+/g, "-");

    if (query) {
      if (location.pathname !== "/search-results") {
        navigate(`/search-results/${query}`);
      } else {
        navigate(`/search-results/${query}`, {
          replace: true,
        });
      }
    }
  };

  useEffect(() => {
    if (ref.current && !location.pathname.startsWith("/search-results")) {
      ref.current.value = "";
      ref.current.blur();
    }
  }, [location.pathname]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current?.value && ref.current.value.trim() !== "") {
          navigate(
            `/pokemon/${ref.current.value
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-")}`
          );
        }
      }}
    >
      <div className="input-group">
        <input
          ref={ref}
          className="input"
          type="text"
          placeholder="Search for a specific Pokémon..."
          onChange={handleSearch}
        ></input>
        <SearchIcon />
      </div>
    </form>
  );
}

export default SearchInput;
