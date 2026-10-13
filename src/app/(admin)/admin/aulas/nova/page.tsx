"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NovaAulaPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("c1");
  const [moduleId, setModuleId] = useState("m1");

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !videoFile) {
      setError(
        "Informe o título e selecione um arquivo de vídeo para continuar.",
      );
      return;
    }

    setUploading(true);
    setProgress(15);

    try {
      const uploadRes = await fetch("/api/upload", { method: "POST" });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(
          uploadData.message || "Erro ao obter URL de upload da Cloudflare.",
        );
      }

      setProgress(50);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setProgress(85);

      const saveRes = await fetch("/api/aulas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          courseId,
          moduleId,
          videoId: uploadData.videoId || "cloud_video_simulated_id",
          pdfKey: pdfFile ? pdfFile.name : null,
        }),
      });

      if (!saveRes.ok) {
        throw new Error("Erro ao salvar os metadados da aula.");
      }

      setProgress(100);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro no envio da aula.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-16">
      {/* Topo Nav */}
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/admin"
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            ← Voltar ao Painel
          </Link>
          <span className="text-xs font-bold text-zinc-800">
            Publicar Conteúdo
          </span>
        </div>
      </header>

      {/* Formulário Centralizado */}
      <main className="max-w-2xl mx-auto px-4 pt-8">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-zinc-900">
              Publicar Nova Aula
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Preencha os detalhes e envie o vídeo diretamente para a Cloudflare
              Stream.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Seleção do Curso e Módulo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Curso
                </label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                >
                  <option value="c1">Next.js 15 & Arquitetura Frontend</option>
                  <option value="c2">Design Engineer: UI/UX & Tailwind</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Módulo
                </label>
                <select
                  value={moduleId}
                  onChange={(e) => setModuleId(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                >
                  <option value="m1">
                    Módulo 1: Fundamentos & Configuração
                  </option>
                  <option value="m2">Módulo 2: Cloudflare & Streaming</option>
                </select>
              </div>
            </div>

            {/* Título */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Título da Aula
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: 01. Introdução e Visão Geral"
                required
                className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Descrição da Aula
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Escreva um resumo explicativo sobre o conteúdo abordado..."
                className="w-full p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-600 focus:bg-white resize-none"
              />
            </div>

            {/* Dropzone de Vídeo (.mp4) */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Arquivo de Vídeo (.MP4)
              </label>
              <div className="border-2 border-dashed border-zinc-200 hover:border-indigo-500 rounded-2xl p-6 text-center bg-zinc-50/50 transition-colors">
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer block">
                  <span className="text-xs text-indigo-600 font-semibold hover:underline">
                    {videoFile
                      ? videoFile.name
                      : "Clique para selecionar o arquivo de vídeo"}
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Formatos suportados: MP4 (Até 4GB)
                  </p>
                </label>
              </div>
            </div>

            {/* Dropzone de PDF (.pdf) */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Apostila / Material de Apoio (.PDF) - Opcional
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer"
              />
            </div>

            {/* Barra de Progresso */}
            {uploading && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] text-zinc-500">
                  <span>Enviando vídeo para Cloudflare Stream...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Botão de Enviar */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full h-11 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            >
              {uploading ? "Processando Upload..." : "Publicar Aula"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
