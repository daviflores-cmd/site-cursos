'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function CadastroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas digitadas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push('/cursos');
      }
    } catch (err: any) {
      setError('Ocorreu um erro ao criar a conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10 my-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 mb-4 text-indigo-600 font-bold text-xl shadow-sm">
          C
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Criar Nova Conta
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Cadastre-se para liberar o acesso ao seu curso
        </p>
      </div>

      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-zinc-200/50">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu Nome"
              required
              className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-zinc-700 mb-1.5">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
              required
              className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Finalizar Cadastro'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-100 text-center">
          <p className="text-xs text-zinc-500">
            Já tem uma conta?{' '}
            <Link
              href={redirectTo ? `/login?redirectTo=${encodeURIComponent(redirectTo)}` : '/login'}
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/60 blur-[140px] rounded-full pointer-events-none" />
      <Suspense fallback={<div className="text-xs text-zinc-400">Carregando formulário...</div>}>
        <CadastroForm />
      </Suspense>
    </main>
  );
}
