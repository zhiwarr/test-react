import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  fetchCategories,
  fetchProducts,
  login,
  logout,
} from "./api";

export const queryKeys = {
  products: (token) => ["products", token],
  categories: (token) => ["categories", token],
  guestProducts: ["guest-products"],
};

export function useProductsQuery(token) {
  return useQuery({
    queryKey: queryKeys.products(token),
    queryFn: () => fetchProducts(token),
    enabled: Boolean(token),
  });
}

export function useGuestProductsQuery() {
  return useQuery({
    queryKey: queryKeys.guestProducts,
    queryFn: () => fetchProducts(),
  });
}

export function useCreateProductMutation(token) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input) => createProduct(token, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.products(token),
      });
    },
  });
}

export function useCategoriesQuery(token) {
  return useQuery({
    queryKey: queryKeys.categories(token),
    queryFn: () => fetchCategories(token),
    enabled: Boolean(token),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: ({ token }) => logout(token),
  });
}
