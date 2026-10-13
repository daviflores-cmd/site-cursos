"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Module } from "@/types";

interface SidebarAulasProps {
  modules: Module[];
  currentLessonId?: string;
  courseSlug: string;
}

export default function SidebarAulas({
  modules,
  currentLessonId,
  courseSlug,
}: SidebarAulasProps) {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    m1: true,
  });

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-full lg:w-80 bg-zinc-950 border-l border-zinc-800/80 flex-shrink-0 overflow-y-auto">
      <div className="p-4 border-b border-zinc-800/80">
        <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Conteúdo do Curso
        </h3>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          Navegação e Progresso
        </p>
      </div>

      <div className="divide-y divide-zinc-900">
        {modules.map((module) => {
          const isOpen = openModules[module.id] ?? true;

          return (
            <div key={module.id} className="p-3">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between text-left text-xs font-medium text-zinc-300 hover:text-white mb-2 px-2 py-1 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                <span className="truncate">{module.title}</span>
                <span className="text-[10px] text-zinc-500 ml-2">
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              {isOpen && (
                <div className="space-y-1">
                  {module.lessons?.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;

                    return (
                      <Link
                        key={lesson.id}
                        href={`/curso/${courseSlug}/aula/${lesson.id}`}
                        className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-2 block ${
                          isActive
                            ? "bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 font-medium"
                            : "hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                              lesson.completed
                                ? "bg-emerald-500/20 text-emerald-400 font-bold"
                                : "bg-zinc-800 text-zinc-500"
                            }`}
                          >
                            {lesson.completed ? "✓" : "•"}
                          </span>
                          <span className="truncate">{lesson.title}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
