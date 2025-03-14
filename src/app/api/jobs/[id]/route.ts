import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Récupération de l'ID dans l'URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "ID manquant" }, { status: 400 });
    }

    // Vérification de l'authentification
    const { userId } = await auth.protect();

    if (!userId) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    // Récupération du job depuis la BDD
    const job = await prisma.job.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!job) {
      return NextResponse.json({ message: "Job non trouvé" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Erreur lors de la récupération du job :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    const jobData = await req.json();
    delete jobData.id;
    delete jobData.statusId;

    if (jobData.status) {
      jobData.status = {
        connect: {
          id: jobData.status.id,
        },
      };
    }

    const updatedJob = await prisma.job.update({
      where: { id: id },
      data: jobData,
    });

    return new Response(JSON.stringify(updatedJob), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du job:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
}
