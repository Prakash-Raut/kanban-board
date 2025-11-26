"use client";

import { Draggable } from "@hello-pangea/dnd";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "../hooks";
import type { Task, TaskPriority, TaskStatus } from "../types";
import { KanbanCard } from "./kanban-card";

type Props = {
	id: TaskStatus;
	title: string;
	tasks: Task[];
	isDraggingOver: boolean;
};

export function KanbanListColumn({ id, title, tasks, isDraggingOver }: Props) {
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [newTaskDescription, setNewTaskDescription] = useState("");
	const [newTaskPriority, setNewTaskPriority] =
		useState<TaskPriority>("MEDIUM");

	const { mutate: addTask } = useCreateTask();

	const handleAddTask = () => {
		if (newTaskTitle.trim()) {
			addTask({
				title: newTaskTitle,
				description: newTaskDescription,
				status: id,
				priority: newTaskPriority,
			});
			setNewTaskTitle("");
			setNewTaskDescription("");
			setNewTaskPriority("MEDIUM");
			setIsAddingTask(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && newTaskTitle.trim()) {
			handleAddTask();
		}
		if (e.key === "Escape") {
			setIsAddingTask(false);
			setNewTaskTitle("");
			setNewTaskDescription("");
			setNewTaskPriority("MEDIUM");
		}
	};

	const priorities: TaskPriority[] = ["LOW", "MEDIUM", "HIGH"];

	return (
		<div
			className={`flex w-80 flex-col rounded-lg border border-border transition-all duration-200 ${
				isDraggingOver ? "" : ""
			}`}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3">
				<h2 className="font-semibold">{title}</h2>
				<span className="text-muted-foreground text-sm">
					{tasks.length} {id !== "COMPLETED" ? "Open Tasks" : "Completed"}
				</span>
			</div>

			<div className="p-3">
				{isAddingTask ? (
					<div className="space-y-2">
						<Input
							type="text"
							placeholder="Add a task..."
							value={newTaskTitle}
							onChange={(e) => setNewTaskTitle(e.target.value)}
							onKeyDown={handleKeyDown}
							className="w-full transition-all"
							autoFocus
						/>
						<Textarea
							placeholder="Add description (optional)..."
							value={newTaskDescription}
							onChange={(e) => setNewTaskDescription(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Escape") {
									setIsAddingTask(false);
									setNewTaskTitle("");
									setNewTaskDescription("");
									setNewTaskPriority("MEDIUM");
								}
							}}
							className="w-full resize-none transition-all"
							rows={2}
						/>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="w-full justify-between">
									<span className="capitalize">{newTaskPriority}</span>
									<ChevronDownIcon className="h-4 w-4 opacity-50" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								{priorities.map((priority) => (
									<DropdownMenuItem
										key={priority}
										onClick={() => setNewTaskPriority(priority)}
									>
										<span className="capitalize">{priority}</span>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="flex justify-end gap-2">
							<Button onClick={handleAddTask}>Add</Button>
							<Button
								onClick={() => {
									setIsAddingTask(false);
									setNewTaskTitle("");
									setNewTaskDescription("");
									setNewTaskPriority("MEDIUM");
								}}
								variant="outline"
							>
								Cancel
							</Button>
						</div>
					</div>
				) : (
					<Button
						className="w-full"
						variant="secondary"
						onClick={() => setIsAddingTask(true)}
					>
						<PlusIcon className="h-4 w-4" />
						Add task
					</Button>
				)}
			</div>

			{/* Tasks Container */}
			<div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
				{tasks.map((task, index) => (
					<Draggable key={task.id} draggableId={task.id} index={index}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
							>
								<KanbanCard task={task} isDragging={snapshot.isDragging} />
							</div>
						)}
					</Draggable>
				))}
			</div>
		</div>
	);
}
