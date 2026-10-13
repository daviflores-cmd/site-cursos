"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CourseItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverUrl: string;
  totalLessons: number;
  completedLessons: number;
  duration: string;
}

const MOCK_COURSES: CourseItem[] = [
  {
    id: "c1",
    slug: "nextjs-15-arquitetura-avancada",
    title: "Next.js 15 & Arquitetura Frontend Avançada",
    description:
      "Aprenda a construir aplicações web de altíssimo desempenho com App Router, TypeScript e Cloudflare.",
    category: "Desenvolvimento",
    coverUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    totalLessons: 24,
    completedLessons: 12,
    duration: "18h 30min",
  },
  {
    id: "c2",
    slug: "tailwind-css-ui-ux-design-engineer",
    title: "Design Engineer: UI/UX & Tailwind CSS",
    description:
      "Domine a criação de interfaces modernas, minimalistas, responsivas e pixel-perfect com animações fluidas.",
    category: "Design & UI/UX",
    coverUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    totalLessons: 16,
    completedLessons: 16,
    duration: "12h 15min",
  },
  {
    id: "c3",
    slug: "infraestrutura-cloud-cloudflare-r2-stream",
    title: "Infraestrutura Cloud com Cloudflare R2 e Stream",
    description:
      "Aprenda a hospedar arquivos e transmitir vídeos com segurança, links assinados e proteção HLS.",
    category: "Cloud & DevOps",
    coverUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    totalLessons: 10,
    completedLessons: 0,
    duration: "08h 45min",
  },
];

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "in_progress" | "completed"
  >("all");

  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const isCompleted =
      course.completedLessons === course.totalLessons &&
      course.totalLessons > 0;
    const isInProgress = course.completedLessons > 0 && !isCompleted;

    if (activeFilter === "in_progress") return matchesSearch && isInProgress;
    if (activeFilter === "completed") return matchesSearch && isCompleted;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-16">
      {/* Topo Navegação Aluno - Sem links administrativos */}
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold shadow-sm">
              C
            </div>
            <span className="font-bold text-sm tracking-tight text-zinc-900 hidden sm:inline-block">
              Plataforma de Cursos
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-700 shadow-sm">
              AL
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Banner de Boas-Vindas */}
        <div className="relative rounded-3xl bg-white border border-zinc-200/80 p-6 sm:p-8 overflow-hidden shadow-sm">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-50/80 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 border border-indigo-200 text-indigo-600 mb-3">
              Área de Aprendizado
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Bem-vindo de volta!
            </h1>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Continue seus estudos de onde parou e acompanhe seu progresso em
              tempo real.
            </p>
          </div>

          {/* Cards de Métricas */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-zinc-100 max-w-md">
            <div>
              <span className="block text-xl font-bold text-zinc-900">3</span>
              <span className="text-[11px] font-medium text-zinc-500">
                Cursos Totais
              </span>
            </div>
            <div>
              <span className="block text-xl font-bold text-indigo-600">
                28
              </span>
              <span className="text-[11px] font-medium text-zinc-500">
                Aulas Concluídas
              </span>
            </div>
            <div>
              <span className="block text-xl font-bold text-zinc-900">39h</span>
              <span className="text-[11px] font-medium text-zinc-500">
                Horas Estudadas
              </span>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 border border-zinc-200/80 w-fit">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === "all"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Todos os Cursos
            </button>
            <button
              onClick={() => setActiveFilter("in_progress")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === "in_progress"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Em Andamento
            </button>
            <button
              onClick={() => setActiveFilter("completed")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === "completed"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Concluídos
            </button>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por curso ou assunto..."
              className="w-full h-10 px-4 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-600 transition-all duration-200 shadow-sm"
            />
          </div>
        </div>

        {/* Grid de Cards de Cursos */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white border border-zinc-200/80 rounded-2xl">
            <p className="text-xs text-zinc-500">
              Nenhum curso encontrado para essa busca.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const progressPercentage = Math.round(
                (course.completedLessons / course.totalLessons) * 100,
              );
              const isCompleted = progressPercentage === 100;

              return (
                <div
                  key={course.id}
                  className="group bg-white hover:bg-zinc-50/50 border border-zinc-200/80 hover:border-zinc-300 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-zinc-200/50"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                      <img
                        src={course.coverUrl}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-white/90 backdrop-blur-md border border-zinc-200/80 text-zinc-800 shadow-sm">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-sm font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] text-zinc-500">
                        <span>
                          {course.completedLessons} de {course.totalLessons}{" "}
                          aulas
                        </span>
                        <span className="font-semibold text-zinc-700">
                          {progressPercentage}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/curso/${course.slug}/aula/a1`}
                      className="w-full h-10 rounded-xl bg-zinc-900 hover:bg-indigo-600 active:scale-[0.98] text-white text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                      {isCompleted
                        ? "Revisar Curso"
                        : course.completedLessons > 0
                          ? "Continuar Assistindo"
                          : "Começar Curso"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
