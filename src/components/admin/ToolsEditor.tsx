import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { ToolItem } from "@/lib/siteData";

const emptyTool: ToolItem = {
  name: "",
  category: "",
  description: "",
  features: [],
  duration: "1 tháng",
  price: 0,
  originalPrice: 0,
  badge: "",
  affiliateLink: "#",
};

const BADGE_OPTIONS = ["", "BEST SELLER", "ADD-ON", "HOT", "PRO"];

const ToolsEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const tools: ToolItem[] = siteData.tools || [];

  const updateTool = (index: number, field: keyof ToolItem, value: any) => {
    const updated = [...tools];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("tools", updated);
  };

  const addTool = () => {
    updateSection("tools", [...tools, { ...emptyTool }]);
  };

  const removeTool = (index: number) => {
    updateSection("tools", tools.filter((_, i) => i !== index));
  };

  const moveTool = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tools.length) return;
    const updated = [...tools];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updateSection("tools", updated);
  };

  const updateFeatures = (index: number, featureStr: string) => {
    const features = featureStr.split("\n").filter((f) => f.trim());
    updateTool(index, "features", features);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Công cụ / Tools</h2>
          <p className="text-sm text-neutral-400">Quản lý sản phẩm bán trong Thư Viện/Công Cụ.</p>
        </div>
        <button
          onClick={addTool}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm
        </button>
      </div>

      {tools.map((tool, index) => (
        <div
          key={index}
          className="bg-neutral-800/50 rounded-xl border border-neutral-700 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-neutral-800/80 border-b border-neutral-700">
            <div className="flex items-center gap-2">
              <div className="flex flex-col -my-1">
                <button
                  onClick={() => moveTool(index, "up")}
                  disabled={index === 0}
                  className="p-0.5 text-neutral-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  title="Di chuyển lên"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveTool(index, "down")}
                  disabled={index === tools.length - 1}
                  className="p-0.5 text-neutral-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  title="Di chuyển xuống"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-neutral-500 font-mono w-5">#{index + 1}</span>
              <span className="text-sm font-medium text-white">
                {tool.name || `Sản phẩm ${index + 1}`}
              </span>
              {tool.badge && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                  {tool.badge}
                </span>
              )}
            </div>
            <button
              onClick={() => removeTool(index)}
              className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Fields */}
          <div className="p-5 space-y-4">
            {/* Row: Name + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tên sản phẩm</label>
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => updateTool(index, "name", e.target.value)}
                  placeholder="ChatGPT Plus"
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Danh mục</label>
                <input
                  type="text"
                  value={tool.category}
                  onChange={(e) => updateTool(index, "category", e.target.value)}
                  placeholder="AI Chat"
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Mô tả</label>
              <textarea
                value={tool.description}
                onChange={(e) => updateTool(index, "description", e.target.value)}
                rows={2}
                placeholder="Mô tả ngắn về sản phẩm..."
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Tính năng <span className="text-neutral-600">(mỗi dòng 1 tính năng)</span>
              </label>
              <textarea
                value={tool.features.join("\n")}
                onChange={(e) => updateFeatures(index, e.target.value)}
                rows={4}
                placeholder={"Truy cập GPT-5.4 không giới hạn\nCodex 5.4 hỗ trợ lập trình\nDALL-E 3 tạo ảnh AI"}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono"
              />
            </div>

            {/* Row: Duration + Badge */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Thời hạn</label>
                <input
                  type="text"
                  value={tool.duration}
                  onChange={(e) => updateTool(index, "duration", e.target.value)}
                  placeholder="1 tháng"
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Badge</label>
                <select
                  value={tool.badge}
                  onChange={(e) => updateTool(index, "badge", e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {BADGE_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b || "(Không có)"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row: Price + Original Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Giá bán (VNĐ)</label>
                <input
                  type="number"
                  value={tool.price}
                  onChange={(e) => updateTool(index, "price", Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Giá gốc (VNĐ)</label>
                <input
                  type="number"
                  value={tool.originalPrice}
                  onChange={(e) => updateTool(index, "originalPrice", Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Affiliate Link */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Link affiliate / Mua hàng</label>
              <input
                type="url"
                value={tool.affiliateLink}
                onChange={(e) => updateTool(index, "affiliateLink", e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Hình ảnh sản phẩm (URL)</label>
              <input
                type="text"
                value={tool.image || ""}
                onChange={(e) => updateTool(index, "image", e.target.value)}
                placeholder="https://... hoặc /uploads/image.jpg"
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              {tool.image && (
                <div className="mt-2 rounded-lg overflow-hidden border border-neutral-700 max-w-[200px]">
                  <img src={tool.image} alt="Preview" className="w-full h-24 object-cover" />
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="mt-3 p-4 bg-neutral-900 rounded-lg border border-neutral-700">
              <p className="text-[10px] text-neutral-500 mb-2 uppercase tracking-wide">Xem trước</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-semibold">{tool.name || "Tên sản phẩm"}</p>
                  <p className="text-xs text-neutral-500">{tool.category || "Danh mục"} • {tool.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-red-400">{tool.price.toLocaleString("vi-VN")}đ</p>
                  {tool.originalPrice > tool.price && (
                    <p className="text-xs text-neutral-500 line-through">{tool.originalPrice.toLocaleString("vi-VN")}đ</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {tools.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          <p>Chưa có sản phẩm nào. Bấm "Thêm sản phẩm" để bắt đầu.</p>
        </div>
      )}
    </div>
  );
};

export default ToolsEditor;
