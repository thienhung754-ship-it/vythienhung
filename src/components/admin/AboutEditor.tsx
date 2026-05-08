import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import ImageUploader from "./ImageUploader";
import { Plus, Trash2 } from "lucide-react";

const AboutEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const about = siteData.about;

  const update = (field: string, value: unknown) => {
    updateSection("about", { ...about, [field]: value });
  };

  const updateParagraph = (type: "paragraphsVisible" | "paragraphsCollapsed", index: number, value: string) => {
    const arr = [...about[type]];
    arr[index] = value;
    update(type, arr);
  };

  const addParagraph = (type: "paragraphsVisible" | "paragraphsCollapsed") => {
    update(type, [...about[type], ""]);
  };

  const removeParagraph = (type: "paragraphsVisible" | "paragraphsCollapsed", index: number) => {
    update(type, about[type].filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">About / Lời ngỏ</h2>
        <p className="text-sm text-neutral-400">Phần giới thiệu bản thân — nội dung text và hình ảnh.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Tiêu đề section</label>
        <input
          type="text"
          value={about.heading}
          onChange={(e) => update("heading", e.target.value)}
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <ImageUploader
        value={about.image}
        onChange={(v) => update("image", v)}
        label="Ảnh About section"
        hint="Khuyến nghị: 800 × 600px — ảnh dọc hoặc ngang đều được"
      />

      {/* Visible paragraphs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-neutral-300">Đoạn văn hiển thị (luôn thấy)</label>
          <button
            onClick={() => addParagraph("paragraphsVisible")}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition-colors"
          >
            <Plus className="w-3 h-3" /> Thêm
          </button>
        </div>
        {about.paragraphsVisible.map((p, i) => (
          <div key={i} className="flex gap-2 mb-3">
            <textarea
              value={p}
              onChange={(e) => updateParagraph("paragraphsVisible", i, e.target.value)}
              rows={3}
              className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm"
            />
            <button
              onClick={() => removeParagraph("paragraphsVisible", i)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors self-start"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Collapsed paragraphs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-neutral-300">Đoạn văn ẩn (bấm "Đọc thêm")</label>
          <button
            onClick={() => addParagraph("paragraphsCollapsed")}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition-colors"
          >
            <Plus className="w-3 h-3" /> Thêm
          </button>
        </div>
        {about.paragraphsCollapsed.map((p, i) => (
          <div key={i} className="flex gap-2 mb-3">
            <textarea
              value={p}
              onChange={(e) => updateParagraph("paragraphsCollapsed", i, e.target.value)}
              rows={3}
              className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm"
            />
            <button
              onClick={() => removeParagraph("paragraphsCollapsed", i)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors self-start"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutEditor;
