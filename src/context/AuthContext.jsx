import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authStorage } from "../lib/authStorage";
import { useLoginMutation, useLogoutMutation } from "../lib/queryHooks";
import AuthContext from "./authContext";

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
  const [token, setToken] = useState(() => authStorage.getToken());
  const [userEmail, setUserEmail] = useState(
    () => authStorage.getEmail() ?? "",
  );

  const login = async (email, password) => {
    const result = await loginMutation.mutateAsync({ email, password });
    authStorage.setToken(result.token);
    authStorage.setEmail(result.email);
    setToken(result.token);
    setUserEmail(result.email);
    return result;
  };

  const logout = async () => {
    if (token) {
      try {
        await logoutMutation.mutateAsync({ token });
      } catch {
        throw new Error("Logout failed. Please try again.");
      }
    }

    queryClient.removeQueries();
    authStorage.clearAll();
    setToken(null);
    setUserEmail("");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userEmail,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
