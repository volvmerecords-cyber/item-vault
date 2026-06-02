import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { ProductProvider } from "../context/ProductContext";

export default function ProtectedProductArea() {
  return (
    <ProtectedRoute>
      <ProductProvider>
        <Outlet />
      </ProductProvider>
    </ProtectedRoute>
  );
}
