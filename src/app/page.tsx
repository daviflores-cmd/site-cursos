'use client';

import React from 'react';
import Link from 'next/link';

interface PublicCourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  price: string;
  installments: string;
  coverUrl: string;
  duration: string;
  totalLessons: number;
}

const PUBLIC_COURSES: PublicCourse[] = [
  {
    id: 'c1',
    slug: 'nextjs-15-arquitetura-avancada',
    title: 'Next.js 15 & Arquitetura Frontend Avançada',
    description: 'Aprenda a construir aplicações web de altíssimo desempenho com App Router, TypeScript e Cloudflare.',
    category: 'Desenvolvimento',
    price: 'R$ 197,00',
    installments: '12x de R$ 19,70',
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    duration: '18h 30min',
    totalLessons: 24,
  },
  {
    id: 'c2',
    slug: 'tailwind-css-ui-ux-design-engineer',
    title: 'Design Engineer: UI/UX & Tailwind CSS',
    description: 'Domine a criação de interfaces modernas, minimalistas, responsivas e pixel-perfect com animações fluidas.',
    category: 'Design & UI/UX',
    price: 'R$ 147,00',
    installments: '12x de R$ 14,70',
    coverUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    duration: '12h 15min',
    totalLessons: 16,
  },
  {
    id: 'c3',
    slug: 'infraestrutura-cloud-cloudflare-r2-stream',
    title: 'Infraestrutura Cloud com Cloudflare R2 e Stream',
    description: 'Aprenda a hospedar arquivos e transmitir vídeos com segurança, links assinados e proteção HLS.',
    category: 'Cloud & DevOps',
    price: 'R$ 127,00',
    installments: '12x de R$ 12,70',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    duration: '08h 45min',
    totalLessons: 10,
  },
];

export default function VitrinePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-20">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-indigo-600/20">
              C
            </div>
            <span className="font-extrabold text-base tracking-tight text-zinc-900">
              Plataforma de Cursos
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 px-3.5 py-2 rounded-xl hover:bg-zinc-100 transition-colors">
              Entrar
            </Link>
            <Link href="/cadastro" className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl shadow-md shadow-indigo-600/20 transition-all duration-200 active:scale-[0.98]">
              Criar Conta
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm">
            Formação Profissional em Tecnologia & Design
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Evolua sua carreira com cursos práticos e de alto impacto
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-2xl mx-auto">
            Aprenda arquitetura moderna de software, UI/UX e infraestrutura em nuvem com projetos reais e certificado de conclusão reconhecido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {PUBLIC_COURSES.map((course) => (
            <div key={course.id} className="bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-zinc-200/60 group">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                  <img src={course.coverUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 backdrop-blur-md border border-zinc-200/80 text-zinc-800 shadow-sm">
                    {course.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="pt-4 border-t border-zinc-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 block font-medium">{course.installments}</span>
                    <span className="text-xl font-extrabold text-zinc-900">{course.price}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    Acesso Vitalício
                  </span>
                </div>

                <Link href={`/login?redirectTo=/checkout/${course.slug}`} className="w-full h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20">
                  Comprar Curso Agora →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
