import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import MenuBar from "../components/MenuBar";

function Layout() {
  return (
    <>
      <NavigationBar />
      <MenuBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
