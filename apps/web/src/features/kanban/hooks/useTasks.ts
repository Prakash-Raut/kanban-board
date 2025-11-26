import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Task, TaskPriority, TaskStatus } from "../types";

const TASKS_QUERY_KEY = ["tasks"] as const;

// Read - Fetch all tasks
export function useTasks() {
	return useQuery({
		queryKey: TASKS_QUERY_KEY,
		queryFn: async () => {
			const response = await fetch("/api/tasks");
			if (!response.ok) {
				throw new Error("Failed to fetch tasks");
			}
			return response.json() as Promise<Task[]>;
		},
	});
}

// Create - Create a new task
export type CreateTaskInput = {
	title: string;
	description?: string;
	status?: TaskStatus;
	priority?: TaskPriority;
};

export function useCreateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: CreateTaskInput) => {
			const response = await fetch("/api/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(input),
			});

			if (!response.ok) {
				throw new Error("Failed to create task");
			}

			return response.json() as Promise<Task>;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
			toast.success("Task created successfully");
		},
		onError: () => {
			toast.error("Failed to create task");
		},
	});
}

// Update - Update an existing task
export function useUpdateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (task: Task) => {
			const response = await fetch(`/api/tasks/${task.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...task }),
			});

			if (!response.ok) {
				throw new Error("Failed to update task");
			}

			return response.json() as Promise<Task>;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
			toast.success("Task updated successfully");
		},
		onError: () => {
			toast.error("Failed to update task");
		},
	});
}

// Delete - Delete a task
export function useDeleteTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (taskId: string) => {
			const response = await fetch(`/api/tasks/${taskId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to delete task");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
			toast.success("Task deleted successfully");
		},
		onError: () => {
			toast.error("Failed to delete task");
		},
	});
}
