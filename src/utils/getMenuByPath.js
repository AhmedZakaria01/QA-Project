/**
 * Helper Function: getMenuByPath
-----------------------------------------
 * This function takes a pathname (e.g. "/GenerateBarcode")
 * and searches the navList to find the menu object
 * that matches the current route.

It checks:
- Top-level `link` in each menu
- All nested `dropDownMenus` and their `items[].link`

 # Returns the full menu object if a match is found.
 */

// import { navList } from "../Nav_Menu"; // Array Of Menu Links

// export function getMenuByPath(pathname) {
//   return navList.find((menu) => {
//     if (menu.link === pathname) return true;
//     if (!menu.dropDownMenus) return false;

//     return menu.dropDownMenus.some((group) =>
//       group.items.some((item) => item.link === pathname)
//     );
//   });
// }

import { navList } from "../Nav_Menu";

// export function getMenuByPath(pathname) {
//   return navList.find((menu) => {
//     if (pathname.startsWith(menu.link)) return true;
//     if (!menu.subItems && !menu.dropDownMenus) return false;

//     return (
//       menu.subItems?.some((item) => pathname.startsWith(item.link)) ||
//       menu.dropDownMenus?.some((group) =>
//         group.items.some((item) => pathname.startsWith(item.link))
//       )
//     );
//   });
// }

export function getMenuByPath(pathname) {
  // Try exact link match first
  let exactMatch = navList.find((menu) => pathname === menu.link);
  if (exactMatch) return exactMatch;

  // Then check subItems
  exactMatch = navList.find((menu) =>
    menu.subItems?.some((item) => pathname === item.link)
  );
  if (exactMatch) return exactMatch;

  // Then fallback to startsWith
  return navList.find((menu) => pathname.startsWith(menu.link));
}
