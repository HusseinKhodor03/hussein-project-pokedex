import Banner from "./components/Banner";
import Footer from "./components/Footer";
import MenuBar from "./components/MenuBar";
import NavigationBar from "./components/NavigationBar";
import PokemonGrid from "./components/PokemonGrid";

function App() {
  return (
    <>
      <NavigationBar />
      <MenuBar />
      <Banner />
      <PokemonGrid />
      <Footer />
    </>
  );
}

export default App;
