import { KanbanView } from "@/features/kanban/kanban-view";

export default function Home() {
	return (
		<div className="container mx-auto w-full max-w-7xl">
			<KanbanView />
		</div>
	);
}
