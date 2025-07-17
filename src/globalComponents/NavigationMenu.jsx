/**
 * NavigationMenu Component
 *
 * - Renders a grid of navigation links.
 * - On link click:
 *    - Dispatches selected item to Redux store.
 *    - Closes the popup menu.
 */

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Redux actions
import { setSelectedMenuLinks } from "../application/slices/navbar_Links_Slice";
import { closePopup } from "../application/slices/uiSlice";

// List of navigation items
import { navList } from "../Nav_Menu";
function NavigationMenu() {
  const [selectedNavLink, setSelectedNavLink] = useState([]);

  const dispatch = useDispatch();

  // Logs selectedNavLink when it changes (for debugging/future use)
  // useEffect(() => {
  //   if (selectedNavLink && Object.keys(selectedNavLink).length > 0) {
  //     console.log(selectedNavLink);
  //   }
  // }, [selectedNavLink]);

  // Handles clicking on a menu item
  const handleMenuClick = (item) => {
    dispatch(setSelectedMenuLinks(item));
    dispatch(closePopup("menu"));
  };

  return (
    <nav className="p-6 rounded-2xl max-w-7xl mx-auto shadow-sm my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px rounded-xl overflow-hidden">
        {navList.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            onClick={() => handleMenuClick(item)}
            className="group flex flex-col items-center justify-center gap-2 p-5 text-center bg-white transition duration-200 hover:bg-indigo-50"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xl transition group-hover:bg-indigo-600 group-hover:text-white shadow">
              <i className={item.icon}></i>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavigationMenu;
