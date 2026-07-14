import React, { useRef, useState } from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { EbookItem } from "@/lib/siteData";
import { Plus, Trash2, BookOpen, Upload, Loader2, ChevronUp, ChevronDown } from "lucide-react";

const EbookEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const ebooks = siteData.ebooks;

  const updateEbook = (index: number, field: keyof EbookItem, value: string) => {
    const updated = [...ebooks];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("ebooks", updated);
  };

  const updateEbookFields = (index: number, fields: Partial<EbookItem>) => {
    const updated = [...ebooks];
    updated[index] = { ...updated[index], ...fields };
    updateSection("ebooks", updated);
  };

  const addEbook = () => {
    updateSection("ebooks", [
      ...ebooks,
      { title: "", description: "", pages: "", format: "PDF", file: "#" },
    ]);
  };

  const removeEbook = (index: number) => {
    updateSection("ebooks", ebooks.filter((_, i) => i !== index));
  };

  const moveEbook = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= ebooks.length) return;
    const updated = [...ebooks];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updateSection("ebooks", updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Ebook / Tài liệu</h2>
          <p className="text-sm text-neutral-400">Quản lý tài liệu PDF miễn phí cho download.</p>
        </div>
        <button
          onClick={addEbook}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm ebook
        </button>
      </div>

      {ebooks.map((ebook, i) => (
        <EbookCard key={i} ebook={ebook} index={i} total={ebooks.length} onUpdate={updateEbook} onUpdateFields={updateEbookFields} onRemove={removeEbook} onMove={moveEbook} />
      ))}
    </div>
  );
};

const EbookCard: React.FC<{
  ebook: EbookItem;
  index: number;
  total: number;
  onUpdate: (i: number, field: keyof EbookItem, value: string) => void;
  onUpdateFields: (i: number, fields: Partial<EbookItem>) => void;
  onRemove: (i: number) => void;
  onMove: (i: number, direction: "up" | "down") => void;
}> = ({ ebook, index, total, onUpdate, onUpdateFields, onRemove, onMove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onUpdateFields(index, {
        file: data.url,
        fileName: data.originalName || file.name,
        title: data.title || ebook.title || (data.originalName || file.name).replace(/\.[^/.]+$/, ""),
        pages: data.pages ? `${data.pages} trang` : ebook.pages || "32 trang",
        format: "PDF"
      });
    } catch (err) {
      setUploadError("Upload thất bại. Vui lòng thử lại.");
      console.error("PDF upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const hasFile = ebook.file && ebook.file !== "#" && (ebook.file.startsWith("/uploads/") || ebook.file.startsWith("http"));

  return (
    <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col -my-1">
            <button
              onClick={() => onMove(index, "up")}
              disabled={index === 0}
              className="p-0.5 text-neutral-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              title="Di chuyển lên"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => onMove(index, "down")}
              disabled={index === total - 1}
              className="p-0.5 text-neutral-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              title="Di chuyển xuống"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-neutral-500 font-mono w-5">#{index + 1}</span>
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-white">{ebook.title || `Ebook #${index + 1}`}</span>
        </div>
        <button
          onClick={() => onRemove(index)}
          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tiêu đề</label>
        <input
          type="text"
          value={ebook.title}
          onChange={(e) => onUpdate(index, "title", e.target.value)}
          className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-400 mb-1.5">Mô tả</label>
        <textarea
          value={ebook.description}
          onChange={(e) => onUpdate(index, "description", e.target.value)}
          rows={2}
          className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">Số trang</label>
          <input
            type="text"
            value={ebook.pages}
            onChange={(e) => onUpdate(index, "pages", e.target.value)}
            className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="VD: 32 trang"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">Định dạng</label>
          <input
            type="text"
            value={ebook.format}
            onChange={(e) => onUpdate(index, "format", e.target.value)}
            className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-xs font-medium text-neutral-400 mb-1.5">File PDF</label>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-neutral-300 hover:border-blue-500 hover:text-white transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Đang upload...</>
            ) : (
              <><Upload className="w-4 h-4" /> {hasFile ? "Đổi file PDF" : "Upload PDF"}</>
            )}
          </button>
          {hasFile && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg">
              ✓ {ebook.fileName || ebook.file.split("/").pop()}
            </span>
          )}
          {!hasFile && ebook.file !== "#" && ebook.file && (
            <span className="text-xs text-neutral-400 truncate max-w-[200px]">{ebook.file}</span>
          )}
        </div>
        {uploadError && (
          <p className="text-xs text-red-400 mt-1">{uploadError}</p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
        {/* Or URL input */}
        <div className="mt-2">
          <input
            type="text"
            value={ebook.file === "#" ? "" : (hasFile ? "" : ebook.file)}
            onChange={(e) => onUpdate(index, "file", e.target.value || "#")}
            placeholder="Hoặc nhập URL file..."
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default EbookEditor;
