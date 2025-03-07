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
      status,
    } = body;

    // Validation des champs
    if (
      !title ||
      !description ||
      !company ||
      !type ||
      !location ||
      !contactEmail ||
      !salary ||
      !status
    ) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si le statut existe
    const existingStatus = await prisma.status.findUnique({
      where: { id: status.id },
    });

    if (!existingStatus) {
      return NextResponse.json(
        { message: "Statut invalide ou introuvable" },
        { status: 400 }
      );
    }

    // Création du job avec le statut lié
    const job = await prisma.job.create({
      data: {
        title,
        description,
        company,
        type,
        location,
        contactEmail,
        salary,
        status: {
          connect: { id: existingStatus.id }, // Relier le statut par son ID
        },
        createdAt: new Date(),
      },
    });

    // Réponse avec le job créé
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Récupération des jobs, y compris leur statut
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      include: { status: true }, // Inclure le statut dans la réponse
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
