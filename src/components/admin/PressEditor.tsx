import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { PressItem } from "@/lib/siteData";
import { Plus, Trash2, Newspaper } from "lucide-react";

const ICON_OPTIONS = ["Newspaper", "Shield", "Tv", "Radio", "Globe", "Camera"];
const COLOR_OPTIONS = [
  { label: "Xanh dương", value: "from-blue-500/10 to-blue-600/5", iconColor: "text-blue-500" },
  { label: "Đỏ", value: "from-red-500/10 to-red-600/5", iconColor: "text-red-500" },
  { label: "Tím", value: "from-purple-500/10 to-purple-600/5", iconColor: "text-purple-500" },
  { label: "Xanh lá", value: "from-green-500/10 to-green-600/5", iconColor: "text-green-500" },
  { label: "Cam", value: "from-orange-500/10 to-orange-600/5", iconColor: "text-orange-500" },
];

const PressEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const items = siteData.press;

  const updateItem = (index: number, field: keyof PressItem, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("press", updated);
  };

  const updateColor = (index: number, colorIdx: number) => {
    const c = COLOR_OPTIONS[colorIdx];
    const updated = [...items];
    updated[index] = { ...updated[index], color: c.value, iconColor: c.iconColor };
    updateSection("press", updated);
  };

  const addItem = () => {
    updateSection("press", [
      ...items,
      { source: "", title: "", description: "", url: "", image: "", color: COLOR_OPTIONS[0].value, iconColor: COLOR_OPTIONS[0].iconColor, iconName: "Newspaper" },
    ]);
  };

  const removeItem = (index: number) => {
    updateSection("press", items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Press / Truyền thông</h2>
          <p className="text-sm text-neutral-400">Quản lý các bài báo chí đưa tin.</p>
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm mới
        </button>
      </div>

      {items.map((item, i) => (
        <div key={i} className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">{item.source || `Báo chí #${i + 1}`}</span>
            </div>
            <button
              onClick={() => removeItem(i)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Nguồn</label>
              <input
                type="text"
                value={item.source}
                onChange={(e) => updateItem(i, "source", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="VD: Báo Đồng Nai"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Icon & Màu</label>
              <div className="flex gap-2">
                <select
                  value={item.iconName}
                  onChange={(e) => updateItem(i, "iconName", e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {ICON_OPTIONS.map((ico) => (
                    <option key={ico} value={ico}>{ico}</option>
                  ))}
                </select>
                <select
                  value={COLOR_OPTIONS.findIndex((c) => c.value === item.color)}
                  onChange={(e) => updateColor(i, Number(e.target.value))}
                  className="w-32 px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {COLOR_OPTIONS.map((c, ci) => (
                    <option key={ci} value={ci}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tiêu đề</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateItem(i, "title", e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
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
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">URL bài báo</label>
              <input
                type="url"
                value={item.url}
                onChange={(e) => updateItem(i, "url", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">URL hình ảnh thumbnail</label>
              <input
                type="url"
                value={item.image}
                onChange={(e) => updateItem(i, "image", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {item.image && (
            <div className="rounded-lg overflow-hidden border border-neutral-700">
              <img src={item.image} alt="Preview" className="w-full h-32 object-cover" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PressEditor;
