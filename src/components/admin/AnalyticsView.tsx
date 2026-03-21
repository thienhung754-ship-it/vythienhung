import React, { useState, useEffect } from "react";
import { layThongKe, clearEvents, type ThongKeTongQuan, type UserEvent } from "@/lib/analytics";
import {
  Eye, Users, MousePointerClick, Monitor, Smartphone, Tablet,
  Trash2, RefreshCw, Activity, BarChart3, Clock, ArrowUpRight,
  Globe, Download, ExternalLink, Layers, ScrollText
} from "lucide-react";

const LOAI_SU_KIEN: Record<string, { nhan: string; mau: string }> = {
  trang_moi:             { nhan: "🟢 Phiên mới",        mau: "bg-green-500/10 text-green-400" },
  xem_trang:             { nhan: "👁️ Xem trang",        mau: "bg-blue-500/10 text-blue-400" },
  click_nut:             { nhan: "👆 Bấm nút",           mau: "bg-emerald-500/10 text-emerald-400" },
  click_lien_ket:        { nhan: "🔗 Bấm liên kết",     mau: "bg-cyan-500/10 text-cyan-400" },
  click_lien_ket_ngoai:  { nhan: "🌐 Link ra ngoài",    mau: "bg-orange-500/10 text-orange-400" },
  tai_file:              { nhan: "📥 Tải file",          mau: "bg-purple-500/10 text-purple-400" },
  cuon_trang:            { nhan: "📜 Cuộn trang",        mau: "bg-indigo-500/10 text-indigo-400" },
  xem_muc:               { nhan: "📋 Xem mục",          mau: "bg-yellow-500/10 text-yellow-400" },
  roi_trang:             { nhan: "🚪 Rời trang",        mau: "bg-red-500/10 text-red-400" },
};

const DeviceIcon: React.FC<{ device: string }> = ({ device }) => {
  if (device.includes("thoại")) return <Smartphone className="w-4 h-4" />;
  if (device.includes("bảng")) return <Tablet className="w-4 h-4" />;
  return <Monitor className="w-4 h-4" />;
};

