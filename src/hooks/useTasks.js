import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOpenTasks,
  getTaskOffers,
  createTask,
  updateTask,
  deleteTask,
} from "../api/task-api";
import { submitOffer, acceptOffer } from "../api/offers-api";

// ─── Query Key Factory ──────────────────────────────────────────────
export const taskKeys = {
  all: ["tasks"],
  open: ["tasks", "open"],
  detail: (id) => ["tasks", id],
  offers: (taskId) => ["tasks", taskId, "offers"],
};

// ─── Queries (Tasks) ─────────────────────────────────────────────────

/**
 * Fetch all open/available tasks.
 * Usually refreshed fairly often as tasks get taken.
 */
export const useOpenTasks = (options = {}) =>
  useQuery({
    queryKey: taskKeys.open,
    queryFn: getOpenTasks,
    staleTime: 60_000, // 1 minute
    gcTime: 10 * 60_000, // 10 minutes
    ...options,
  });

/**
 * Fetch all offers for a specific task.
 * Only enabled when a valid `taskId` is provided.
 */
export const useTaskOffers = (taskId, options = {}) =>
  useQuery({
    queryKey: taskKeys.offers(taskId),
    queryFn: () => getTaskOffers(taskId),
    enabled: !!taskId,
    staleTime: 30_000, // 30 seconds (offers can come in quickly)
    ...options,
  });

// ─── Mutations (Tasks) ───────────────────────────────────────────────

/**
 * Create a new task.
 * Note: Payload should be FormData (supports up to 5 images).
 */
export const useCreateTask = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createTask(formData),
    onSuccess: () => {
      // Invalidate open tasks to reflect the newly created task
      qc.invalidateQueries({ queryKey: taskKeys.open });
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
    ...options,
  });
};

/**
 * Update an existing task.
 */
export const useUpdateTask = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, payload }) => updateTask(taskId, payload),
    onSuccess: (_data, { taskId }) => {
      qc.invalidateQueries({ queryKey: taskKeys.detail(taskId) });
      qc.invalidateQueries({ queryKey: taskKeys.open });
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
    ...options,
  });
};

/**
 * Delete a task.
 */
export const useDeleteTask = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (taskId) => deleteTask(taskId),
    onSuccess: (_data, taskId) => {
      qc.removeQueries({ queryKey: taskKeys.detail(taskId) });
      qc.invalidateQueries({ queryKey: taskKeys.open });
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
    ...options,
  });
};

// ─── Mutations (Offers) ──────────────────────────────────────────────

/**
 * Submit an offer on a task.
 */
export const useSubmitOffer = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload) => submitOffer(payload),
    onSuccess: (_data, variables) => {
      // If we know the taskId from the payload, we can invalidate its specific offers list
      if (variables?.taskId) {
        qc.invalidateQueries({ queryKey: taskKeys.offers(variables.taskId) });
      }
    },
    ...options,
  });
};

/**
 * Accept an offer on a task.
 */
export const useAcceptOffer = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    // Variables would ideally include taskId so we can invalidate properly,
    // but the API only takes offerId. We might need the user to pass taskId in the mutation
    // options or variables object for cache invalidation purposes.
    mutationFn: ({ offerId }) => acceptOffer(offerId),
    onSuccess: (_data, variables) => {
      // If the caller passes taskId along with offerId (e.g., { offerId, taskId }), invalidate it:
      if (variables?.taskId) {
        qc.invalidateQueries({ queryKey: taskKeys.offers(variables.taskId) });
        qc.invalidateQueries({ queryKey: taskKeys.detail(variables.taskId) });
      }

      // Also general invalidation to ensure UI updates
      qc.invalidateQueries({ queryKey: taskKeys.open });
    },
    ...options,
  });
};
