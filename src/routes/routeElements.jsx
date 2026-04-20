import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Auth from "../Layouts/Auth";
import Guest from "../Layouts/Guest";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CreateProductPage from "../pages/products/CreateProductPage";
import GuestProductsGridPage from "../pages/products/GuestProductsGridPage";
import ProductsListPage from "../pages/products/ProductsListPage";
import useAuth from "../context/useAuth";

export function GuestLayoutRoute() {
  const navigate = useNavigate();

  return (
    <Guest onSignInClick={() => navigate("/login")}>
      <Outlet />
    </Guest>
  );
}

export function GuestHomeRoute() {
  return <HomePage />;
}

export function GuestProductsRoute() {
  return <GuestProductsGridPage />;
}

export function LoginRoute() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    await login(email, password);
    navigate("/dashboard", { replace: true });
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <LoginPage onLogin={handleLogin} />
    </section>
  );
}

export function DashboardLayoutRoute() {
  const navigate = useNavigate();
  const { logout, userEmail } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <Auth onLogout={() => void handleLogout()} userEmail={userEmail}>
      <Outlet />
    </Auth>
  );
}

export function DashboardProductsRoute() {
  const { token } = useAuth();
  return <ProductsListPage token={token} />;
}

export function DashboardCreateProductRoute() {
  const { token } = useAuth();
  return <CreateProductPage token={token} />;
}

export function FallbackRoute() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />;
}
