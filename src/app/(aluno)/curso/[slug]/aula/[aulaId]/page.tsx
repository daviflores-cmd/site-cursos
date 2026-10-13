"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  active?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const MOCK_MODULES: Module[] = [
  {
    id: "m1",
    title: "Módulo 1: Fundamentos & Configuração",
    lessons: [
      {
        id: "a1",
        title: "01. Introdução e Visão Geral da Arquitetura",
        duration: "12:40",
        completed: true,
        active: true,
      },
      {
        id: "a2",
        title: "02. Configurando o Ambiente com Next.js 15",
        duration: "18:15",
        completed: true,
      },
      {
        id: "a3",
        title: "03. Estrutura de Pastas e Roteamento App Router",
        duration: "22:05",
        completed: false,
      },
    ],
  },
  {
    id: "m2",
    title: "Módulo 2: Integração Cloudflare & Streaming",
    lessons: [
      {
        id: "a4",
        title: "04. Entendendo o Cloudflare Stream e R2",
        duration: "15:30",
        completed: false,
      },
      {
        id: "a5",
        title: "05. Direct Uploads e URLs Assinadas de Segurança",
        duration: "25:10",
        completed: false,
      },
    ],
  },
];

export default function AulaPage() {
  const [activeTab, setActiveTab] = useState<"description" | "material">(
    "description",
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col">
      {/* Topo Navegação Sala de Aula */}
      <header className="h-14 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/cursos"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors py-1.5 px-3 rounded-lg hover:bg-zinc-100"
          >
            ← Voltar para Cursos
          </Link>
          <span className="text-zinc-300">|</span>
          <h1 className="text-xs sm:text-sm font-bold text-zinc-800 truncate max-w-xs sm:max-w-md">
            Next.js 15 & Arquitetura Frontend Avançada
          </h1>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-xs font-semibold text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg lg:hidden"
        >
          {sidebarOpen ? "Ocultar Aulas" : "Ver Aulas"}
        </button>
      </header>

      {/* Conteúdo Principal + Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ÁREA CENTRAL - PLAYER E DETALHES */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Container do Player */}
          <div className="relative w-full aspect-video bg-zinc-900 rounded-2xl border border-zinc-200/80 overflow-hidden shadow-lg flex items-center justify-center group">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-zinc-950/90 via-zinc-900/40 to-transparent p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 cursor-pointer hover:scale-105 active:scale-95 transition-all">
                ▶
              </div>
              <p className="text-xs text-zinc-300 mt-4 font-medium">
                Clique para iniciar a aula • 01. Introdução e Visão Geral da
                Arquitetura
              </p>
            </div>
          </div>

          {/* Cabeçalho da Aula */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80">
            <div>
              <span className="text-xs font-semibold text-indigo-600">
                Módulo 1 • Aula 01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
                01. Introdução e Visão Geral da Arquitetura
              </h2>
            </div>

            <button
              onClick={() => setIsCompleted(!isCompleted)}
              className={`h-11 px-5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isCompleted
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-sm"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-[0.98]"
              }`}
            >
              {isCompleted ? "✓ Aula Concluída" : "Marcar como Concluída"}
            </button>
          </div>

          {/* Abas de Conteúdo */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b border-zinc-200/80">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === "description"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Descrição da Aula
              </button>
              <button
                onClick={() => setActiveTab("material")}
                className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === "material"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Material Complementar (.PDF)
              </button>
            </div>

            {/* Conteúdo da Aba */}
            {activeTab === "description" ? (
              <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed space-y-3 max-w-3xl">
                <p>
                  Nesta aula introdutória, analisamos os fundamentos de
                  engenharia por trás do projeto: desde o fluxo de autenticação
                  e controle de acesso até a distribuição performática de vídeos
                  e arquivos.
                </p>
                <p className="text-zinc-500">
                  Certifique-se de realizar o download da apostila complementar
                  na aba ao lado para acompanhar o roteiro de estudos.
                </p>
              </div>
            ) : (
              <div className="max-w-md bg-white border border-zinc-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">
                      Apostila_Modulo_1.pdf
                    </h4>
                    <p className="text-[11px] text-zinc-500">
                      2.4 MB • Documento de Apoio
                    </p>
                  </div>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "Download iniciado via link seguro do Cloudflare R2!",
                    );
                  }}
                  className="h-9 px-3.5 rounded-xl bg-zinc-900 hover:bg-indigo-600 text-xs font-semibold text-white transition-all duration-200 flex items-center justify-center shadow-sm"
                >
                  Baixar PDF
                </a>
              </div>
            )}
          </div>
        </main>

        {/* SIDEBAR - LISTA DE AULAS */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block w-full lg:w-80 bg-white border-l border-zinc-200/80 flex-shrink-0 overflow-y-auto`}
        >
          <div className="p-4 border-b border-zinc-200/80">
            <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
              Conteúdo do Curso
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              5 aulas • Duração total: 1h 33m
            </p>
          </div>

          <div className="divide-y divide-zinc-100">
            {MOCK_MODULES.map((module) => (
              <div key={module.id} className="p-3">
                <h4 className="text-xs font-bold text-zinc-500 mb-2 px-2">
                  {module.title}
                </h4>

                <div className="space-y-1">
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/curso/nextjs-15/aula/${lesson.id}`}
                      className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-2 block ${
                        lesson.active
                          ? "bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold"
                          : "hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                            lesson.completed
                              ? "bg-emerald-100 text-emerald-700 font-bold"
                              : "bg-zinc-200 text-zinc-600"
                          }`}
                        >
                          {lesson.completed ? "✓" : "•"}
                        </span>
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 flex-shrink-0">
                        {lesson.duration}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
