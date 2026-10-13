'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

interface LessonItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoFileName?: string;
  pdfFileName?: string;
}

interface ModuleItem {
  id: string;
  title: string;
  lessons: LessonItem[];
}

export default function GerenciadorConteudoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const [modules, setModules] = useState<ModuleItem[]>([
    {
      id: 'm1',
      title: 'Módulo 1: Fundamentos & Configuração da Arquitetura',
      lessons: [
        {
          id: 'l1',
          title: '01. Visão Geral do Projeto e Regras de Negócio',
          description: 'Apresentação da estrutura do software.',
          duration: '12:40',
          videoFileName: 'aula_01_introducao.mp4',
          pdfFileName: 'Apostila_Modulo_1.pdf',
        },
      ],
    },
  ]);

  const [newModuleName, setNewModuleName] = useState('');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleName) return;

    setModules([
      ...modules,
      {
        id: `m_${Date.now()}`,
        title: newModuleName,
        lessons: [],
      },
    ]);
    setNewModuleName('');
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModuleId || !lessonTitle) return;

    setModules(
      modules.map((m) => {
        if (m.id === activeModuleId) {
          return {
            ...m,
            lessons: [
              ...m.lessons,
              {
                id: `l_${Date.now()}`,
                title: lessonTitle,
                description: lessonDescription,
                duration: '15:00',
                videoFileName: videoFile ? videoFile.name : 'video_upload_cloudflare.mp4',
                pdfFileName: pdfFile ? pdfFile.name : undefined,
              },
            ],
          };
        }
        return m;
      })
    );

    setLessonTitle('');
    setLessonDescription('');
    setVideoFile(null);
    setPdfFile(null);
    setActiveModuleId(null);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-16">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="w-full px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/admin" className="text-xs font-semibold text-zinc-600 hover:text-zinc-900">
            ← Voltar ao Painel Geral
          </Link>
          <span className="text-xs font-bold text-zinc-800">Gerenciador de Currículo e Aulas</span>
        </div>
      </header>

      <main className="w-full px-6 lg:px-10 pt-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900">Estrutura do Curso</h1>
            <p className="text-xs text-zinc-500 mt-1">Crie módulos e adicione aulas sequenciais com vídeos MP4 e apostilas em PDF.</p>
          </div>
        </div>

        <form onSubmit={handleAddModule} className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex items-center gap-3 shadow-sm">
          <input
            type="text"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
            placeholder="Nome do Novo Módulo (Ex: Módulo 2: Autenticação & Banco de Dados)"
            required
            className="flex-1 h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600"
          />
          <button
            type="submit"
            className="h-11 px-5 rounded-xl bg-zinc-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            + Adicionar Módulo
          </button>
        </form>

        <div className="space-y-6">
          {modules.map((mod) => (
            <div key={mod.id} className="bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <h3 className="text-sm font-extrabold text-zinc-900">{mod.title}</h3>
                <button
                  onClick={() => setActiveModuleId(mod.id)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold text-xs transition-all cursor-pointer"
                >
                  + Nova Aula neste Módulo
                </button>
              </div>

              {mod.lessons.length === 0 ? (
                <p className="text-xs text-zinc-400 py-4 text-center">Nenhuma aula cadastrada neste módulo ainda.</p>
              ) : (
                <div className="space-y-2">
                  {mod.lessons.map((lesson) => (
                    <div key={lesson.id} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-zinc-900 block">{lesson.title}</span>
                        <p className="text-zinc-500 text-[11px]">{lesson.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] font-semibold text-zinc-500">
                          {lesson.videoFileName && <span className="text-indigo-600">🎥 Vídeo: {lesson.videoFileName}</span>}
                          {lesson.pdfFileName && <span className="text-red-600">📄 PDF: {lesson.pdfFileName}</span>}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-zinc-400">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeModuleId === mod.id && (
                <form onSubmit={handleAddLesson} className="mt-4 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-4">
                  <h4 className="text-xs font-bold text-indigo-950">Cadastrar Nova Aula Sequencial</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      placeholder="Título da Aula (Ex: 02. Rotas Protegidas)"
                      required
                      className="h-10 px-3.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600"
                    />
                    <input
                      type="text"
                      value={lessonDescription}
                      onChange={(e) => setLessonDescription(e.target.value)}
                      placeholder="Descrição Rápida"
                      className="h-10 px-3.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 mb-1">Vídeo MP4 (Cloudflare Stream)</label>
                      <input
                        type="file"
                        accept="video/mp4"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        className="block w-full text-xs text-zinc-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-700 mb-1">Apostila PDF (Cloudflare R2)</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                        className="block w-full text-xs text-zinc-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModuleId(null)}
                      className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-sm"
                    >
                      Salvar Aula
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
