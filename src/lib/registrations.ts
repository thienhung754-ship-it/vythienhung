// ============================================================
// Registration Data Layer — localStorage
// ============================================================

export type RegistrationStatus = "pending" | "paid" | "cancelled";

export interface Registration {
  id: string;
  orderId: string;           // unique transfer content e.g. "VIBE26032A1B2"
  name: string;
  phone: string;
  email: string;
  timeSlot: "Sáng 9h00–10h30" | "Tối 20h30–21h30";
  workshopSlug: string;
  workshopTitle: string;
  status: RegistrationStatus;
  registeredAt: string;      // ISO string
  paidAt?: string;           // ISO string when payment confirmed
}

const REGISTRATIONS_KEY = "vythienhung_registrations";

export function generateOrderId(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const datePart = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${String(now.getFullYear()).slice(2)}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VIBE${datePart}${rand}`;
}

export function loadRegistrations(): Registration[] {
  try {
    const raw = localStorage.getItem(REGISTRATIONS_KEY);
    if (raw) return JSON.parse(raw) as Registration[];
  } catch (e) {
    console.warn("Failed to load registrations:", e);
  }
  return [];
}

export function saveRegistration(data: Omit<Registration, "id" | "registeredAt" | "orderId" | "status">): Registration {
  const registrations = loadRegistrations();
  const newReg: Registration = {
    ...data,
    id: `reg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    orderId: generateOrderId(),
    status: "pending",
    registeredAt: new Date().toISOString(),
  };
  registrations.unshift(newReg);
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  return newReg;
}

export function updateRegistrationStatus(id: string, status: RegistrationStatus): void {
  const registrations = loadRegistrations().map((r) =>
    r.id === id ? { ...r, status, ...(status === "paid" ? { paidAt: new Date().toISOString() } : {}) } : r
  );
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
}

export function deleteRegistration(id: string): void {
  const registrations = loadRegistrations().filter((r) => r.id !== id);
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
}

export function exportRegistrationsCSV(registrations: Registration[]): void {
  const headers = ["Họ và Tên", "Điện thoại (Zalo)", "Email", "Thời gian học", "Workshop", "Mã đơn hàng", "Trạng thái", "Ngày đăng ký"];
  const rows = registrations.map((r) => [
    r.name,
    r.phone,
    r.email,
    r.timeSlot,
    r.workshopTitle,
    r.orderId,
    r.status === "paid" ? "Đã thanh toán" : r.status === "cancelled" ? "Đã huỷ" : "Chờ thanh toán",
    new Date(r.registeredAt).toLocaleString("vi-VN"),
  ]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dang-ky-workshop-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
