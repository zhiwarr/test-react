import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import {
  DashboardCreateProductRoute,
  DashboardLayoutRoute,
  DashboardProductsRoute,
  FallbackRoute,
  GuestHomeRoute,
  GuestLayoutRoute,
  GuestProductsRoute,
  LoginRoute,
} from "./routes/routeElements.jsx";
import {
  defaultRedirectLoader,
  protectedLoader,
  publicOnlyLoader,
} from "./routes/loaders.js";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <GuestLayoutRoute />,
        children: [
          {
            index: true,
            element: <GuestHomeRoute />,
          },
          {
            path: "products",
            element: <GuestProductsRoute />,
          },
          {
            path: "login",
            loader: publicOnlyLoader,
            element: <LoginRoute />,
          },
        ],
      },
      {
        path: "dashboard",
        loader: protectedLoader,
        element: <DashboardLayoutRoute />,
        children: [
          {
            index: true,
            element: <DashboardProductsRoute />,
          },
          {
            path: "products",
            element: <DashboardProductsRoute />,
          },
          {
            path: "products/create",
            element: <DashboardCreateProductRoute />,
          },
        ],
      },
      {
        path: "*",
        loader: defaultRedirectLoader,
        element: <FallbackRoute />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
