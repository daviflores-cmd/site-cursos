"use client";

import React from "react";
import Link from "next/link";

export default function CertificadoPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const resolvedParams = React.use(params);

  const certificateData = {
    studentName: "Lucas Mendes Ferreira",
    courseName: "Next.js 15 & Arquitetura Frontend Avançada",
    hours: "18h 30min",
    completedAt: "13 de Outubro de 2026",
    hash: resolvedParams.hash || "hash_a8f9d2e1c4b7",
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 p-4 sm:p-8 flex flex-col items-center justify-center">
      {/* Ações e Controles (Ocultos na Impressão) */}
      <div className="w-full max-w-4xl mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/cursos"
          className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          ← Voltar aos Cursos
        </Link>

        <button
          onClick={handlePrint}
          className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          🖨 Imprimir / Baixar PDF
        </button>
      </div>

      {/* DOCUMENTO DO CERTIFICADO (PIXEL-PERFECT LIGHT MODE) */}
      <div className="w-full max-w-4xl bg-white border-2 border-zinc-200 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl shadow-zinc-200/60 print:border-black print:bg-white print:text-black print:shadow-none">
        {/* Detalhe Decorativo de Fundo Suave */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/60 blur-[100px] rounded-full pointer-events-none print:hidden" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50/60 blur-[100px] rounded-full pointer-events-none print:hidden" />

        <div className="relative z-10 space-y-8 text-center">
          {/* Selo / Cabeçalho */}
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 mx-auto flex items-center justify-center text-indigo-600 font-bold text-xl shadow-sm print:border-black print:text-black">
              C
            </div>
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase print:text-black">
              Certificado Oficial de Conclusão
            </span>
          </div>

          {/* Texto Principal */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-xs text-zinc-500 font-medium print:text-gray-600">
              Certificamos que para os devidos fins de direito e comprovação
              acadêmica:
            </p>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 print:text-black">
              {certificateData.studentName}
            </h1>

            <p className="text-xs text-zinc-500 font-medium leading-relaxed print:text-gray-600">
              concluiu com êxito o curso de formação profissional em
            </p>

            <h2 className="text-lg sm:text-2xl font-bold text-indigo-600 print:text-black">
              {certificateData.courseName}
            </h2>

            <p className="text-xs text-zinc-500 font-medium print:text-gray-600">
              com carga horária total de{" "}
              <strong className="text-zinc-900 print:text-black">
                {certificateData.hours}
              </strong>{" "}
              e aproveitamento aprovado na avaliação final.
            </p>
          </div>

          {/* Rodapé e Autenticidade */}
          <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-left print:border-gray-300">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-zinc-400 block print:text-gray-500">
                Data de Emissão
              </span>
              <span className="text-xs font-bold text-zinc-800 print:text-black">
                {certificateData.completedAt}
              </span>
            </div>

            {/* Código de Verificação / Hash */}
            <div className="space-y-1 text-center sm:text-right">
              <span className="text-[11px] font-semibold text-zinc-400 block print:text-gray-500">
                Código Único de Autenticidade (Hash)
              </span>
              <span className="font-mono text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-200 block print:border-black print:text-black">
                {certificateData.hash}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
