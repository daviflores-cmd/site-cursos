'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Preencha todos os campos para continuar.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao realizar login.');
      }

      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push('/cursos');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 mb-4 text-indigo-600 font-bold text-xl shadow-sm">
          C
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Acessar a Plataforma
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          {redirectTo
            ? 'Faça login para continuar com a compra do seu curso'
            : 'Entre com suas credenciais para acessar seus cursos'}
        </p>
      </div>

      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-zinc-200/50">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-zinc-700 mb-2">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all duration-200"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-xs font-semibold text-zinc-700">
                Senha
              </label>
              <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                Esqueceu a senha?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Entrar e Continuar'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-100 text-center">
          <p className="text-xs text-zinc-500">
            Ainda não possui uma conta?{' '}
            <Link
              href={redirectTo ? `/cadastro?redirectTo=${encodeURIComponent(redirectTo)}` : '/cadastro'}
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/60 blur-[140px] rounded-full pointer-events-none" />
      <Suspense fallback={<div className="text-xs text-zinc-400">Carregando formulário...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
