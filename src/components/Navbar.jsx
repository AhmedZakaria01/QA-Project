// // // import { useEffect } from "react";
// // // import { useSelector } from "react-redux";

// // // function Navbar() {
// // //   const { selectedMenuLink } = useSelector((state) => state.navbarLinksReducer);
// // //   useEffect(() => {
// // //     console.log(selectedMenuLink);
// // //   }, [selectedMenuLink]);

// // //   return (
// // //     <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-600 h-14 shadow">
// // //       <div className="flex justify-evenly items-center h-full px-4">
// // //         <h3 className="text-white">Navbar</h3>
// // //         {selectedMenuLink && (
// // //           <div className="text-red-400">
// // //             <p> {selectedMenuLink.name} </p>

// // //             {selectedMenuLink?.dropDownMenus?.map((item) => {
// // //               <>
// // //                 <select>
// // //                   <option value={""}> a</option>
// // //                 </select>
// // //               </>;
// // //             })}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </nav>
// // //   );
// // // }

// // // export default Navbar;

// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { getLocalStorage } from "../../storageManager";

// // function Navbar() {
// //   const { selectedMenuLink } = useSelector((state) => state.navbarLinksReducer);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const selectedValue = e.target.value;
// //     if (selectedValue) navigate(selectedValue);
// //   };

// //   // const selectedMenuLink = getLocalStorage("navMenuLinks");
// //   console.log(selectedMenuLink);

// //   return (
// //     <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-600 h-14 shadow">
// //       <div className="flex justify-between items-center h-full px-6">
// //         <h3 className="text-white text-lg font-semibold">Navbar</h3>

// //         {selectedMenuLink?.dropDownMenus?.length > 0 && (
// //           <div className="flex items-center gap-4">
// //             <p className="text-red-300 font-medium">{selectedMenuLink.name}</p>

// //             {selectedMenuLink.dropDownMenus.map((group, idx) => (
// //               <select
// //                 key={idx}
// //                 onChange={handleChange}
// //                 className="px-3 py-1 rounded text-sm text-gray-700"
// //                 defaultValue=""
// //               >
// //                 {console.log(group)}
// //                 <option value="" disabled>
// //                   {group.label}
// //                 </option>
// //                 {group.items.map((opt, i) => (
// //                   <option
// //                     key={i}
// //                     value={opt.link}
// //                   >
// //                     {opt.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   setLocalStorage,
//   removeLocalStorage,
//   getLocalStorage,
// } from "../../storageManager";
// import { useNavigate } from "react-router-dom";
// import { getMenuByPath } from "../utils/getMenuByPath";

// function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [selectedMenuLink, setSelectedMenuLink] = useState(null);

//   useEffect(() => {
//     const matched = getMenuByPath(location.pathname);
//     if (matched) {
//       setSelectedMenuLink(matched);
//       // setLocalStorage("navMenuLinks", matched);
//     } else {
//       setSelectedMenuLink(null);
//       // removeLocalStorage("navMenuLinks");
//     }
//   }, [location.pathname]);

//   const handleChange = (e) => {
//     const selectedValue = e.target.value;
//     if (selectedValue) {
//       navigate(selectedValue);
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-600 h-14 shadow">
//       <div className="flex justify-between items-center h-full px-6">
//         <h3 className="text-white text-lg font-semibold">Navbar</h3>

//         {selectedMenuLink?.dropDownMenus?.length > 0 && (
//           <div className="flex items-center gap-4">
//             <p className="text-red-300 font-medium">{selectedMenuLink.name}</p>

//             {selectedMenuLink.dropDownMenus.map((group, idx) => (
//               <select
//                 key={idx}
//                 onChange={handleChange}
//                 className="px-3 py-1 rounded text-sm text-gray-700"
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   {group.label}
//                 </option>
//                 {group.items.map((opt, i) => (
//                   <option key={i} value={opt.link}>
//                     {opt.name}
//                   </option>
//                 ))}
//               </select>
//             ))}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMenuByPath } from "../utils/getMenuByPath";
import prm_logo from "../../src/assets/prm_logo.png";
import menu_icon from "../../src/assets/menu_icon.png";
import { closePopup, openPopup } from "../application/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../globalComponents/Popup";
import NavigationMenu from "../globalComponents/NavigationMenu";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Holds the current menu Object data
  const [selectedMenuLink, setSelectedMenuLink] = useState(null);

  // Tracks which dropdown index is currently open
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // Stores timeout ID for delayed closing of dropdown
  const [closeTimeout, setCloseTimeout] = useState(null);

  const isOpen = useSelector((state) => state.ui.isPopupOpen);

  const dispatch = useDispatch();
  // Syncs the selected menu based on current route path
  useEffect(() => {
    const matched = getMenuByPath(location.pathname);
    setSelectedMenuLink(matched || null);
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
    dispatch(openPopup());
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 h-14 shadow">
      <div className="flex justify-start items-center h-full px-5">
        <Link to="/" title="Dashboard">
          <img className="w-[60px]" src={prm_logo} alt="PRM Logo" />
        </Link>
        <button className="mx-5" onClick={handleOpenMenu}>
          <img src={menu_icon} className="w-[30px]" alt="Menu" />
        </button>
        {/* The Popup */}
        <Popup
          component={<NavigationMenu />}
          isOpen={isOpen}
          setIsOpen={() => dispatch(closePopup())}
        />
        {/* {console.log(selectedMenuLink)} */}
        {(selectedMenuLink?.dropDownMenus?.length > 0 ||
          selectedMenuLink?.subItems?.length > 0) && (
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
