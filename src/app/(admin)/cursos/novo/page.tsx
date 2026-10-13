"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NovoCursoPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Desenvolvimento");
  const [price, setPrice] = useState("197,00");
  const [originalPrice, setOriginalPrice] = useState("297,00");
  const [coverUrl, setCoverUrl] = useState("");
  const [duration, setDuration] = useState("10h 00min");
  const [certificateApprovalMode, setCertificateApprovalMode] = useState<
    "automatic_quiz" | "manual_admin"
  >("automatic_quiz");

  const [saving, setSaving] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redireciona direto para a gestão de módulos do novo curso
    router.push("/admin/cursos/c1/conteudo");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-16">
      {/* Topo Nav Widescreen */}
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="w-full px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link
            href="/admin"
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            ← Voltar ao Painel Geral
          </Link>
          <span className="text-xs font-bold text-zinc-800">
            Cadastro de Novo Curso
          </span>
        </div>
      </header>

      {/* Form Widescreen 12 Colunas */}
      <main className="w-full px-6 lg:px-10 pt-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Coluna Esquerda: Informações Gerais & Comerciais (7 Colunas) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h1 className="text-lg font-extrabold text-zinc-900">
                Informações Principais do Curso
              </h1>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Título do Curso
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Ex: Next.js 15 & Arquitetura Frontend Avançada"
                  required
                  className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  URL Amigável (Slug)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="nextjs-15-arquitetura-avancada"
                  required
                  className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  >
                    <option value="Desenvolvimento">Desenvolvimento</option>
                    <option value="Design & UI/UX">Design & UI/UX</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Inteligência Artificial">
                      Inteligência Artificial
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Carga Horária Estimada
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="18h 30min"
                    className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Descrição Detalhada
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Escreva uma apresentação completa do curso para a vitrine comercial..."
                  className="w-full p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white resize-none"
                />
              </div>
            </div>

            {/* Configurações de Preço e Certificado */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h2 className="text-base font-bold text-zinc-900">
                Valores Comerciais & Certificação
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Preço Promocional (R$)
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="197,00"
                    className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    Preço Original Risca (R$)
                  </label>
                  <input
                    type="text"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="297,00"
                    className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Regra de Liberação do Certificado
                </label>
                <select
                  value={certificateApprovalMode}
                  onChange={(e: any) =>
                    setCertificateApprovalMode(e.target.value)
                  }
                  className="w-full h-11 px-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                >
                  <option value="automatic_quiz">
                    Aprovação Automática (Ao atingir 70% no Quiz)
                  </option>
                  <option value="manual_admin">
                    Aprovação Manual do Administrador (Pelo Painel)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Capa & Visualização Prévia (5 Colunas) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="text-base font-bold text-zinc-900">
                Imagem de Capa do Curso
              </h2>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  URL da Imagem de Capa
                </label>
                <input
                  type="text"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              {/* Preview do Card na Vitrine */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-zinc-400 block mb-2 uppercase tracking-wider">
                  Preview na Vitrine Comercial
                </span>
                <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className="h-40 bg-zinc-100 relative overflow-hidden">
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">
                        Sem Imagem Selecionada
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {category}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-900 line-clamp-1">
                      {title || "Título do Curso"}
                    </h4>
                    <p className="text-[11px] font-bold text-zinc-900">
                      R$ {price}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full h-12 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center"
              >
                {saving ? "Criando Curso..." : "Salvar e Adicionar Aulas →"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
