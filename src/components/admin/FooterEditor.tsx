import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";

const FooterEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const footer = siteData.footer || { companyName: "MERCY TECH GLOBAL", copyrightName: "Vy Thiên Hùng" };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Footer</h2>
        <p className="text-sm text-neutral-400">Chỉnh sửa nội dung hiển thị ở cuối trang.</p>
      </div>

      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tên công ty</label>
          <input
            type="text"
            value={footer.companyName}
            onChange={(e) => updateSection("footer", { ...footer, companyName: e.target.value })}
            className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tên trong copyright</label>
          <input
            type="text"
            value={footer.copyrightName}
            onChange={(e) => updateSection("footer", { ...footer, copyrightName: e.target.value })}
            className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Preview */}
        <div className="mt-4 p-4 bg-neutral-900 rounded-lg border border-neutral-700">
          <p className="text-[10px] text-neutral-500 mb-2 uppercase tracking-wide">Xem trước</p>
          <p className="text-xs text-neutral-400">{footer.companyName}</p>
          <p className="text-[10px] text-neutral-500 mt-1">© {new Date().getFullYear()} {footer.copyrightName}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;
