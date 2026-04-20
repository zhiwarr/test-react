import { redirect } from "react-router-dom";
import { authStorage } from "../lib/authStorage";

export function publicOnlyLoader() {
  if (authStorage.getToken()) {
    return redirect("/dashboard");
  }

  return null;
}

export function protectedLoader() {
  if (!authStorage.getToken()) {
    return redirect("/login");
  }

  return null;
}

export function defaultRedirectLoader() {
  return redirect(authStorage.getToken() ? "/dashboard" : "/");
}
