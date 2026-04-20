import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Layouts/Auth";
import Guest from "./Layouts/Guest";
import { authStorage } from "./lib/authStorage";
import { createProduct, fetchProducts, login, logout } from "./lib/api";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const [token, setToken] = useState(() => authStorage.getToken());
  const [userEmail, setUserEmail] = useState(
    () => authStorage.getEmail() ?? "",
  );
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const loadProducts = async () => {
      if (!token) {
        setProducts([]);
        return;
      }

      setIsLoadingProducts(true);
      try {
        const data = await fetchProducts(token);
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    void loadProducts();
  }, [token]);

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    authStorage.setToken(result.token);
    authStorage.setEmail(result.email);
    setToken(result.token);
    setUserEmail(result.email);
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await logout(token);
      } catch {
        // Intentionally ignore server logout errors and clear local auth state.
      }
    }

    authStorage.clearAll();
    setToken(null);
    setUserEmail("");
    setProducts([]);
  };

  const handleCreateProduct = async (productInput) => {
    if (!token) return;

    const created = await createProduct(token, productInput);
    setProducts((prev) => [created, ...prev]);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <Guest>
              <section className="px-4 py-10 sm:px-6 lg:px-8">
                <LoginPage onLogin={handleLogin} />
              </section>
            </Guest>
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Auth onLogout={() => void handleLogout()}>
              <DashboardPage
                products={products}
                isLoadingProducts={isLoadingProducts}
                onCreateProduct={handleCreateProduct}
                userEmail={userEmail}
              />
            </Auth>
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}

export default App;
