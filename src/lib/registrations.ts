// ============================================================
// Registration Data Layer — Server API (MySQL) + localStorage fallback
// ============================================================

export type RegistrationStatus = "pending" | "paid" | "cancelled";

export interface Registration {
  id: string;
  orderId: string;           // unique transfer content e.g. "VIBE26032A1B2"
  name: string;
  phone: string;
  email: string;
  timeSlot?: "Sáng 9h00–10h30" | "Tối 20h30–21h30";
  workshopSlug: string;
  workshopTitle: string;
  status: RegistrationStatus;
  registeredAt: string;      // ISO string
  paidAt?: string;           // ISO string when payment confirmed
  amount?: number;           // numeric amount for cron matching
}

const REGISTRATIONS_KEY = "trucanh_registrations";

export function generateOrderId(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const datePart = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${String(now.getFullYear()).slice(2)}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VIBE${datePart}${rand}`;
}

// --- Load from server, fallback to localStorage ---
export async function loadRegistrationsFromServer(): Promise<Registration[]> {
  try {
    const res = await fetch("/api/registrations");
    if (res.ok) {
      const data = await res.json() as Registration[];
      // Sync to localStorage as cache
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(data));
      return data;
    }
  } catch {
    // Server unavailable — fall through to localStorage
  }
  return loadRegistrations();
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

export async function saveRegistration(
  data: Omit<Registration, "id" | "registeredAt" | "orderId" | "status">,
  amount: number = 0,
  initialStatus: RegistrationStatus = "pending"
): Promise<Registration> {
  const newReg: Registration = {
    ...data,
    id: `reg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    orderId: generateOrderId(),
    status: initialStatus,
    registeredAt: new Date().toISOString(),
    amount,
  };

  // Save to localStorage immediately (for instant UI update)
  const existing = loadRegistrations();
  existing.unshift(newReg);
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(existing));

  // Sync to server (MySQL) in background
  fetch("/api/registrations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newReg),
  }).catch((err) => console.warn("Failed to sync registration to server:", err));

  return newReg;
}

export function updateRegistrationStatus(id: string, status: RegistrationStatus): void {
  // Update localStorage
  const registrations = loadRegistrations().map((r) =>
    r.id === id ? { ...r, status, ...(status === "paid" ? { paidAt: new Date().toISOString() } : {}) } : r
  );
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));

  // Sync to server (MySQL) in background
  fetch(`/api/registrations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }).catch((err) => console.warn("Failed to sync status to server:", err));
}

export function deleteRegistration(id: string): void {
  const registrations = loadRegistrations().filter((r) => r.id !== id);
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  // Note: No server-side delete endpoint — soft delete via localStorage only
}

export function exportRegistrationsCSV(registrations: Registration[]): void {
  const headers = ["Họ và Tên", "Điện thoại (Zalo)", "Email", "Thời gian học", "Workshop", "Mã đơn hàng", "Trạng thái", "Số tiền", "Ngày đăng ký", "Ngày thanh toán"];
  const rows = registrations.map((r) => [
    r.name,
    r.phone,
    r.email,
    r.timeSlot ?? "—",
    r.workshopTitle,
    r.orderId,
    r.status === "paid" ? "Đã thanh toán" : r.status === "cancelled" ? "Đã huỷ" : "Chờ thanh toán",
    r.amount ? `${r.amount.toLocaleString("vi-VN")}đ` : "Miễn phí",
    new Date(r.registeredAt).toLocaleString("vi-VN"),
    r.paidAt ? new Date(r.paidAt).toLocaleString("vi-VN") : "—",
  ]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dong-tien-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
