import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Products"));
const AddItem = lazy(() => import("./pages/AddProduct"));
const ItemDetails = lazy(() => import("./pages/ProductDetails"));
const EditItem = lazy(() => import("./pages/EditRequest"));
const ProtectedProductArea = lazy(() => import("./routes/ProtectedProductArea"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <main>
          <Suspense fallback={<div className="page-loading">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />

              <Route element={<ProtectedProductArea />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/items/:id" element={<ItemDetails />} />
                <Route path="/items/:id/edit" element={<EditItem />} />
              </Route>
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
