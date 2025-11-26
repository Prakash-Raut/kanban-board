const TaskStatus = {
	TODO: "TODO",
	IN_PROGRESS: "IN_PROGRESS",
	COMPLETED: "COMPLETED",
} as const;

const TaskPriority = {
	LOW: "LOW",
	MEDIUM: "MEDIUM",
	HIGH: "HIGH",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export type Task = {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	priority: TaskPriority;
	createdAt: Date;
	updatedAt: Date;
};
