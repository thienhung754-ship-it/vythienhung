import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import ImageUploader from "./ImageUploader";
import { Plus, Trash2 } from "lucide-react";

const HobbiesEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const hobbies = siteData.hobbies;

  const updateImage = (value: string) => {
    updateSection("hobbies", { ...hobbies, image: value });
  };

  const updateSectionItem = (index: number, field: "title" | "description", value: string) => {
    const updated = [...hobbies.sections];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("hobbies", { ...hobbies, sections: updated });
  };

  const addSection = () => {
    updateSection("hobbies", {
      ...hobbies,
      sections: [...hobbies.sections, { title: "", description: "" }],
    });
  };

  const removeSection = (index: number) => {
    updateSection("hobbies", {
      ...hobbies,
      sections: hobbies.sections.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Bản sắc & Tư duy</h2>
        <p className="text-sm text-neutral-400">Hình ảnh sự kiện và các mục tư duy lãnh đạo.</p>
      </div>

      <ImageUploader
        value={hobbies.image}
        onChange={updateImage}
        label="Ảnh sự kiện"
        hint="Khuyến nghị: 1200 × 800px — ảnh ngang, tỉ lệ 3:2"
      />

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-neutral-300">Các mục nội dung</label>
          <button
            onClick={addSection}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition-colors"
          >
            <Plus className="w-3 h-3" /> Thêm mục
          </button>
        </div>

        {hobbies.sections.map((section, i) => (
          <div key={i} className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-4 mb-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Mục #{i + 1}</span>
              <button
                onClick={() => removeSection(i)}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <input
              type="text"
              value={section.title}
              onChange={(e) => updateSectionItem(i, "title", e.target.value)}
              placeholder="Tiêu đề"
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <textarea
              value={section.description}
              onChange={(e) => updateSectionItem(i, "description", e.target.value)}
              placeholder="Mô tả"
              rows={3}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HobbiesEditor;
