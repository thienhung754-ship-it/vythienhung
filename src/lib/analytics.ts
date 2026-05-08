// ============================================================
// Theo dõi hành vi người dùng — Hệ thống phân tích hoạt động
// ============================================================

const TRACKER_KEY = "trucanh_analytics";
const MAX_EVENTS = 1000;

export type EventType =
  | "trang_moi"         // Mở phiên truy cập mới
  | "xem_trang"         // Xem 1 trang
  | "click_nut"         // Bấm vào nút
  | "click_lien_ket"    // Bấm vào liên kết nội bộ
  | "click_lien_ket_ngoai" // Bấm vào liên kết bên ngoài (ra khỏi trang)
  | "tai_file"          // Tải file PDF/tài liệu
  | "cuon_trang"        // Cuộn trang (25%, 50%, 75%, 100%)
  | "xem_muc"           // Xem section (user cuộn đến section đó)
  | "roi_trang";        // Rời khỏi trang / đóng tab

export interface UserEvent {
  id: string;
  thoiGian: string;           // Thời gian
  loaiSuKien: EventType;      // Loại sự kiện
  trang: string;               // URL trang
  tenTrang: string;            // Tên trang tiếng Việt
  chiTiet: string;             // Chi tiết hành động
  viTriClick: string;          // Vị trí click (text/element)
  thietBi: string;             // Desktop / Mobile / Tablet
  kichThuocManHinh: string;    // resolution
  trinhDuyet: string;          // Tên trình duyệt
  phien: string;               // Session ID
}

export interface ThongKeTongQuan {
  tongLuotXemTrang: number;
  tongPhienTruyCap: number;
  tongLuotClick: number;
  tongLuotCuon: number;
  tongLuotTaiFile: number;
  tongLuotLienKetNgoai: number;
  thoiGianTrungBinhPhien: string;
  trangPhoBien: { trang: string; tenTrang: string; soLuot: number }[];
  nutDuocClickNhieuNhat: { ten: string; soLan: number }[];
  lienKetNgoaiPhoBien: { url: string; soLan: number }[];
  mucDuocXemNhieuNhat: { muc: string; soLan: number }[];
  cuonTrangSauNhat: { trang: string; doSau: string }[];
  hoatDongTheoNgay: { ngay: string; soLuong: number }[];
  thietBi: { loai: string; soLuong: number; phanTram: number }[];
  trinhDuyet: { ten: string; soLuong: number }[];
  suKienGanDay: UserEvent[];
  tongSuKien: number;
}

// ========== Helpers ==========

let currentSessionId: string | null = null;
let sessionStartTime: number | null = null;

function getSessionId(): string {
  if (!currentSessionId) {
    const existing = sessionStorage.getItem("vth_session_id");
    const startTime = sessionStorage.getItem("vth_session_start");
    if (existing) {
      currentSessionId = existing;
      sessionStartTime = startTime ? parseInt(startTime) : Date.now();
    } else {
      currentSessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      sessionStartTime = Date.now();
      sessionStorage.setItem("vth_session_id", currentSessionId);
      sessionStorage.setItem("vth_session_start", String(sessionStartTime));
    }
  }
  return currentSessionId;
}

function layTenThietBi(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "Điện thoại";
  if (/Tablet|iPad/i.test(ua)) return "Máy tính bảng";
  return "Máy tính";
}

function layTenTrinhDuyet(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome") && !ua.includes("Edg/")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  return "Khác";
}

const PAGE_NAMES: Record<string, string> = {
  "/": "Trang chủ",
  "/blog": "Bài viết",
  "/thu-vien": "Thư Viện / Công Cụ",
  "/community": "Cộng đồng",
  "/community/vibe-coding": "Vibe Coding",
};

const SECTION_NAMES: Record<string, string> = {
  about: "Lời ngỏ / Giới thiệu",
  ecosystem: "Hệ sinh thái THE BLUE OCEAN GROUP",
  blog: "Chuyên gia chia sẻ",
  press: "Truyền thông / Báo chí",
  contact: "Liên hệ",
  hobbies: "Điểm khác biệt",
};

export function layTenTrang(path: string): string {
  return PAGE_NAMES[path] || path;
}

