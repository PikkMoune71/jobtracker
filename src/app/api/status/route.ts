import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = await auth.protect();
  const status = await prisma.status.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      Job: {
        where: { userId },
      },
    },
  });

  return NextResponse.json(status);
}
