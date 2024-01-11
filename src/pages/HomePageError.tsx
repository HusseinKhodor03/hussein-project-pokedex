import Footer from "../components/Footer";
import MenuBar from "../components/MenuBar";
import NavigationBar from "../components/NavigationBar";
import ErrorPage from "./ErrorPage";

function HomePageError() {
  return (
    <>
      <NavigationBar />
      <MenuBar />
      <ErrorPage />
      <Footer />
    </>
  );
}

export default HomePageError;
