import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  assignAdmin,
} from "../api/admin-only";

// ─── Query Key Factory ──────────────────────────────────────────────
// Centralised keys guarantee consistent cache invalidation everywhere.
export const userKeys = {
  all: ["users"], // getAllUsers
  byId: (id) => ["users", id], // getUserById
};

// ─── Queries ─────────────────────────────────────────────────────────

/**
 * Fetch all users.
 * Data is considered fresh for 30 s; cached for 5 min.
 */
export const useAllUsers = (options = {}) =>
  useQuery({
    queryKey: userKeys.all,
    queryFn: getAllUsers,
    staleTime: 30_000, // 30 s  — avoid re-fetches on tab focus
    gcTime: 5 * 60_000, // 5 min — keep in garbage-collection cache
    refetchOnWindowFocus: true, // silently re-validate when the user returns
    ...options,
  });

/**
 * Fetch a single user by ID.
 * Enabled only when a valid `id` is provided.
 */
export const useUserById = (id, options = {}) =>
  useQuery({
    queryKey: userKeys.byId(id),
    queryFn: () => getUserById(id),
    enabled: !!id, // skip fetch if id is falsy
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    ...options,
  });

// ─── Mutations ───────────────────────────────────────────────────────

/**
 * Edit an existing user.
 * On success → invalidates both the user list and that specific user's detail cache.
 */
export const useEditUser = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => editUser(id, payload),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.invalidateQueries({ queryKey: userKeys.byId(id) });
    },
    ...options,
  });
};

/**
 * Delete a user.
 * On success → invalidates the list and removes the individual user from cache.
 */
export const useDeleteUser = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.removeQueries({ queryKey: userKeys.byId(id) });
    },
    ...options,
  });
};

/**
 * Promote a user to admin.
 * On success → invalidates the list and the user's detail cache so the
 * updated role is reflected everywhere.
 */
export const useAssignAdmin = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => assignAdmin(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.invalidateQueries({ queryKey: userKeys.byId(id) });
    },
    ...options,
  });
};
