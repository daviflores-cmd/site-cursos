"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Qual é o principal papel dos Route Groups - ex: (aluno) - na estrutura do Next.js App Router?",
    options: [
      "Bloquear o acesso de usuários não autenticados via middleware.",
      "Organizar arquivos e layouts sem alterar a URL final no navegador.",
      "Compilar o código automaticamente para produção no Cloudflare Pages.",
      "Criar tabelas no banco de dados automaticamente.",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    question:
      "Por que utilizar o método Direct Upload da Cloudflare Stream ao cadastrar um novo vídeo?",
    options: [
      "Para converter arquivos de áudio em texto em tempo real.",
      "Para enviar o vídeo direto do navegador para a CDN, sem sobrecarregar o servidor web.",
      "Para evitar o uso de TypeScript no projeto.",
      "Para salvar os vídeos dentro da pasta public do repositório.",
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    question:
      "Qual estratégia é utilizada para permitir downloads seguros de apostilas em PDF salvas no Cloudflare R2?",
    options: [
      "Deixar a pasta do bucket 100% pública sem restrições.",
      "Enviar o arquivo PDF via e-mail para todos os inscritos.",
      "Gerar URLs temporárias e assinadas com tempo de expiração.",
      "Converter o PDF em imagem PNG antes de exibir.",
    ],
    correctIndex: 2,
  },
];

export default function AvaliacaoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      let totalCorrect = 0;
      QUESTIONS.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          totalCorrect++;
        }
      });

      const finalPercentage = Math.round(
        (totalCorrect / QUESTIONS.length) * 100,
      );
      setScore(finalPercentage);
      setSubmitted(true);
    }
  };

  const isApproved = score >= 70;

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Detalhe suave de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/60 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        {/* Topo de Navegação */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/cursos"
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            ← Voltar para Cursos
          </Link>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Avaliação Final
          </span>
        </div>

        {!submitted ? (
          /* TELA DE QUESTÕES */
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-zinc-200/50">
            {/* Barra de Progresso */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-500 font-semibold">
                <span>
                  Questão {currentStep + 1} de {QUESTIONS.length}
                </span>
                <span>
                  {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Enunciado */}
            <div className="space-y-2 pt-2">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Opções de Resposta */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentStep] === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm transition-all duration-200 border flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-600 text-indigo-950 font-semibold shadow-sm"
                        : "bg-zinc-50/50 border-zinc-200 text-zinc-700 hover:bg-white hover:border-zinc-300"
                    }`}
                  >
                    <span>{option}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ml-3 ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Botão Próximo / Finalizar */}
            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <button
                type="button"
                disabled={selectedAnswers[currentStep] === undefined}
                onClick={handleNext}
                className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {currentStep === QUESTIONS.length - 1
                  ? "Finalizar Avaliação"
                  : "Próxima Questão →"}
              </button>
            </div>
          </div>
        ) : (
          /* TELA DE RESULTADO */
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 text-center space-y-6 shadow-xl shadow-zinc-200/50">
            <div
              className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold ${
                isApproved
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {isApproved ? "✓" : "✕"}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-zinc-900">
                {isApproved
                  ? "Parabéns! Você foi Aprovado!"
                  : "Nota Insuficiente"}
              </h2>
              <p className="text-xs text-zinc-500">
                Sua pontuação final foi de{" "}
                <span className="font-bold text-zinc-900">{score}%</span>{" "}
                acertos. (Nota mínima exigida: 70%)
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              {isApproved ? (
                <button
                  onClick={() => router.push("/certificado/hash_a8f9d2e1")}
                  className="w-full sm:w-auto h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 cursor-pointer"
                >
                  Emitir Meu Certificado
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(0);
                    setSelectedAnswers([]);
                  }}
                  className="w-full sm:w-auto h-11 px-6 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-all duration-200 cursor-pointer"
                >
                  Tentar Novamente
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
