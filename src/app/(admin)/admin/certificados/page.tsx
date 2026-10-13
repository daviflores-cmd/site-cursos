'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CertificateRequest {
  id: string;
  studentName: string;
  courseTitle: string;
  score: number;
  completedAt: string;
  status: 'approved' | 'pending';
  hash: string;
}

const MOCK_REQUESTS: CertificateRequest[] = [
  {
    id: 'req_1',
    studentName: 'Lucas Mendes Ferreira',
    courseTitle: 'Next.js 15 & Arquitetura Frontend Avançada',
    score: 100,
    completedAt: '13/10/2026',
    status: 'approved',
    hash: 'hash_a8f9d2e1c4b7',
  },
  {
    id: 'req_2',
    studentName: 'Mariana Costa Silva',
    courseTitle: 'Design Engineer: UI/UX & Tailwind CSS',
    score: 85,
    completedAt: '12/10/2026',
    status: 'pending',
    hash: 'hash_b9e8f7c6d5a4',
  },
];

export default function GestaoCertificadosPage() {
  const [requests, setRequests] = useState<CertificateRequest[]>(MOCK_REQUESTS);

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-16">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="w-full px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/admin" className="text-xs font-semibold text-zinc-600 hover:text-zinc-900">
            ← Voltar ao Painel Geral
          </Link>
          <span className="text-xs font-bold text-zinc-800">Controle e Aprovação de Certificados</span>
        </div>
      </header>

      <main className="w-full px-6 lg:px-10 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900">Aprovação de Certificados Oficiais</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Gerencie os pedidos de emissão de alunos e valide seus requisitos de nota.
          </p>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 border-b border-zinc-200/80 text-zinc-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="p-4">Aluno</th>
                <th className="p-4">Curso</th>
                <th className="p-4">Nota Quiz</th>
                <th className="p-4">Data Conclusão</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
              {requests.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="p-4 font-bold text-zinc-900">{item.studentName}</td>
                  <td className="p-4">{item.courseTitle}</td>
                  <td className="p-4 font-bold text-indigo-600">{item.score}%</td>
                  <td className="p-4">{item.completedAt}</td>
                  <td className="p-4">
                    {item.status === 'approved' ? (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[10px]">
                        Aprovado / Emitido
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 font-bold text-[10px]">
                        Pendente
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {item.status === 'pending' ? (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all cursor-pointer"
                      >
                        Aprovar e Liberar
                      </button>
                    ) : (
                      <Link
                        href={`/certificado/${item.hash}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold hover:bg-zinc-200 transition-all inline-block"
                      >
                        Visualizar Certificado
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
