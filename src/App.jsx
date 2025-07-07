import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./features/auth/PageNotFound";
import Layout from "./Layout";
import Login from "./features/auth/components/Login";
import NavigationMenu from "./globalComponents/NavigationMenu";
import BarcodeGenerator from "./features/barcode/components/GenerateBarcode";
import GenerateBarcode from "./features/barcode/components/GenerateBarcode";
import Boxes from "./features/dataEntry/components/Boxes";
import Files from "./features/dataEntry/components/Files";
import Documents from "./features/dataEntry/components/Documents";
import Dashboard from "./features/dashboard/components/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="/GenerateBarcode" element={<GenerateBarcode />} />
          <Route path="/NavigationMenu" element={<NavigationMenu />} />
          {/* Data Entry */}
          <Route path="/Boxes" element={<Boxes />} />
          <Route path="/Files" element={<Files />} />
          <Route path="/Documents" element={<Documents />} />
        </Route>

        {/* Routes without Layout */}
        <Route path="/login" element={<Login />} />

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
