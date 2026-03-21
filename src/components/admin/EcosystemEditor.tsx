import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { EcosystemProduct } from "@/lib/siteData";
import { Plus, Trash2, GripVertical } from "lucide-react";

const ICON_OPTIONS = ["Globe", "Users", "Layers", "FlaskConical", "Cpu", "Shield", "Zap", "Code", "Database", "Cloud"];

const EcosystemEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const products = siteData.ecosystem;

  const updateProduct = (index: number, field: keyof EcosystemProduct, value: string) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("ecosystem", updated);
  };

  const addProduct = () => {
    updateSection("ecosystem", [
      ...products,
      { icon: "Globe", title: "", subtitle: "", description: "" },
    ]);
  };

  const removeProduct = (index: number) => {
    updateSection("ecosystem", products.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Ecosystem / Hệ sinh thái</h2>
          <p className="text-sm text-neutral-400">Quản lý các sản phẩm/dịch vụ trong hệ sinh thái.</p>
        </div>
        <button
          onClick={addProduct}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm mới
        </button>
      </div>

      {products.map((product, i) => (
        <div key={i} className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-400">
              <GripVertical className="w-4 h-4" />
              <span className="text-sm font-medium text-white">Sản phẩm #{i + 1}</span>
            </div>
            <button
              onClick={() => removeProduct(i)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Icon</label>
              <select
                value={product.icon}
                onChange={(e) => updateProduct(i, "icon", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                {ICON_OPTIONS.map((ico) => (
                  <option key={ico} value={ico}>{ico}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tên</label>
              <input
                type="text"
                value={product.title}
                onChange={(e) => updateProduct(i, "title", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Subtitle</label>
            <input
              type="text"
              value={product.subtitle}
              onChange={(e) => updateProduct(i, "subtitle", e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Mô tả</label>
            <textarea
              value={product.description}
              onChange={(e) => updateProduct(i, "description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      ))}

      {products.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          <p>Chưa có sản phẩm nào. Bấm "Thêm mới" để bắt đầu.</p>
        </div>
      )}
    </div>
  );
};

export default EcosystemEditor;
