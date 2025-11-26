"use client";

import { Edit2Icon, SaveIcon, Trash2Icon, XIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useDeleteTask, useUpdateTask } from "../hooks";
import type { Task, TaskPriority } from "../types";
import { getPriorityColor } from "../utils";

type Props = {
	task: Task;
	isDragging: boolean;
};

export function KanbanCard({ task, isDragging }: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(task.title);
	const [editStatus, setEditStatus] = useState(task.status);
	const [editPriority, setEditPriority] = useState(task.priority);
	const [editDescription, setEditDescription] = useState(
		task.description || "",
	);

	const { mutate: deleteTask } = useDeleteTask();
	const { mutate: updateTask } = useUpdateTask();

	const handleEdit = (input: Task) => {
		updateTask(input);
	};

	const handlePriorityChange = (newPriority: TaskPriority) => {
		updateTask({
			...task,
			priority: newPriority,
		});
	};

	const priorities: TaskPriority[] = ["LOW", "MEDIUM", "HIGH"];

	const handleDelete = (taskId: string) => {
		deleteTask(taskId);
	};

	const handleCancel = () => {
		setEditTitle(task.title);
		setEditDescription(task.description || "");
		setEditPriority(task.priority);
		setEditStatus(task.status);
		setIsEditing(false);
	};

	const handleSave = () => {
		handleEdit({
			...task,
			title: editTitle,
			description: editDescription,
			priority: editPriority,
			status: editStatus,
		});
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>{task.title}</CardTitle>
					<CardContent className="space-y-2">
						<Input
							type="text"
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Escape") {
									handleCancel();
								}
							}}
							className="w-full transition-all"
							autoFocus
						/>
						<Textarea
							value={editDescription}
							onChange={(e) => setEditDescription(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Escape") {
									handleCancel();
								}
							}}
							className="w-full resize-none transition-all"
							rows={2}
						/>
						<div className="flex gap-2">
							<Button
								onClick={handleSave}
								variant="ghost"
								size="icon"
								title="Save"
							>
								<SaveIcon />
							</Button>
							<Button
								onClick={handleCancel}
								variant="ghost"
								size="icon"
								title="Cancel"
							>
								<XIcon />
							</Button>
						</div>
					</CardContent>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card className={cn(isDragging && "rotate-3 opacity-50", "group")}>
			<CardHeader>
				<CardTitle>{task.title}</CardTitle>
				<CardAction className="space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
					<Button
						onClick={() => setIsEditing(true)}
						title="Edit task"
						variant="outline"
						size="icon"
					>
						<Edit2Icon />
					</Button>
					<Button
						onClick={() => handleDelete(task.id)}
						variant="secondary"
						size="icon"
						title="Delete task"
					>
						<Trash2Icon />
					</Button>
				</CardAction>
			</CardHeader>
			{task.description && (
				<CardContent>
					<p className="mb-3 line-clamp-2 text-sm leading-relaxed">
						{task.description}
					</p>
				</CardContent>
			)}
			<CardFooter className="flex flex-col items-start justify-between gap-2 pt-3">
				{task.priority && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Badge
								variant="outline"
								className={cn(
									getPriorityColor(task.priority),
									"cursor-pointer capitalize transition-opacity hover:opacity-80",
								)}
							>
								{task.priority}
							</Badge>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{priorities.map((priority) => (
								<DropdownMenuItem
									key={priority}
									onClick={() => handlePriorityChange(priority)}
									className="capitalize"
								>
									{priority}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</CardFooter>
		</Card>
	);
}
