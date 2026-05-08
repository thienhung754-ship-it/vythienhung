import React, { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (base64: string) => void;
  label?: string;
  fallbackSrc?: string;
  accept?: string;
  className?: string;
  hint?: string;  // e.g. "Khuyến nghị: 1200 × 630px"
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = "Upload hình ảnh",
  fallbackSrc,
  accept = "image/*",
  className = "",
  hint,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const displaySrc = value || fallbackSrc;

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-neutral-300 mb-2">{label}</label>
      <div
        className={`relative border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer overflow-hidden ${
          dragOver
            ? "border-blue-500 bg-blue-500/10"
            : "border-neutral-600 hover:border-neutral-400 bg-neutral-800/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {displaySrc ? (
          <div className="relative group">
            <img
              src={displaySrc}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Upload className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">Đổi ảnh</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4">
            <ImageIcon className="w-10 h-10 text-neutral-500 mb-3" />
            <p className="text-sm text-neutral-400 text-center">
              Kéo thả ảnh vào đây hoặc click để chọn
            </p>
            <p className="text-xs text-neutral-500 mt-1">PNG, JPG, WebP</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </div>
      {value && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onChange(""); }}
          className="mt-2 flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          <X className="w-3 h-3" /> Xóa ảnh (dùng mặc định)
        </button>
      )}
      {hint && (
        <p className="mt-1.5 text-[11px] text-neutral-500 flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm bg-neutral-600 text-center leading-3 text-[9px] font-bold text-neutral-300">i</span>
          {hint}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
