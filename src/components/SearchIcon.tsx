import "../styles/SearchIcon.css";
import { AiOutlineSearch } from "react-icons/ai";

function SearchIcon() {
  return (
    <>
      <button className="icon-search-container">
        <AiOutlineSearch className="icon-search" />
      </button>
    </>
  );
}

export default SearchIcon;
