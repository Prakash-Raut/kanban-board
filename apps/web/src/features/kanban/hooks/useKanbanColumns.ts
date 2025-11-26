import { useMemo } from "react";
import type { TaskStatus } from "../types";

export type KanbanColumn = {
	id: TaskStatus;
	title: string;
};

const DEFAULT_COLUMNS: KanbanColumn[] = [
	{ id: "TODO", title: "To do" },
	{ id: "IN_PROGRESS", title: "In Progress" },
	{ id: "COMPLETED", title: "Done" },
];

export function useKanbanColumns(customColumns?: KanbanColumn[]) {
	return useMemo(() => {
		return customColumns ?? DEFAULT_COLUMNS;
	}, [customColumns]);
}
