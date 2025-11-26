import prisma from "@kanban/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		const tasks = await prisma.task.findMany();
		return NextResponse.json(tasks);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch tasks" },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { title, description, status, priority } = await request.json();
		const task = await prisma.task.create({
			data: { title, description, status, priority },
		});
		return NextResponse.json(task);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create task" },
			{ status: 500 },
		);
	}
}
