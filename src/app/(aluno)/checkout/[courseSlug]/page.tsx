'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CheckoutPageProps {
  params: Promise<{
    courseSlug: string;
  }>;
}

const COURSES_DATA: Record<string, { title: string; price: string; originalPrice: string; discount: string }> = {
  'nextjs-15-arquitetura-avancada': {
    title: 'Next.js 15 & Arquitetura Frontend Avançada',
    price: 'R$ 197,00',
    originalPrice: 'R$ 297,00',
    discount: '- R$ 100,00',
  },
  'tailwind-css-ui-ux-design-engineer': {
    title: 'Design Engineer: UI/UX & Tailwind CSS',
    price: 'R$ 147,00',
    originalPrice: 'R$ 247,00',
    discount: '- R$ 100,00',
  },
  'infraestrutura-cloud-cloudflare-r2-stream': {
    title: 'Infraestrutura Cloud com Cloudflare R2 e Stream',
    price: 'R$ 127,00',
    originalPrice: 'R$ 227,00',
    discount: '- R$ 100,00',
  },
};

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseSlug = resolvedParams?.courseSlug || 'nextjs-15-arquitetura-avancada';

  const courseDetails = COURSES_DATA[courseSlug] || {
    title: 'Treinamento de Alta Performance',
    price: 'R$ 197,00',
    originalPrice: 'R$ 297,00',
    discount: '- R$ 100,00',
  };

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix');
  const [processing, setProcessing] = useState(false);

  const handleFinishPayment = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push(`/curso/${courseSlug}/aula/a1`);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-16">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
            ← Voltar para a Vitrine
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-zinc-800">Checkout Seguro 256-bit</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Forma de Pagamento</h2>
              <p className="text-xs text-zinc-500 mt-1">
                Escolha como deseja realizar a inscrição. O acesso ao conteúdo é imediato.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-sm'
                    : 'border-zinc-200 bg-zinc-50/50 text-zinc-600 hover:bg-white hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">⚡ Pix</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                    Acesso Imediato
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 font-normal">Aprovação instantânea</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-sm'
                    : 'border-zinc-200 bg-zinc-50/50 text-zinc-600 hover:bg-white hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">💳 Cartão</span>
                </div>
                <p className="text-[11px] text-zinc-500 font-normal">Parcele em até 12x</p>
              </button>
            </div>

            {paymentMethod === 'pix' ? (
              <div className="bg-zinc-50 border border-zinc-200/80 p-5 rounded-2xl space-y-3 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center font-bold text-base">
                  ⚡
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed max-w-sm mx-auto">
                  Ao confirmar, o sistema gerará a chave copia e cola do Pix. Assim que o pagamento for detectado, as aulas serão liberadas na sua conta.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Número do Cartão</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Validade</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full h-11 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleFinishPayment}
              disabled={processing}
              className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {processing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                `Confirmar Pagamento (${courseDetails.price})`
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 space-y-4 shadow-sm sticky top-24">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Resumo do Pedido
            </h3>

            <div className="pt-2 pb-4 border-b border-zinc-100 space-y-1">
              <h4 className="text-sm font-bold text-zinc-900">{courseDetails.title}</h4>
              <p className="text-xs text-zinc-500">Acesso Vitalício + Certificado Incluso</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Preço original</span>
                <span className="line-through">{courseDetails.originalPrice}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Desconto especial</span>
                <span>{courseDetails.discount}</span>
              </div>
              <div className="flex justify-between text-zinc-900 font-bold pt-3 border-t border-zinc-100 text-sm">
                <span>Total a pagar</span>
                <span className="text-indigo-600">{courseDetails.price}</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 space-y-1">
              <p className="font-semibold">🛡 Garantia incondicional de 7 dias</p>
              <p className="text-indigo-700/80 leading-relaxed">
                Se não gostar do conteúdo, devolvemos 100% do seu dinheiro sem burocracia.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
