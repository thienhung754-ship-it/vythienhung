import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Link2 } from "lucide-react";

const ZaloLinksEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const zalo = siteData.zaloLinks || { contactZalo: "", ebookGroupZalo: "" };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Liên kết Zalo</h2>
        <p className="text-sm text-neutral-400">Quản lý tất cả liên kết Zalo dùng trên trang web.</p>
      </div>

      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="w-4 h-4 text-blue-400" />
            <label className="text-sm font-medium text-white">Zalo cá nhân (liên hệ)</label>
          </div>
          <p className="text-[10px] text-neutral-500 mb-2">Dùng ở: Trang Liên hệ, Trang Cộng đồng (QR code kết bạn)</p>
          <input
            type="text"
            value={zalo.contactZalo}
            onChange={(e) => updateSection("zaloLinks", { ...zalo, contactZalo: e.target.value })}
            placeholder="https://zalo.me/..."
            className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="border-t border-neutral-700 pt-5">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="w-4 h-4 text-emerald-400" />
            <label className="text-sm font-medium text-white">Zalo nhóm Ebook (popup tải tài liệu)</label>
          </div>
          <p className="text-[10px] text-neutral-500 mb-2">Dùng ở: Popup khuyến khích tham gia nhóm trước khi tải ebook</p>
          <input
            type="text"
            value={zalo.ebookGroupZalo}
            onChange={(e) => updateSection("zaloLinks", { ...zalo, ebookGroupZalo: e.target.value })}
            placeholder="https://zalo.me/g/..."
            className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default ZaloLinksEditor;
