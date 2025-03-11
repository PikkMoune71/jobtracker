import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }
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
        userId,
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

export async function GET(req: NextRequest) {
  let userId;
  try {
    const auth = getAuth(req);
    userId = auth.userId;

    console.log("User ID:", userId);

    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }
  } catch (error) {
    console.error("Erreur d'authentification Clerk:", error);
    return NextResponse.json(
      { message: "Erreur d'authentification" },
      { status: 500 }
    );
  }

  try {
    // Récupération des jobs, y compris leur statut
    const jobs = await prisma.job.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
      include: { status: true },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
