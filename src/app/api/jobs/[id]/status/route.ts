import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// update job status
export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth.protect();

    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { jobId, statusId } = body;

    // Vérifier si le job existe
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return NextResponse.json(
        { message: "Candidature introuvable" },
        { status: 404 }
      );
    }

    // Vérifier si le statut existe
    const existingStatus = await prisma.status.findUnique({
      where: { id: statusId },
    });

    if (!existingStatus) {
      return NextResponse.json(
        { message: "Statut invalide ou introuvable" },
        { status: 400 }
      );
    }

    // Mettre à jour le statut du job
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: {
          connect: { id: existingStatus.id },
        },
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
