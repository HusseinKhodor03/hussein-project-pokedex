import { useEffect, useRef, useState } from "react";
import "../styles/MenuBar.css";
import useGenerations from "../hooks/useGenerations";
import useTypes from "../hooks/useTypes";
import useRegions from "../hooks/useRegions";
import { useNavigate } from "react-router-dom";

function MenuBar() {
  const navigate = useNavigate();

  const [isGenerationsVisible, setGenerationsVisible] = useState(false);
  const [isTypesVisible, setTypesVisible] = useState(false);
  const [isRegionsVisible, setRegionsVisible] = useState(false);

  const { data: generations } = useGenerations();
  const { data: types } = useTypes();
  const { data: regions } = useRegions();

  const filteredRegions = regions?.results.filter(
    (region) => region.name !== "hisui"
  );

  const closeAllDropdowns = () => {
    setGenerationsVisible(false);
    setTypesVisible(false);
    setRegionsVisible(false);
  };

  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLUListElement)
      ) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <section className="menu">
      <ul className="container list menu__list" ref={menuRef}>
        <li>
          <div className="dropdown">
            <div className="dropdown__link">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  closeAllDropdowns();
                  setGenerationsVisible(!isGenerationsVisible);
                }}
              >
                Generations ➤
              </a>
            </div>
            <div
              id="generations-dropdown"
              className={`dropdown-menu ${
                isGenerationsVisible ? "visible" : ""
              }`}
            >
              <ul className="list">
                {generations?.results.map((generation) => (
                  <li
                    className="list__item"
                    key={generation.name}
                    onClick={() => {
                      navigate(`/generation/${generation.name}`);
                      setGenerationsVisible(false);
                    }}
                  >
                    {generation.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div className="dropdown">
            <div className="dropdown__link">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  closeAllDropdowns();
                  setTypesVisible(!isTypesVisible);
                }}
              >
                Types ➤
              </a>
            </div>
            <div
              id="types-dropdown"
              className={`dropdown-menu ${isTypesVisible ? "visible" : ""}`}
            >
              <ul className="list">
                {types?.results.map((type) => (
                  <li
                    className="list__item"
                    key={type.name}
                    onClick={() => {
                      navigate(`/type/${type.name}`);
                      setTypesVisible(false);
                    }}
                  >
                    {type.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div className="dropdown">
            <div className="dropdown__link">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  closeAllDropdowns();
                  setRegionsVisible(!isRegionsVisible);
                }}
              >
                Regions ➤
              </a>
            </div>
            <div
              id="regions-dropdown"
              className={`dropdown-menu ${isRegionsVisible ? "visible" : ""}`}
            >
              <ul className="list">
                {filteredRegions?.map((region) => (
                  <li
                    className="list__item"
                    key={region.name}
                    onClick={() => {
                      navigate(`/region/${region.name}`);
                      setRegionsVisible(false);
                    }}
                  >
                    {region.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default MenuBar;
