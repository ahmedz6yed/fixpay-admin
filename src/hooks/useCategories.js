import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  getCategoryById,
  getWorkersByCategory,
  createCategory,
} from "../api/categories-api";

// ─── Query Key Factory ──────────────────────────────────────────────
export const categoryKeys = {
  all: ["categories"],
  byId: (id) => ["categories", id],
  workersByCategoryId: (id) => ["categories", id, "workers"],
};

// ─── Queries ─────────────────────────────────────────────────────────

/**
 * Fetch all categories.
 * Categories rarely change, so we can use a longer stale time.
 */
export const useAllCategories = (options = {}) =>
  useQuery({
    queryKey: categoryKeys.all,
    queryFn: getAllCategories,
    staleTime: 5 * 60_000, // 5 minutes (categories rarely change)
    gcTime: 30 * 60_000, // 30 minutes
    ...options,
  });

/**
 * Fetch a single category by ID.
 * Enabled only when a valid `id` is provided.
 */
export const useCategoryById = (id, options = {}) =>
  useQuery({
    queryKey: categoryKeys.byId(id),
    queryFn: () => getCategoryById(id),
    enabled: !!id, // skip fetch if id is falsy
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    ...options,
  });

/**
 * Fetch all workers within a specific category.
 * Enabled only when a valid `id` is provided.
 */
export const useWorkersByCategory = (id, options = {}) =>
  useQuery({
    queryKey: categoryKeys.workersByCategoryId(id),
    queryFn: () => getWorkersByCategory(id),
    enabled: !!id,
    staleTime: 60_000, // 1 minute (workers availability might change more often)
    gcTime: 10 * 60_000, // 10 minutes
    ...options,
  });

// ─── Mutations ───────────────────────────────────────────────────────

/**
 * Create a new service category (admin only).
 * On success → invalidates the category list cache.
 */
export const useCreateCategory = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createCategory(payload),
    onSuccess: () => {
      // Invalidate the 'all categories' query so the new category shows up
      qc.invalidateQueries({ queryKey: categoryKeys.all });
    },
    ...options,
  });
};
