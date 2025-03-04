import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      company,
      type,
      location,
      contactEmail,
      salary,
    } = body;

    if (
      !title ||
      !description ||
      !company ||
      !type ||
      !location ||
      !contactEmail ||
      !salary
    ) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        company,
        type,
        location,
        contactEmail,
        salary,
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(jobs);
}
