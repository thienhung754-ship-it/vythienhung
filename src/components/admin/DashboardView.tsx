import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { FileText, BookOpen, Users, Newspaper, Clock, HardDrive } from "lucide-react";

const DashboardView: React.FC = () => {
  const { siteData } = useSiteData();

  const storageUsed = (() => {
    try {
      const raw = localStorage.getItem("trucanh_site_data");
      if (raw) {
        const bytes = new Blob([raw]).size;
        if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        if (bytes > 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${bytes} B`;
      }
    } catch { /* ignore */ }
    return "0 B";
  })();

  const lastUpdated = siteData.lastUpdated
    ? new Date(siteData.lastUpdated).toLocaleString("vi-VN", {
        dateStyle: "long",
        timeStyle: "short",
      })
    : "Chưa cập nhật";

  const stats = [
    { icon: FileText, label: "Bài viết", value: siteData.blog.length, color: "text-blue-400 bg-blue-500/10" },
    { icon: BookOpen, label: "Ebook", value: siteData.ebooks.length, color: "text-emerald-400 bg-emerald-500/10" },
    { icon: Users, label: "Cộng đồng", value: siteData.communities.length, color: "text-purple-400 bg-purple-500/10" },
    { icon: Newspaper, label: "Báo chí", value: siteData.press.length, color: "text-orange-400 bg-orange-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Dashboard</h2>
        <p className="text-sm text-neutral-400">Tổng quan nhanh về nội dung trang web.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-neutral-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Cập nhật cuối</span>
          </div>
          <p className="text-sm text-neutral-300">{lastUpdated}</p>
        </div>
        <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
          <div className="flex items-center gap-2 mb-3">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white">Dung lượng localStorage</span>
          </div>
          <p className="text-sm text-neutral-300">{storageUsed}</p>
        </div>
      </div>

      {/* Ecosystem count */}
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
        <h3 className="text-sm font-medium text-white mb-3">Tổng quan Sections</h3>
        <div className="space-y-2">
          {[
            { name: "Hero", status: "✓ Đã cấu hình" },
            { name: "About / Lời ngỏ", status: `${siteData.about.paragraphsVisible.length + siteData.about.paragraphsCollapsed.length} đoạn văn` },
            { name: "Ecosystem", status: `${siteData.ecosystem.length} sản phẩm` },
            { name: "Hobbies", status: `${siteData.hobbies.sections.length} mục` },
            { name: "Liên hệ", status: siteData.contact.zaloLink ? "✓ Đã cấu hình" : "⚠ Chưa cấu hình" },
          ].map(({ name, status }) => (
            <div key={name} className="flex items-center justify-between py-2 border-b border-neutral-700/50 last:border-0">
              <span className="text-sm text-neutral-300">{name}</span>
              <span className="text-xs text-neutral-400">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
