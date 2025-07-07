import { useEffect } from "react";
import {
  removeLocalStorage,
  setLocalStorage,
} from "../../../../storageManager";

function GenerateBarcode() {
  useEffect(() => {
    return () => {
      removeLocalStorage("navMenuLinks");
    };
  }, []);

  // Set NavLinks In LocalStorage
  // useEffect(() => {
  //   window.addEventListener("popstate", () => {
  //     removeLocalStorage("navMenuLinks");
  //     console.log("hello");
  //   });
  // }, []);
  // useEffect(() => {
  //   setLocalStorage("");
  // }, []);

  return (
    <div className="bg-red-100 p-5 text-center">
      <h1 className="font-bold text-2xl"> Generate Barcode </h1>
    </div>
  );
}

export default GenerateBarcode;
