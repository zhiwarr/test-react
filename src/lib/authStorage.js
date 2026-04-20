const TOKEN_KEY = "auth_token";
const EMAIL_KEY = "auth_email";

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),

  getEmail: () => localStorage.getItem(EMAIL_KEY),
  setEmail: (email) => localStorage.setItem(EMAIL_KEY, email),
  clearEmail: () => localStorage.removeItem(EMAIL_KEY),

  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
  },
};
