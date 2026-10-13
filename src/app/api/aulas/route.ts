import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, courseId, moduleId, videoId, pdfKey } = body;

    if (!title || !courseId || !moduleId) {
      return NextResponse.json(
        { message: "Campos obrigatórios não informados." },
        { status: 400 },
      );
    }

    // Gravação segura no banco de dados
    await db.query(
      `INSERT INTO aulas (id, modulo_id, titulo, descricao, video_id, pdf_key) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [`aula_${Date.now()}`, moduleId, title, description, videoId, pdfKey],
    );

    return NextResponse.json({
      success: true,
      message: "Aula cadastrada com sucesso!",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao registrar os dados da aula no banco de dados." },
      { status: 500 },
    );
  }
}
