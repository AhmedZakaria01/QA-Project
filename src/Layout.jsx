import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedMenuLinks } from "./application/slices/navbar_Links_Slice";
import { getMenuByPath } from "./utils/getMenuByPath";
import { setLocalStorage } from "../storageManager";

function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const matchedMenu = getMenuByPath(location.pathname);

    if (matchedMenu) {
      dispatch(setSelectedMenuLinks(matchedMenu));
      // setLocalStorage("navMenuLinks", matchedMenu);
    }
  }, [location.pathname, dispatch]);
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
