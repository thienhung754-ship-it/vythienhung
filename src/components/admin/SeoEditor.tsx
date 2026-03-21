import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import ImageUploader from "./ImageUploader";
import { Search } from "lucide-react";

const SeoEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const seo = siteData.seo;

  const update = (field: string, value: string) => {
    updateSection("seo", { ...seo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">SEO Settings</h2>
        <p className="text-sm text-neutral-400">Tối ưu hóa hiển thị trên công cụ tìm kiếm và mạng xã hội.</p>
      </div>

      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium text-white">Meta Tags</span>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">Site Title</label>
          <input
            type="text"
            value={seo.siteTitle}
            onChange={(e) => update("siteTitle", e.target.value)}
            className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-xs text-neutral-500 mt-1">{seo.siteTitle.length}/60 ký tự</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">Meta Description</label>
          <textarea
            value={seo.metaDescription}
            onChange={(e) => update("metaDescription", e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
          <p className="text-xs text-neutral-500 mt-1">{seo.metaDescription.length}/160 ký tự</p>
        </div>

        <ImageUploader
          value={seo.ogImage}
          onChange={(v) => update("ogImage", v)}
          label="OG Image (ảnh chia sẻ mạng xã hội)"
        />

        {/* Preview */}
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-2">Preview Google</label>
          <div className="bg-white rounded-xl p-4 space-y-1">
            <p className="text-blue-700 text-base font-medium truncate">{seo.siteTitle || "Site Title"}</p>
            <p className="text-green-700 text-xs">vythienhung.com</p>
            <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{seo.metaDescription || "Meta description sẽ hiển thị ở đây..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoEditor;
