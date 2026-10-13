import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validação de entrada
    if (!email || !password) {
      return NextResponse.json(
        { message: "E-mail e senha são obrigatórios." },
        { status: 400 },
      );
    }

    // Lógica de Autenticação
    // Credencial de teste do Administrador
    if (email === "admin@cursos.com" && password === "123456") {
      return NextResponse.json({
        success: true,
        user: {
          id: "admin_1",
          name: "Administrador",
          email: "admin@cursos.com",
          role: "ADMIN",
        },
      });
    }

    // Autenticação genérica de aluno para testes
    if (password.length >= 6) {
      return NextResponse.json({
        success: true,
        user: {
          id: "user_1",
          name: "Aluno",
          email,
          role: "STUDENT",
        },
      });
    }

    return NextResponse.json(
      { message: "Credenciais inválidas. Verifique o e-mail e a senha." },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno no servidor ao processar o acesso." },
      { status: 500 },
    );
  }
}
