import "../styles/SearchIcon.css";
import search from "../assets/search.svg";

function SearchIcon() {
  return (
    <button className="icon-search-container">
      <img className="icon-search" src={search} alt="" />
    </button>
  );
}

export default SearchIcon;
