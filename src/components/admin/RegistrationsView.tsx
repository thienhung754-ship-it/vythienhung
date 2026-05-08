import { useState, useEffect, useMemo } from "react";
import { Trash2, Download, RefreshCw } from "lucide-react";
import { Registration, loadRegistrations, deleteRegistration, exportRegistrationsCSV } from "@/lib/registrations";
import { useSiteData } from "@/contexts/SiteDataContext";

const RegistrationsView = () => {
  const { siteData } = useSiteData();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filterWorkshop, setFilterWorkshop] = useState("Tất cả");
  const [filterTime, setFilterTime] = useState("Tất cả");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  const load = () => setRegistrations(loadRegistrations());
  useEffect(() => { load(); }, []);

  const workshopOptions = useMemo(() => {
    const slugs = [...new Set(registrations.map((r) => r.workshopSlug))];
    return ["Tất cả", ...slugs.map((slug) => {
      const w = siteData.workshops?.find((w) => w.slug === slug);
      return w?.title || slug;
    })];
  }, [registrations, siteData.workshops]);

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const workshopTitle = siteData.workshops?.find((w) => w.slug === r.workshopSlug)?.title || r.workshopSlug;
      const matchWorkshop = filterWorkshop === "Tất cả" || workshopTitle === filterWorkshop;
      const matchTime = filterTime === "Tất cả" || r.timeSlot === filterTime;
      const matchStatus = filterStatus === "Tất cả" || r.status === filterStatus;
      return matchWorkshop && matchTime && matchStatus;
    });
  }, [registrations, filterWorkshop, filterTime, filterStatus, siteData.workshops]);

  const handleDelete = (id: string) => {
    if (!confirm("Xoá đăng ký này?")) return;
    deleteRegistration(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Danh sách đăng ký</h2>
          <p className="text-sm text-neutral-400 mt-0.5">
            {filtered.length} / {registrations.length} đăng ký
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Làm mới
          </button>
          <button
            onClick={() => exportRegistrationsCSV(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-neutral-500">Workshop</label>
          <select
            value={filterWorkshop}
            onChange={(e) => setFilterWorkshop(e.target.value)}
            className="bg-neutral-800 text-white text-sm rounded-lg px-3 py-2 border border-neutral-700 focus:outline-none focus:border-blue-500"
          >
            {workshopOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-neutral-500">Thời gian học</label>
          <select value={filterTime} onChange={(e) => setFilterTime(e.target.value)} className="bg-neutral-800 text-white text-sm rounded-lg px-3 py-2 border border-neutral-700 focus:outline-none focus:border-blue-500">
            <option>Tất cả</option>
            <option>Sáng 9h00–10h30</option>
            <option>Tối 20h30–21h30</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-neutral-500">Thanh toán</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-neutral-800 text-white text-sm rounded-lg px-3 py-2 border border-neutral-700 focus:outline-none focus:border-blue-500">
            <option>Tất cả</option>
            <option value="paid">Đã thanh toán</option>
            <option value="pending">Chờ thanh toán</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-500 text-sm">
          {registrations.length === 0 ? "Chưa có đăng ký nào." : "Không có kết quả khớp với bộ lọc."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900">
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">Mã đơn</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">Họ và Tên</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">Điện thoại</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">Email</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">Thời gian</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">Workshop</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">Thanh toán</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">Đăng ký lúc</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg, i) => (
                <tr key={reg.id} className="border-b border-neutral-800/60 last:border-0 hover:bg-neutral-800/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-neutral-400">{reg.orderId}</td>
                  <td className="px-4 py-3 font-medium text-white">{reg.name}</td>
                  <td className="px-4 py-3 text-neutral-300">{reg.phone}</td>
                  <td className="px-4 py-3 text-neutral-300">{reg.email}</td>
                  <td className="px-4 py-3">
                    {reg.timeSlot ? (
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        reg.timeSlot === "Sáng 9h00–10h30" ? "bg-yellow-500/15 text-yellow-400" : "bg-blue-500/15 text-blue-400"
                      }`}>{reg.timeSlot}</span>
                    ) : (
                      <span className="text-neutral-600 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 min-w-[160px]">{reg.workshopTitle}</td>
                  <td className="px-4 py-3">
                    {!reg.timeSlot ? (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-500/15 text-green-400">
                        ✓ Miễn phí
                      </span>
                    ) : reg.status === "paid" ? (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-500/15 text-green-400">
                        ✓ Đã TT
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-yellow-500/10 text-yellow-500">
                        ⧖ Chờ TT
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-500 text-xs whitespace-nowrap">
                    {new Date(reg.registeredAt).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(reg.id)}
                      className="p-1.5 text-neutral-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistrationsView;
