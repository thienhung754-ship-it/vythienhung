import React, { useRef } from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { exportSiteData, importSiteData } from "@/lib/siteData";
import { Download, Upload, RotateCcw, AlertTriangle } from "lucide-react";

const ImportExportView: React.FC = () => {
  const { updateAll, resetToDefault } = useSiteData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleExport = () => {
    try {
      const json = exportSiteData();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vythienhung-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setMessage({ type: "success", text: "Đã xuất file backup thành công!" });
    } catch {
      setMessage({ type: "error", text: "Lỗi khi xuất dữ liệu." });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = ev.target?.result as string;
        const data = importSiteData(json);
        updateAll(data);
        setMessage({ type: "success", text: "Đã nhập dữ liệu thành công!" });
      } catch {
        setMessage({ type: "error", text: "File không hợp lệ. Vui lòng chọn file JSON backup." });
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = () => {
    resetToDefault();
    setShowResetConfirm(false);
    setMessage({ type: "success", text: "Đã khôi phục về dữ liệu mặc định!" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Import / Export</h2>
        <p className="text-sm text-neutral-400">Sao lưu và khôi phục toàn bộ dữ liệu trang web.</p>
      </div>

      {message && (
        <div className={`rounded-xl p-4 text-sm ${message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
          {message.text}
        </div>
      )}

      {/* Export */}
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Download className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">Export / Xuất dữ liệu</h3>
            <p className="text-xs text-neutral-400">Tải xuống file JSON chứa toàn bộ cấu hình trang web.</p>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="w-full mt-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-colors"
        >
          Tải xuống Backup (.json)
        </button>
      </div>

      {/* Import */}
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">Import / Nhập dữ liệu</h3>
            <p className="text-xs text-neutral-400">Khôi phục dữ liệu từ file JSON backup.</p>
          </div>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full mt-2 px-4 py-3 bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium rounded-xl transition-colors"
        >
          Chọn file JSON để import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      {/* Reset */}
      <div className="bg-neutral-800/50 rounded-xl border border-red-500/20 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">Reset / Khôi phục mặc định</h3>
            <p className="text-xs text-neutral-400">Xóa mọi thay đổi và trở về trạng thái ban đầu.</p>
          </div>
        </div>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full mt-2 px-4 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded-xl transition-colors border border-red-500/20"
          >
            Reset về mặc định
          </button>
        ) : (
          <div className="mt-2 space-y-3">
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Thao tác này không thể hoàn tác! Bạn nên export backup trước.</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Xác nhận Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportExportView;
