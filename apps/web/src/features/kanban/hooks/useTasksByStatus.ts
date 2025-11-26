import type { Task, TaskStatus } from "../types";
import { useTasks } from "./useTasks";

export function useTasksByStatus(status: TaskStatus) {
	const { data: tasks, ...rest } = useTasks();

	const filteredTasks =
		tasks?.filter((task: Task) => task.status === status) || [];

	return {
		tasks: filteredTasks,
		...rest,
	};
}
