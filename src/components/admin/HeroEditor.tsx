import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import ImageUploader from "./ImageUploader";

const HeroEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const hero = siteData.hero;

  const update = (field: string, value: string) => {
    updateSection("hero", { ...hero, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Hero Section</h2>
        <p className="text-sm text-neutral-400">Phần giới thiệu đầu trang — avatar, tên, chức danh, mô tả ngắn.</p>
      </div>

      <ImageUploader
        value={hero.avatar}
        onChange={(v) => update("avatar", v)}
        label="Avatar / Ảnh đại diện"
        hint="Khuyến nghị: 400 × 400px — ảnh vuông, sẽ hiển thị dạng tròn"
      />

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Tên hiển thị</label>
        <input
          type="text"
          value={hero.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Chức danh</label>
        <input
          type="text"
          value={hero.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Mô tả ngắn</label>
        <textarea
          value={hero.bio}
          onChange={(e) => update("bio", e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
        />
      </div>
    </div>
  );
};

export default HeroEditor;