const AnalyticsView: React.FC = () => {
  const [data, setData] = useState<ThongKeTongQuan | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [tab, setTab] = useState<"tongquan" | "click" | "sukien">("tongquan");

  const refresh = () => setData(layThongKe());

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    clearEvents();
    refresh();
    setShowClearConfirm(false);
  };

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Phân tích người dùng</h2>
          <p className="text-sm text-neutral-400">
            Theo dõi chi tiết hành vi khách truy cập — {data.tongSuKien} sự kiện được ghi nhận.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={refresh} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors" title="Làm mới">
            <RefreshCw className="w-4 h-4" />
          </button>
          {!showClearConfirm ? (
            <button onClick={() => setShowClearConfirm(true)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors" title="Xóa dữ liệu">
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button onClick={handleClear} className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg">Xác nhận xóa</button>
              <button onClick={() => setShowClearConfirm(false)} className="px-3 py-1.5 bg-neutral-700 text-white text-xs rounded-lg">Hủy</button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-800/50 rounded-xl p-1">
        {[
          { id: "tongquan" as const, label: "Tổng quan" },
          { id: "click" as const, label: `Hành vi click (${data.tongLuotClick})` },
          { id: "sukien" as const, label: `Nhật ký sự kiện (${data.suKienGanDay.length})` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "tongquan" && <TongQuanTab data={data} />}
      {tab === "click" && <ClickTab data={data} />}
      {tab === "sukien" && <SuKienTab events={data.suKienGanDay} />}
    </div>
  );
};

// ==================== TAB 1: TỔNG QUAN ====================
const TongQuanTab: React.FC<{ data: ThongKeTongQuan }> = ({ data }) => (
  <div className="space-y-6">
    {/* Thẻ thống kê chính */}
    <div className="grid grid-cols-3 gap-4">
      <StatCard icon={Eye} color="text-blue-400 bg-blue-500/10" value={data.tongLuotXemTrang} label="Lượt xem trang" />
      <StatCard icon={Users} color="text-purple-400 bg-purple-500/10" value={data.tongPhienTruyCap} label="Phiên truy cập" />
      <StatCard icon={MousePointerClick} color="text-emerald-400 bg-emerald-500/10" value={data.tongLuotClick} label="Lượt click" />
    </div>
    <div className="grid grid-cols-3 gap-4">
      <StatCard icon={Download} color="text-orange-400 bg-orange-500/10" value={data.tongLuotTaiFile} label="Lượt tải file" />
      <StatCard icon={ExternalLink} color="text-cyan-400 bg-cyan-500/10" value={data.tongLuotLienKetNgoai} label="Link ra ngoài" />
      <StatCard icon={ScrollText} color="text-indigo-400 bg-indigo-500/10" value={data.tongLuotCuon} label="Sự kiện cuộn" />
    </div>

    {/* Thời gian phiên trung bình */}
    <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
        <Clock className="w-5 h-5 text-yellow-400" />
      </div>
      <div>
        <p className="text-sm text-neutral-400">Thời gian trung bình mỗi phiên</p>
        <p className="text-lg font-bold text-white">{data.thoiGianTrungBinhPhien}</p>
      </div>
    </div>

    {/* Biểu đồ 14 ngày */}
    <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-medium text-white">Hoạt động 14 ngày gần nhất</h3>
      </div>
      <div className="flex items-end gap-1.5 h-28">
        {data.hoatDongTheoNgay.map((day) => {
          const maxCount = Math.max(...data.hoatDongTheoNgay.map((d) => d.soLuong), 1);
          const height = Math.max((day.soLuong / maxCount) * 100, 3);
          return (
            <div key={day.ngay} className="flex-1 flex flex-col items-center gap-0.5">
              <span className="text-[9px] text-neutral-500">{day.soLuong || ""}</span>
              <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all" style={{ height: `${height}%` }} />
              <span className="text-[8px] text-neutral-600">{day.ngay.slice(8)}</span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Trang + Thiết bị + Trình duyệt */}
    <div className="grid grid-cols-3 gap-4">
      {/* Trang phổ biến */}
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-medium text-white">Trang phổ biến</h3>
        </div>
        {data.trangPhoBien.length === 0 ? (
          <p className="text-xs text-neutral-500">Chưa có dữ liệu</p>
        ) : data.trangPhoBien.map((p) => (
          <div key={p.trang} className="flex items-center justify-between py-1.5 border-b border-neutral-700/30 last:border-0">
            <span className="text-xs text-neutral-300 truncate mr-2">{p.tenTrang}</span>
            <span className="text-[10px] text-neutral-500 shrink-0">{p.soLuot} lượt</span>
          </div>
        ))}
      </div>

      {/* Thiết bị */}
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Monitor className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-medium text-white">Thiết bị</h3>
        </div>
        {data.thietBi.length === 0 ? (
          <p className="text-xs text-neutral-500">Chưa có</p>
        ) : data.thietBi.map((d) => (
          <div key={d.loai} className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-300">
                <DeviceIcon device={d.loai} /> {d.loai}
              </div>
              <span className="text-[10px] text-neutral-500">{d.phanTram}% ({d.soLuong})</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${d.phanTram}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Trình duyệt */}
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-medium text-white">Trình duyệt</h3>
        </div>
        {data.trinhDuyet.length === 0 ? (
          <p className="text-xs text-neutral-500">Chưa có</p>
        ) : data.trinhDuyet.map((b) => (
          <div key={b.ten} className="flex items-center justify-between py-1.5 border-b border-neutral-700/30 last:border-0">
            <span className="text-xs text-neutral-300">{b.ten}</span>
            <span className="text-[10px] text-neutral-500">{b.soLuong} phiên</span>
          </div>
        ))}
      </div>
    </div>

    {/* Mục được xem + Cuộn sâu nhất */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-yellow-400" />
          <h3 className="text-sm font-medium text-white">Mục được xem nhiều</h3>
        </div>
        <p className="text-[10px] text-neutral-500 mb-2">User cuộn đến section nào trên trang</p>
        {data.mucDuocXemNhieuNhat.length === 0 ? (
          <p className="text-xs text-neutral-500">Chưa có</p>
        ) : data.mucDuocXemNhieuNhat.map((m) => (
          <div key={m.muc} className="flex items-center justify-between py-1.5 border-b border-neutral-700/30 last:border-0">
            <span className="text-xs text-neutral-300">{m.muc}</span>
            <span className="text-[10px] text-neutral-500">{m.soLan} lần</span>
          </div>
        ))}
      </div>

      <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
        <div className="flex items-center gap-2 mb-3">
          <ScrollText className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-medium text-white">Độ sâu cuộn trang</h3>
        </div>
        <p className="text-[10px] text-neutral-500 mb-2">User cuộn bao xa trước khi rời đi</p>
        {data.cuonTrangSauNhat.length === 0 ? (
          <p className="text-xs text-neutral-500">Chưa có</p>
        ) : data.cuonTrangSauNhat.map((c) => (
          <div key={c.trang} className="flex items-center justify-between py-1.5 border-b border-neutral-700/30 last:border-0">
            <span className="text-xs text-neutral-300">{c.trang}</span>
            <span className="text-[10px] text-neutral-500">{c.doSau}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ==================== TAB 2: HÀNH VI CLICK ====================
const ClickTab: React.FC<{ data: ThongKeTongQuan }> = ({ data }) => (
  <div className="space-y-6">
    {/* Nút/liên kết được bấm nhiều nhất */}
    <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
      <div className="flex items-center gap-2 mb-1">
        <MousePointerClick className="w-4 h-4 text-emerald-400" />
        <h3 className="text-sm font-medium text-white">Nút & liên kết được bấm nhiều nhất</h3>
      </div>
      <p className="text-[10px] text-neutral-500 mb-3">Hiển thị chính xác user bấm vào text/nút nào</p>
      {data.nutDuocClickNhieuNhat.length === 0 ? (
        <p className="text-xs text-neutral-500">Chưa có click nào được ghi nhận</p>
      ) : (
        <div className="space-y-1">
          {data.nutDuocClickNhieuNhat.map((item, i) => {
            const maxClicks = data.nutDuocClickNhieuNhat[0]?.soLan || 1;
            const pct = Math.round((item.soLan / maxClicks) * 100);
            return (
              <div key={i} className="relative">
                <div className="absolute inset-0 bg-emerald-500/5 rounded-lg" style={{ width: `${pct}%` }} />
                <div className="relative flex items-center justify-between px-3 py-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] text-neutral-600 shrink-0 w-5">#{i + 1}</span>
                    <span className="text-sm text-neutral-200 truncate">"{item.ten}"</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-400 shrink-0 ml-2">{item.soLan} lần</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

    {/* Liên kết ra ngoài */}
    <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
      <div className="flex items-center gap-2 mb-1">
        <ExternalLink className="w-4 h-4 text-orange-400" />
        <h3 className="text-sm font-medium text-white">Liên kết ra bên ngoài</h3>
      </div>
      <p className="text-[10px] text-neutral-500 mb-3">Các URL bên ngoài mà user bấm vào (Zalo, Facebook,...)</p>
      {data.lienKetNgoaiPhoBien.length === 0 ? (
        <p className="text-xs text-neutral-500">Chưa có</p>
      ) : data.lienKetNgoaiPhoBien.map((link) => (
        <div key={link.url} className="flex items-center justify-between py-2 border-b border-neutral-700/30 last:border-0">
          <span className="text-xs text-blue-400 truncate mr-2 max-w-[350px]">{link.url}</span>
          <span className="text-[10px] text-neutral-500 shrink-0">{link.soLan} lần</span>
        </div>
      ))}
    </div>

    {/* Chi tiết click gần đây */}
    <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
      <div className="flex items-center gap-2 mb-3">
        <ArrowUpRight className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-medium text-white">Chi tiết click gần đây</h3>
      </div>
      {(() => {
        const clickEvents = data.suKienGanDay.filter((e) =>
          ["click_nut", "click_lien_ket", "click_lien_ket_ngoai", "tai_file"].includes(e.loaiSuKien)
        ).slice(0, 20);
        if (clickEvents.length === 0) return <p className="text-xs text-neutral-500">Chưa có</p>;
        return (
          <div className="space-y-2">
            {clickEvents.map((e) => (
              <div key={e.id} className="flex items-start gap-3 py-2 border-b border-neutral-700/20 last:border-0">
                <div className={`px-2 py-0.5 rounded text-[9px] font-medium shrink-0 ${LOAI_SU_KIEN[e.loaiSuKien]?.mau || ""}`}>
                  {LOAI_SU_KIEN[e.loaiSuKien]?.nhan || e.loaiSuKien}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white truncate">{e.viTriClick}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    {new Date(e.thoiGian).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "medium" })}
                    {" · "}{e.tenTrang} · {e.thietBi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  </div>
);

// ==================== TAB 3: NHẬT KÝ SỰ KIỆN ====================
const SuKienTab: React.FC<{ events: UserEvent[] }> = ({ events }) => (
  <div className="space-y-2">
    {events.length === 0 ? (
      <div className="text-center py-16 text-neutral-500">
        <Activity className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">Chưa có hoạt động nào.</p>
        <p className="text-xs mt-1">Hãy truy cập trang chính để bắt đầu ghi nhận.</p>
      </div>
    ) : (
      events.map((event) => {
        const info = LOAI_SU_KIEN[event.loaiSuKien] || { nhan: event.loaiSuKien, mau: "bg-neutral-700 text-neutral-400" };
        return (
          <div key={event.id} className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-4">
            <div className="flex items-start gap-3">
              <div className={`px-2 py-0.5 rounded text-[9px] font-medium shrink-0 mt-0.5 ${info.mau}`}>
                {info.nhan}
              </div>
              <div className="flex-1 min-w-0">
                {/* Dòng chính — chi tiết hành động */}
                <p className="text-sm text-white">{event.viTriClick || event.chiTiet}</p>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                  <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(event.thoiGian).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "medium" })}
                  </span>
                  <span className="text-[10px] text-neutral-500">📄 {event.tenTrang}</span>
                  <span className="text-[10px] text-neutral-500">📱 {event.thietBi}</span>
                  <span className="text-[10px] text-neutral-500">🖥️ {event.kichThuocManHinh}</span>
                  <span className="text-[10px] text-neutral-500">🌐 {event.trinhDuyet}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })
    )}
  </div>
);

// ==================== Components ====================

const StatCard: React.FC<{ icon: React.FC<{ className?: string }>; color: string; value: number; label: string }> = ({ icon: Icon, color, value, label }) => (
  <div className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5">
    <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center mb-3`}>
      <Icon className="w-4.5 h-4.5" />
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-[10px] text-neutral-400 mt-1">{label}</p>
  </div>
);

export default AnalyticsView;
