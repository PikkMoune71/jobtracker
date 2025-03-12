import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  const { userId } = await auth.protect();

  try {
    const jobs = await prisma.job.findMany({
      where: { statusId: id, userId },
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
