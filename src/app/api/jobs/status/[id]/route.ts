import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  console.log(id);

  try {
    const jobs = await prisma.job.findMany({
      where: { statusId: id },
      include: { status: true },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
