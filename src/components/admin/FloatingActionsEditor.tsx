import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { MessageCircle, Users } from "lucide-react";

const FloatingActionsEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const fa = siteData.floatingActions || {
    contactZaloLink: "https://zalo.me/0763068614",
    communityLink: "/community/vibe-coding",
    communityLabel: "Cộng đồng",
  };

  const update = (field: string, value: string) => {
    updateSection("floatingActions", { ...fa, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Nút nổi (Floating Actions)</h2>
        <p className="text-sm text-neutral-400">Chỉnh sửa nút cộng đồng và liên hệ Zalo ở góc phải dưới trang.</p>
      </div>

      {/* Community button */}
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-medium text-white">Nút Cộng đồng</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Link đến</label>
            <input
              type="text"
              value={fa.communityLink}
              onChange={(e) => update("communityLink", e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Text hiển thị</label>
            <input
              type="text"
              value={fa.communityLabel}
              onChange={(e) => update("communityLabel", e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Zalo contact */}
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-medium text-white">Nút Liên hệ Zalo</h3>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">Link Zalo cá nhân</label>
          <input
            type="text"
            value={fa.contactZaloLink}
            onChange={(e) => update("contactZaloLink", e.target.value)}
            placeholder="https://zalo.me/..."
            className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingActionsEditor;
