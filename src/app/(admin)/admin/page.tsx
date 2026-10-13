'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface AdminCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: string;
  studentsCount: number;
  totalLessons: number;
  status: 'published' | 'draft';
  updatedAt: string;
}

const MOCK_ADMIN_COURSES: AdminCourse[] = [
  {
    id: 'c1',
    slug: 'nextjs-15-arquitetura-avancada',
    title: 'Next.js 15 & Arquitetura Frontend Avançada',
    category: 'Desenvolvimento',
    price: 'R$ 197,00',
    studentsCount: 842,
    totalLessons: 24,
    status: 'published',
    updatedAt: '12/10/2026',
  },
  {
    id: 'c2',
    slug: 'tailwind-css-ui-ux-design-engineer',
    title: 'Design Engineer: UI/UX & Tailwind CSS',
    category: 'Design & UI/UX',
    price: 'R$ 147,00',
    studentsCount: 406,
    totalLessons: 16,
    status: 'published',
    updatedAt: '10/10/2026',
  },
  {
    id: 'c3',
    slug: 'infraestrutura-cloud-cloudflare-r2-stream',
    title: 'Infraestrutura Cloud com Cloudflare R2 e Stream',
    category: 'Cloud & DevOps',
    price: 'R$ 127,00',
    studentsCount: 198,
    totalLessons: 10,
    status: 'published',
    updatedAt: '08/10/2026',
  },
];

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = MOCK_ADMIN_COURSES.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col">
      <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl sticky top-0 z-30">
        <div className="w-full px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
              ADM
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-zinc-900 block">
                Painel Administrativo
              </span>
              <span className="text-[11px] text-zinc-400 block -mt-0.5">Gestão de Cursos & Alunos</span>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link href="/admin/certificados" className="text-xs font-semibold text-zinc-600 hover:text-indigo-600 px-3.5 py-2 rounded-xl hover:bg-zinc-100 transition-colors">
              Aprovação de Certificados
            </Link>
            <Link href="/cursos" className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 px-3.5 py-2 rounded-xl hover:bg-zinc-100 transition-colors">
              ← Visão do Aluno
            </Link>
          </nav>
        </div>
      </header>

      <main className="w-full px-6 lg:px-10 py-8 space-y-8 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
              Gerenciamento da Plataforma
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Cadastre novos cursos, organize a grade de aulas e acompanhe métricas financeiras.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/cursos/novo" className="h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 flex items-center gap-2 cursor-pointer">
              + Criar Novo Curso
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-2 shadow-sm">
            <span className="text-xs font-semibold text-zinc-500">Receita Acumulada</span>
            <div className="text-2xl font-extrabold text-zinc-900">R$ 248.950,00</div>
            <span className="text-[11px] font-semibold text-emerald-600 block">+18.4% no último mês</span>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-2 shadow-sm">
            <span className="text-xs font-semibold text-zinc-500">Total de Alunos Inscritos</span>
            <div className="text-2xl font-extrabold text-zinc-900">1.446</div>
            <span className="text-[11px] text-zinc-400 block">Ativos na plataforma</span>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-2 shadow-sm">
            <span className="text-xs font-semibold text-zinc-500">Cursos Publicados</span>
            <div className="text-2xl font-extrabold text-indigo-600">3 Cursos</div>
            <span className="text-[11px] text-zinc-400 block">50 Aulas em reprodução</span>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-2 shadow-sm">
            <span className="text-xs font-semibold text-zinc-500">Certificados Emitidos</span>
            <div className="text-2xl font-extrabold text-emerald-600">312</div>
            <span className="text-[11px] text-zinc-400 block">Com autenticidade Hash</span>
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Catálogo de Cursos Cadastrados</h2>
              <p className="text-xs text-zinc-500">Selecione um curso para editar seu conteúdo ou adicionar aulas</p>
            </div>

            <div className="w-full sm:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome ou categoria..."
                className="w-full h-10 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200/80 text-zinc-500 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="p-4">Curso</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4">Aulas</th>
                  <th className="p-4">Alunos</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="p-4 font-bold text-zinc-900">{course.title}</td>
                    <td className="p-4">{course.category}</td>
                    <td className="p-4 font-semibold text-zinc-900">{course.price}</td>
                    <td className="p-4">{course.totalLessons} aulas</td>
                    <td className="p-4">{course.studentsCount} alunos</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[10px]">
                        Publicado
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link href={`/admin/cursos/${course.id}/conteudo`} className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white font-semibold transition-all inline-block">
                        Gerenciar Módulos & Aulas
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
