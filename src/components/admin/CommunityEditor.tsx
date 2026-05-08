import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { CommunityItem } from "@/lib/siteData";
import ImageUploader from "./ImageUploader";
import { Plus, Trash2, Users } from "lucide-react";

const CommunityEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const communities = siteData.communities;

  const updateItem = (index: number, field: keyof CommunityItem, value: string | boolean) => {
    const updated = [...communities];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("communities", updated);
  };

  const addItem = () => {
    updateSection("communities", [
      ...communities,
      { name: "", description: "", members: "", color: "from-blue-500 to-blue-600", link: "", linkText: "Tham gia", image: "", internal: false },
    ]);
  };

  const removeItem = (index: number) => {
    updateSection("communities", communities.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Community / Cộng đồng</h2>
          <p className="text-sm text-neutral-400">Quản lý các cộng đồng và nhóm.</p>
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm
        </button>
      </div>

      {communities.map((item, i) => (
        <div key={i} className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">{item.name || `Cộng đồng #${i + 1}`}</span>
            </div>
            <button
              onClick={() => removeItem(i)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <ImageUploader
            value={item.image.startsWith("data:") ? item.image : ""}
            onChange={(v) => updateItem(i, "image", v)}
            label="Banner image"
            fallbackSrc={item.image && !item.image.startsWith("data:") ? item.image : undefined}
            hint="Khuyến nghị: 800 × 400px — ảnh ngang, tỉ lệ 2:1, hiển thị trong card cộng đồng"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tên</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Thành viên</label>
              <input
                type="text"
                value={item.members}
                onChange={(e) => updateItem(i, "members", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="VD: 500+"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Mô tả</label>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(i, "description", e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Link</label>
              <input
                type="text"
                value={item.link}
                onChange={(e) => updateItem(i, "link", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Text nút</label>
              <input
                type="text"
                value={item.linkText}
                onChange={(e) => updateItem(i, "linkText", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.internal}
                onChange={(e) => updateItem(i, "internal", e.target.checked)}
                className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-neutral-300">Link nội bộ (trong trang)</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityEditor;
