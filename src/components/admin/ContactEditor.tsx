import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { MessageCircle } from "lucide-react";

const ContactEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const contact = siteData.contact;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Liên hệ / Contact</h2>
        <p className="text-sm text-neutral-400">Cấu hình link Zalo và thông tin liên hệ.</p>
      </div>

      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-white">Zalo</span>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-400 mb-1.5">Link Zalo</label>
          <input
            type="url"
            value={contact.zaloLink}
            onChange={(e) => updateSection("contact", { ...contact, zaloLink: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="https://zalo.me/..."
          />
          <p className="text-xs text-neutral-500 mt-2">Link này sẽ được dùng để tạo QR code và nút liên hệ trên trang.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
