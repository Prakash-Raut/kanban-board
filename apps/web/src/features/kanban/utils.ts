export const getPriorityColor = (priority: string) => {
	switch (priority) {
		case "LOW":
			return "bg-green-500 text-white";
		case "MEDIUM":
			return "bg-yellow-500 text-white";
		case "HIGH":
			return "bg-red-500 text-white";
		default:
			return "bg-gray-500 text-white";
	}
};
