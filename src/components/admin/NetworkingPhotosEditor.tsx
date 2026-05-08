import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { NetworkingPhoto } from "@/lib/siteData";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import ImageUploader from "./ImageUploader";

const NetworkingPhotosEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const photos = siteData.networkingPhotos || [];

  const updatePhoto = (index: number, field: keyof NetworkingPhoto, value: string) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("networkingPhotos", updated);
  };

  const addPhoto = () => {
    updateSection("networkingPhotos", [...photos, { image: "", caption: "" }]);
  };

  const removePhoto = (index: number) => {
    updateSection("networkingPhotos", photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Ảnh hoạt động</h2>
          <p className="text-sm text-neutral-400">Quản lý ảnh trong mục "Khoảnh khắc hoạt động" trang Cộng đồng.</p>
        </div>
        <button
          onClick={addPhoto}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm ảnh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo, i) => (
          <div key={i} className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-neutral-400">Ảnh #{i + 1}</span>
              </div>
              <button
                onClick={() => removePhoto(i)}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <ImageUploader
              value={photo.image}
              onChange={(val) => updatePhoto(i, "image", val)}
              label="Ảnh"
              hint="Khuyến nghị: 800 × 600px hoặc 600 × 600px — hiển thị dạng lưới ảnh"
            />

            {/* Or URL */}
            <input
              type="text"
              value={photo.image.startsWith("data:") ? "" : photo.image}
              onChange={(e) => updatePhoto(i, "image", e.target.value)}
              placeholder="Hoặc nhập URL ảnh..."
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
            />

            <div>
              <label className="block text-[10px] font-medium text-neutral-500 mb-1">Chú thích</label>
              <input
                type="text"
                value={photo.caption}
                onChange={(e) => updatePhoto(i, "caption", e.target.value)}
                placeholder="Mô tả ảnh..."
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkingPhotosEditor;