export function layTenMuc(sectionId: string): string {
  return SECTION_NAMES[sectionId] || sectionId;
}

// ========== Core Functions ==========

export function ghiSuKien(
  loai: EventType,
  trang: string,
  chiTiet: string = "",
  viTriClick: string = ""
): void {
  try {
    const events = loadEvents();
    const event: UserEvent = {
      id: `e_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      thoiGian: new Date().toISOString(),
      loaiSuKien: loai,
      trang,
      tenTrang: layTenTrang(trang),
      chiTiet,
      viTriClick,
      thietBi: layTenThietBi(),
      kichThuocManHinh: `${window.innerWidth}×${window.innerHeight}`,
      trinhDuyet: layTenTrinhDuyet(),
      phien: getSessionId(),
    };
    events.push(event);
    const trimmed = events.slice(-MAX_EVENTS);
    localStorage.setItem(TRACKER_KEY, JSON.stringify(trimmed));
  } catch {
    // Không để lỗi analytics ảnh hưởng trang web
  }
}

export function loadEvents(): UserEvent[] {
  try {
    const raw = localStorage.getItem(TRACKER_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* bỏ qua */ }
  return [];
}

export function clearEvents(): void {
  localStorage.removeItem(TRACKER_KEY);
}

// ========== Analytics Summary ==========

export function layThongKe(): ThongKeTongQuan {
  const events = loadEvents();

  const tongLuotXemTrang = events.filter((e) => e.loaiSuKien === "xem_trang").length;
  const sessions = new Set(events.map((e) => e.phien));
  const tongPhienTruyCap = sessions.size;

  const clicks = events.filter((e) => ["click_nut", "click_lien_ket"].includes(e.loaiSuKien));
  const tongLuotClick = clicks.length;

  const tongLuotCuon = events.filter((e) => e.loaiSuKien === "cuon_trang").length;
  const tongLuotTaiFile = events.filter((e) => e.loaiSuKien === "tai_file").length;
  const tongLuotLienKetNgoai = events.filter((e) => e.loaiSuKien === "click_lien_ket_ngoai").length;

  // Thời gian trung bình phiên
  const sessionDurations: number[] = [];
  sessions.forEach((sid) => {
    const sessionEvents = events.filter((e) => e.phien === sid);
    if (sessionEvents.length >= 2) {
      const first = new Date(sessionEvents[0].thoiGian).getTime();
      const last = new Date(sessionEvents[sessionEvents.length - 1].thoiGian).getTime();
      sessionDurations.push(last - first);
    }
  });
  const avgMs = sessionDurations.length > 0
    ? sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length
    : 0;
  const avgMin = Math.floor(avgMs / 60000);
  const avgSec = Math.floor((avgMs % 60000) / 1000);
  const thoiGianTrungBinhPhien = avgMs > 0 ? `${avgMin} phút ${avgSec} giây` : "Chưa đủ dữ liệu";

  // Trang phổ biến
  const pageMap: Record<string, { tenTrang: string; soLuot: number }> = {};
  events.filter((e) => e.loaiSuKien === "xem_trang").forEach((e) => {
    if (!pageMap[e.trang]) pageMap[e.trang] = { tenTrang: e.tenTrang, soLuot: 0 };
    pageMap[e.trang].soLuot++;
  });
  const trangPhoBien = Object.entries(pageMap)
    .map(([trang, v]) => ({ trang, tenTrang: v.tenTrang, soLuot: v.soLuot }))
    .sort((a, b) => b.soLuot - a.soLuot)
    .slice(0, 10);

  // Nút được click nhiều nhất
  const buttonClicks: Record<string, number> = {};
  clicks.forEach((e) => {
    const label = e.viTriClick || e.chiTiet || "Không rõ";
    buttonClicks[label] = (buttonClicks[label] || 0) + 1;
  });
  const nutDuocClickNhieuNhat = Object.entries(buttonClicks)
    .map(([ten, soLan]) => ({ ten, soLan }))
    .sort((a, b) => b.soLan - a.soLan)
    .slice(0, 15);

  // Liên kết ngoài phổ biến
  const extLinks: Record<string, number> = {};
  events.filter((e) => e.loaiSuKien === "click_lien_ket_ngoai").forEach((e) => {
    extLinks[e.chiTiet] = (extLinks[e.chiTiet] || 0) + 1;
  });
  const lienKetNgoaiPhoBien = Object.entries(extLinks)
    .map(([url, soLan]) => ({ url, soLan }))
    .sort((a, b) => b.soLan - a.soLan)
    .slice(0, 10);

  // Mục (section) được xem nhiều nhất
  const sectionViews: Record<string, number> = {};
  events.filter((e) => e.loaiSuKien === "xem_muc").forEach((e) => {
    const label = e.chiTiet || e.viTriClick;
    sectionViews[label] = (sectionViews[label] || 0) + 1;
  });
  const mucDuocXemNhieuNhat = Object.entries(sectionViews)
    .map(([muc, soLan]) => ({ muc, soLan }))
    .sort((a, b) => b.soLan - a.soLan);

  // Cuộn trang sâu nhất — per page per session
  const scrollMap: Record<string, number> = {};
  events.filter((e) => e.loaiSuKien === "cuon_trang").forEach((e) => {
    const pct = parseInt(e.chiTiet) || 0;
    const key = `${e.phien}_${e.trang}`;
    scrollMap[key] = Math.max(scrollMap[key] || 0, pct);
  });
  // Group by page
  const pageScrollMax: Record<string, number[]> = {};
  Object.entries(scrollMap).forEach(([key, val]) => {
    const trang = key.split("_").slice(2).join("_") || "/";
    if (!pageScrollMax[trang]) pageScrollMax[trang] = [];
    pageScrollMax[trang].push(val);
  });
  const cuonTrangSauNhat = Object.entries(pageScrollMax)
    .map(([trang, vals]) => ({
      trang: layTenTrang(trang),
      doSau: `Trung bình ${Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)}%`,
    }));

  // Hoạt động theo ngày (14 ngày gần nhất)
  const dayMap: Record<string, number> = {};
  const now = Date.now();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    dayMap[d.toISOString().slice(0, 10)] = 0;
  }
  events.forEach((e) => {
    const day = e.thoiGian.slice(0, 10);
    if (day in dayMap) dayMap[day]++;
  });
  const hoatDongTheoNgay = Object.entries(dayMap).map(([ngay, soLuong]) => ({ ngay, soLuong }));

  // Thiết bị
  const deviceCounts: Record<string, number> = {};
  const sessionDevices = new Map<string, string>();
  events.forEach((e) => {
    if (!sessionDevices.has(e.phien)) sessionDevices.set(e.phien, e.thietBi);
  });
  sessionDevices.forEach((device) => {
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;
  });
  const totalDevices = Object.values(deviceCounts).reduce((a, b) => a + b, 0) || 1;
  const thietBi = Object.entries(deviceCounts)
    .map(([loai, soLuong]) => ({ loai, soLuong, phanTram: Math.round((soLuong / totalDevices) * 100) }))
    .sort((a, b) => b.soLuong - a.soLuong);

  // Trình duyệt
  const browserCounts: Record<string, number> = {};
  const sessionBrowsers = new Map<string, string>();
  events.forEach((e) => {
    if (!sessionBrowsers.has(e.phien)) sessionBrowsers.set(e.phien, e.trinhDuyet);
  });
  sessionBrowsers.forEach((browser) => {
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
  });
  const trinhDuyet = Object.entries(browserCounts)
    .map(([ten, soLuong]) => ({ ten, soLuong }))
    .sort((a, b) => b.soLuong - a.soLuong);

  // Sự kiện gần đây (50)
  const suKienGanDay = [...events].reverse().slice(0, 50);

  return {
    tongLuotXemTrang,
    tongPhienTruyCap,
    tongLuotClick,
    tongLuotCuon,
    tongLuotTaiFile,
    tongLuotLienKetNgoai,
    thoiGianTrungBinhPhien,
    trangPhoBien,
    nutDuocClickNhieuNhat,
    lienKetNgoaiPhoBien,
    mucDuocXemNhieuNhat,
    cuonTrangSauNhat,
    hoatDongTheoNgay,
    thietBi,
    trinhDuyet,
    suKienGanDay,
    tongSuKien: events.length,
  };
}
