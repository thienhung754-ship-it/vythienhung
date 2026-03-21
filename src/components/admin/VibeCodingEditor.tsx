import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { VibeCodingGroup } from "@/lib/siteData";
import { Plus, Trash2, Users } from "lucide-react";

const VibeCodingEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const groups = siteData.vibeCodingGroups || [];

  const updateGroup = (index: number, field: keyof VibeCodingGroup, value: unknown) => {
    const updated = [...groups];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("vibeCodingGroups", updated);
  };

  const addGroup = () => {
    updateSection("vibeCodingGroups", [
      ...groups,
      { title: "", subtitle: "", description: "", features: [], link: "", linkText: "Tham gia" },
    ]);
  };

  const removeGroup = (index: number) => {
    updateSection("vibeCodingGroups", groups.filter((_, i) => i !== index));
  };

  const updateFeature = (groupIndex: number, featureIndex: number, value: string) => {
    const newFeatures = [...groups[groupIndex].features];
    newFeatures[featureIndex] = value;
    updateGroup(groupIndex, "features", newFeatures);
  };

  const addFeature = (groupIndex: number) => {
    updateGroup(groupIndex, "features", [...groups[groupIndex].features, ""]);
  };

  const removeFeature = (groupIndex: number, featureIndex: number) => {
    updateGroup(groupIndex, "features", groups[groupIndex].features.filter((_, i) => i !== featureIndex));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Vibe Coding Groups</h2>
          <p className="text-sm text-neutral-400">Quản lý các nhóm Zalo Vibe Coding (trang chọn nhóm).</p>
        </div>
        <button
          onClick={addGroup}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm nhóm
        </button>
      </div>

      {groups.map((group, i) => (
        <div key={i} className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">{group.title || `Nhóm #${i + 1}`}</span>
            </div>
            <button onClick={() => removeGroup(i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tiêu đề</label>
              <input type="text" value={group.title} onChange={(e) => updateGroup(i, "title", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Phụ đề</label>
              <input type="text" value={group.subtitle} onChange={(e) => updateGroup(i, "subtitle", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Mô tả</label>
            <textarea value={group.description} onChange={(e) => updateGroup(i, "description", e.target.value)} rows={2}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Link Zalo</label>
              <input type="text" value={group.link} onChange={(e) => updateGroup(i, "link", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Text nút</label>
              <input type="text" value={group.linkText} onChange={(e) => updateGroup(i, "linkText", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-neutral-400">Tính năng / Ưu điểm</label>
              <button onClick={() => addFeature(i)} className="text-xs text-blue-400 hover:text-blue-300">+ Thêm</button>
            </div>
            {group.features.map((feat, fi) => (
              <div key={fi} className="flex items-center gap-2 mb-1.5">
                <input type="text" value={feat} onChange={(e) => updateFeature(i, fi, e.target.value)}
                  className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500 transition-colors" />
                <button onClick={() => removeFeature(i, fi)} className="p-1 text-red-400 hover:text-red-300"><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VibeCodingEditor;
