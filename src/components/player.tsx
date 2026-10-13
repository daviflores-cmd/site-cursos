"use client";

import React, { useState } from "react";

interface PlayerProps {
  videoId?: string;
  title?: string;
  onEnded?: () => void;
}

export default function Player({ videoId, title, onEnded }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-zinc-950 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-2xl group flex items-center justify-center">
      {videoId ? (
        <iframe
          src={`https://iframe.videodelivery.net/${videoId}`}
          className="w-full h-full border-0"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          onEnded={onEnded}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-6 text-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <p className="text-xs text-zinc-400 mt-4">
            {title || "Selecione uma aula para reproduzir"}
          </p>
        </div>
      )}
    </div>
  );
}
