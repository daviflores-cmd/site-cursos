"use client";

import React, { useState } from "react";

interface UploadZoneProps {
  accept: string;
  label: string;
  description: string;
  onFileSelect: (file: File | null) => void;
}

export default function UploadZone({
  accept,
  label,
  description,
  onFileSelect,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      setSelectedFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 bg-zinc-950/40 ${
        isDragging
          ? "border-indigo-500 bg-indigo-500/10"
          : selectedFileName
            ? "border-emerald-500/50 bg-emerald-500/5"
            : "border-zinc-800 hover:border-zinc-700"
      }`}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id={`file-input-${label.replace(/\s+/g, "-").toLowerCase()}`}
      />
      <label
        htmlFor={`file-input-${label.replace(/\s+/g, "-").toLowerCase()}`}
        className="cursor-pointer block space-y-1"
      >
        <div className="text-xs font-medium text-indigo-400 hover:underline">
          {selectedFileName
            ? `Arquivo selecionado: ${selectedFileName}`
            : label}
        </div>
        <p className="text-[11px] text-zinc-500">{description}</p>
      </label>
    </div>
  );
}
