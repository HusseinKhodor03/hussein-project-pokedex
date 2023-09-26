import Banner from "./components/Banner";
import MenuBar from "./components/MenuBar";
import NavigationBar from "./components/NavigationBar";
import PokemonCard from "./components/PokemonCard";

function App() {
  return (
    <>
      <NavigationBar />
      <MenuBar />
      <Banner />
      <PokemonCard />
    </>
  );
}

export default App;
