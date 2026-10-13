"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LessonQueued {
  id: string;
  title: string;
  description: string;
  videoFile: File | null;
  pdfFile: File | null;
}

export default function NovoCursoPage() {
  const router = useRouter();

  // Dados do Curso (Sem Slugs / Sem Links de Imagens)
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState("197,00");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // Form de Aula Sequencial (Adicionar na mesma tela)
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Lista de Aulas enfileiradas em ordem (Aula 1, Aula 2, etc.)
  const [lessonsList, setLessonsList] = useState<LessonQueued[]>([]);
  const [publishing, setPublishing] = useState(false);

  // Seleção direta da Imagem de Capa do Computador
  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Adicionar Aula à Fila Sequencial
  const handleAddLessonToList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle) return;

    const newLesson: LessonQueued = {
      id: `lesson_${Date.now()}`,
      title: lessonTitle,
      description: lessonDescription,
      videoFile: videoFile,
      pdfFile: pdfFile,
    };

    setLessonsList([...lessonsList, newLesson]);

    // Limpar campos do form de aula
    setLessonTitle("");
    setLessonDescription("");
    setVideoFile(null);
    setPdfFile(null);
  };

  // Remover aula da fila
  const handleRemoveLesson = (id: string) => {
    setLessonsList(lessonsList.filter((item) => item.id !== id));
  };

  // Publicar o curso inteiro com todas as aulas anexadas
  const handlePublishCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle) return;

    setPublishing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Redireciona para o painel geral admin com o curso cadastrado
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-20">
      {/* Topo Limpo e Widescreen */}
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="w-full px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link
            href="/admin"
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            ← Voltar ao Painel Geral
          </Link>
          <span className="text-xs font-bold text-zinc-800">
            Cadastro do Curso & Upload de Aulas
          </span>
        </div>
      </header>

      {/* Conteúdo Amplo Widescreen (12 Colunas) */}
      <main className="w-full px-6 lg:px-10 pt-8 max-w-[1600px] mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900">Novo Curso</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Preencha os dados do curso e adicione todas as aulas com vídeos
            (.mp4) e apostilas (.pdf) diretamente na mesma tela.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LADO ESQUERDO: DADOS DO CURSO (6 Colunas) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h2 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-3">
                1. Informações Básicas do Curso
              </h2>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Título do Curso
                </label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Ex: Formação em Desenvolvimento Web"
                  required
                  className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Descrição do Curso
                </label>
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows={4}
                  placeholder="Escreva um resumo explicativo do que o aluno irá aprender..."
                  className="w-full p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Preço do Curso (R$)
                </label>
                <input
                  type="text"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  placeholder="197,00"
                  className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-600 transition-all"
                />
              </div>

              {/* Upload da Imagem de Capa do Computador */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Foto de Capa do Curso (Selecione do seu PC)
                </label>
                <div className="border-2 border-dashed border-zinc-200 rounded-xl p-4 bg-zinc-50 hover:bg-zinc-100/80 transition-all text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverSelect}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="cursor-pointer space-y-2 block"
                  >
                    {coverPreview ? (
                      <div className="relative h-40 w-full rounded-lg overflow-hidden border border-zinc-200">
                        <img
                          src={coverPreview}
                          alt="Capa Selecionada"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="py-4 space-y-1">
                        <span className="text-xl block">🖼</span>
                        <span className="text-xs font-semibold text-indigo-600 block">
                          Clique aqui para selecionar a foto da capa
                        </span>
                        <span className="text-[10px] text-zinc-400 block">
                          Suporta JPG e PNG do seu computador
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: UPLOAD DIRETO DE AULAS (6 Colunas) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h2 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-3">
                2. Adicionar Aulas ao Curso (Em Ordem Sequencial)
              </h2>

              <div className="space-y-4 bg-zinc-50/70 p-4 border border-zinc-200/80 rounded-xl">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Título da Aula
                  </label>
                  <input
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="Ex: Aula 01 - Introdução ao Conteúdo"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Descrição da Aula
                  </label>
                  <input
                    type="text"
                    value={lessonDescription}
                    onChange={(e) => setLessonDescription(e.target.value)}
                    placeholder="Resumo rápido do que é tratado no vídeo"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                {/* Upload do Arquivo de Vídeo MP4 do PC */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Arquivo de Vídeo (.MP4)
                  </label>
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-zinc-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                  />
                  {videoFile && (
                    <span className="text-[11px] font-bold text-indigo-600 block mt-1">
                      ✓ Vídeo selecionado: {videoFile.name} (
                      {(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  )}
                </div>

                {/* Upload da Apostila PDF do PC (Opcional) */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Apostila / Material de Apoio (.PDF) - Opcional
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-zinc-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-900 cursor-pointer"
                  />
                  {pdfFile && (
                    <span className="text-[11px] font-bold text-emerald-600 block mt-1">
                      ✓ PDF selecionado: {pdfFile.name}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddLessonToList}
                  className="w-full h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  + Adicionar Aula à Lista do Curso
                </button>
              </div>

              {/* LISTA DAS AULAS ENFILEIRADAS (1ª ATÉ A ÚLTIMA) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Fila de Aulas do Curso ({lessonsList.length})
                </h3>

                {lessonsList.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-zinc-200 text-center text-xs text-zinc-400">
                    Nenhuma aula adicionada ainda. Preencha os dados acima e
                    clique em "+ Adicionar Aula à Lista".
                  </div>
                ) : (
                  <div className="space-y-2">
                    {lessonsList.map((item, index) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-white border border-zinc-200 flex items-center justify-between gap-3 text-xs shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-[11px]">
                            {index + 1}
                          </span>
                          <div>
                            <span className="font-bold text-zinc-900 block">
                              {item.title}
                            </span>
                            <div className="flex items-center gap-3 mt-0.5 text-[10px] font-semibold text-zinc-500">
                              {item.videoFile && (
                                <span className="text-indigo-600">
                                  🎥 {item.videoFile.name}
                                </span>
                              )}
                              {item.pdfFile && (
                                <span className="text-emerald-600">
                                  📄 {item.pdfFile.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveLesson(item.id)}
                          className="text-red-600 hover:text-red-800 font-bold text-xs p-1 cursor-pointer"
                        >
                          ✕ Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* BOTÃO FINAL DE SALVAR TUDO */}
            <button
              onClick={handlePublishCourse}
              disabled={publishing || !courseTitle}
              className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center"
            >
              {publishing
                ? "Publicando Curso e Enviando Aulas..."
                : "Publicar Curso Completo com Aulas →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
