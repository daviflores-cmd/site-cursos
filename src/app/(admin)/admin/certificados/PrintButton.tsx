"use client";

import React from "react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 flex items-center gap-2 cursor-pointer"
    >
      🖨 Imprimir / Baixar PDF
    </button>
  );
}
