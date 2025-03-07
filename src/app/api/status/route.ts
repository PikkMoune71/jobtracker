import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const status = await prisma.status.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(status);
}
