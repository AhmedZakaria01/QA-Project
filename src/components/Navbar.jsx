import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMenuByPath } from "../utils/getMenuByPath";
import prm_logo from "../../src/assets/prm_logo.png";
import menu_icon from "../../src/assets/menu.png";
import { closePopup, openPopup } from "../application/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../globalComponents/Popup";
import NavigationMenu from "../globalComponents/NavigationMenu";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  // Holds the current menu Object data
  const [selectedMenuLink, setSelectedMenuLink] = useState(null);

  // Tracks which dropdown index is currently open
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // Stores timeout ID for delayed closing of dropdown
  const [closeTimeout, setCloseTimeout] = useState(null);

  const { isMenuPopupOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  // Syncs the selected menu based on current route path
  useEffect(() => {
    const matched = getMenuByPath(location.pathname);
    setSelectedMenuLink(matched || null);
    // console.log(matched);
  }, [location.pathname]);

  // Handles navigation when clicking an item
  const handleItemClick = (link) => {
    navigate(link);
    setOpenDropdownIndex(null); // Close dropdown after click
  };

  // Opens the dropdown for a specific index (used on hover)
  const handleMouseEnter = (idx) => {
    clearTimeout(closeTimeout); // Cancel any pending close
    setOpenDropdownIndex(idx);
  };

  // Closes the dropdown after a short delay (prevents flicker)
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdownIndex(null);
    }, 100);
    setCloseTimeout(timeout);
  };

  // Cleanup timeout on component unmount or rerender
  useEffect(() => {
    return () => clearTimeout(closeTimeout);
  }, [closeTimeout]);

  // Handle Open Menu PopUp
  const handleOpenMenu = () => {
    dispatch(openPopup('menu'));
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 h-14 shadow">
      <div className="flex justify-start items-center h-full px-5">
        <Link to="/" title="Dashboard">
          <img className="w-[60px]" src={prm_logo} alt="PRM Logo" />
        </Link>
        <button className="mx-5" onClick={handleOpenMenu}>
          <img src={menu_icon} className="w-[35px]" alt="Menu" />
        </button>
        {/* The Popup */}
        <Popup
          component={<NavigationMenu />}
          isOpen={isMenuPopupOpen}
          setIsOpen={() => dispatch(closePopup("menu"))}
        />
        {selectedMenuLink?.name && (
          <div className="flex items-center gap-6 relative px-6">
            {/* Display the main menu title */}
            <p className="text-red-300 font-medium text-sm">
              {selectedMenuLink.name}
            </p>

            {/* Render dropdown groups if present */}
            {selectedMenuLink.dropDownMenus?.map((group, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Dropdown Trigger */}
                <div className="text-white hover:text-indigo-300 font-medium text-sm flex items-center gap-1 cursor-pointer">
                  {group.label}
                  <i className="fa-solid fa-chevron-down text-xs mt-0.5"></i>
                </div>

                {/* Dropdown Items List */}
                {openDropdownIndex === idx && (
                  <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white text-black shadow-md rounded w-52 z-50">
                    {group.items.map((opt, i) => (
                      <li
                        key={i}
                        onClick={() => handleItemClick(opt.link)}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {opt.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Render subItems next to dropdowns if present */}
            {selectedMenuLink?.subItems?.length > 0 && (
              <div className="flex items-center gap-4 ml-2">
                {selectedMenuLink.subItems.map((item, i) => (
                  <Link
                    key={i}
                    to={item.link}
                    className="text-white text-sm font-medium hover:text-indigo-300 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
