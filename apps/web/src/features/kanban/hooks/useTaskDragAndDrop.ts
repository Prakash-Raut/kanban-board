import type { DropResult } from "@hello-pangea/dnd";
import type { Task, TaskStatus } from "../types";
import { useUpdateTask } from "./useTasks";

type UseTaskDragAndDropOptions = {
	tasks?: Task[];
	onDragEnd?: (result: DropResult) => void;
};

export function useTaskDragAndDrop({
	tasks,
	onDragEnd,
}: UseTaskDragAndDropOptions = {}) {
	const updateTaskMutation = useUpdateTask();

	const handleDragEnd = (result: DropResult) => {
		const { source, destination, draggableId } = result;

		if (!destination) {
			onDragEnd?.(result);
			return;
		}

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			onDragEnd?.(result);
			return;
		}

		const task = tasks?.find((t) => t.id === draggableId);

		if (!task) {
			onDragEnd?.(result);
			return;
		}

		updateTaskMutation.mutate({
			...task,
			status: destination.droppableId as TaskStatus,
		});

		onDragEnd?.(result);
	};

	return {
		handleDragEnd,
		isUpdating: updateTaskMutation.isPending,
	};
}
