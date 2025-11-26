"use client";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Loader2Icon } from "lucide-react";
import { useKanbanColumns, useTaskDragAndDrop, useTasks } from "../hooks";
import type { TaskStatus } from "../types";
import { KanbanListColumn } from "./kanban-list-column";

export function KanbanContainer() {
	const { data: tasks, isLoading } = useTasks();
	const columns = useKanbanColumns();
	const { handleDragEnd } = useTaskDragAndDrop({ tasks });

	const getTasksByStatus = (status: TaskStatus) => {
		return tasks?.filter((task) => task.status === status) || [];
	};

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader2Icon className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	return (
		<div className="overflow-y-auto">
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="grid min-h-full grid-cols-3 gap-6 p-8">
					{columns.map((column) => (
						<Droppable key={column.id} droppableId={column.id}>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="shrink-0"
								>
									<KanbanListColumn
										id={column.id}
										title={column.title}
										tasks={getTasksByStatus(column.id as TaskStatus)}
										isDraggingOver={snapshot.isDraggingOver}
									/>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					))}
				</div>
			</DragDropContext>
		</div>
	);
}
