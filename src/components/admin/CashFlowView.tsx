import { useState, useEffect, useMemo, useCallback } from "react";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  RefreshCw,
  Download,
  Copy,
  ExternalLink,
  ArrowDownLeft,
  ArrowUpRight,
  Loader2,
  DollarSign,
  Link2,
} from "lucide-react";
import { Registration, loadRegistrations, loadRegistrationsFromServer, exportRegistrationsCSV } from "@/lib/registrations";
import { useSiteData } from "@/contexts/SiteDataContext";

interface BankTransaction {
  transactionID: string;
  amount: number;
  description: string;
  type: "IN" | "OUT";
  when: string;
}

const CashFlowView = () => {
  const { siteData } = useSiteData();
  const ps = siteData.paymentSettings;

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [liveTransactions, setLiveTransactions] = useState<BankTransaction[]>([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [copiedCron, setCopiedCron] = useState(false);

  // Filters
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [filterWorkshop, setFilterWorkshop] = useState("Tất cả");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const load = () => {
    // Try server first, fallback to localStorage
    loadRegistrationsFromServer().then(setRegistrations).catch(() => setRegistrations(loadRegistrations()));
  };
  useEffect(() => { load(); }, []);

  const fetchLive = useCallback(async () => {
    if (!ps?.apiUrl) return;
    setLoadingLive(true);
    try {
      const res = await fetch(ps.apiUrl);
      const json = await res.json();
      if (json?.messageStatus === "success") {
        const raw = (json.data ?? []) as any[];
        setLiveTransactions(
          raw.slice(0, 20).map((t: any) => ({
            transactionID: t.transactionID ?? t.id ?? String(Math.random()),
            amount: Number(t.amount),
            description: t.description ?? t.memo ?? "",
            type: t.type === "IN" ? "IN" : "OUT",
            when: t.when ?? t.date ?? new Date().toISOString(),
          }))
        );
        setLastFetched(new Date());
      }
    } catch {
      // silently fail
    } finally {
      setLoadingLive(false);
    }
  }, [ps?.apiUrl]);

  useEffect(() => { fetchLive(); }, [fetchLive]);

  // --- Stats ---
  const paidRegistrations = useMemo(
    () => registrations.filter((r) => r.status === "paid"),
    [registrations]
  );
  const pendingRegistrations = useMemo(
    () => registrations.filter((r) => r.status === "pending"),
    [registrations]
  );

  const totalRevenue = useMemo(() => {
    return paidRegistrations.reduce((sum, r) => {
      const ws = siteData.workshops?.find((w) => w.slug === r.workshopSlug);
      return sum + (ws?.priceValue ?? 0);
    }, 0);
  }, [paidRegistrations, siteData.workshops]);

  const todayRevenue = useMemo(() => {
    const today = new Date().toDateString();
    return paidRegistrations
      .filter((r) => r.paidAt && new Date(r.paidAt).toDateString() === today)
      .reduce((sum, r) => {
        const ws = siteData.workshops?.find((w) => w.slug === r.workshopSlug);
        return sum + (ws?.priceValue ?? 0);
      }, 0);
  }, [paidRegistrations, siteData.workshops]);

  // --- Table filter ---
  const workshopOptions = useMemo(() => {
    const slugs = [...new Set(registrations.map((r) => r.workshopSlug))];
    return ["Tất cả", ...slugs.map((s) => siteData.workshops?.find((w) => w.slug === s)?.title ?? s)];
  }, [registrations, siteData.workshops]);

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const matchStatus = filterStatus === "Tất cả" || r.status === filterStatus;
      const workshopTitle = siteData.workshops?.find((w) => w.slug === r.workshopSlug)?.title ?? r.workshopSlug;
      const matchWorkshop = filterWorkshop === "Tất cả" || workshopTitle === filterWorkshop;
      const paidDate = r.paidAt ? new Date(r.paidAt) : null;
      const matchFrom = !dateFrom || (paidDate && paidDate >= new Date(dateFrom));
      const matchTo = !dateTo || (paidDate && paidDate <= new Date(dateTo + "T23:59:59"));
      return matchStatus && matchWorkshop && matchFrom && matchTo;
    });
  }, [registrations, filterStatus, filterWorkshop, dateFrom, dateTo, siteData.workshops]);

  const copyCron = () => {
    const base = window.location.origin;
    const url = ps?.cronJobUrl
      ? (ps.cronJobUrl.startsWith("http") ? ps.cronJobUrl : `${base}${ps.cronJobUrl}`)
      : `${base}/api/cron/check-payments`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedCron(true);
      setTimeout(() => setCopiedCron(false), 1800);
    });
  };

  const cronDisplayUrl = ps?.cronJobUrl
    ? (ps.cronJobUrl.startsWith("http") ? ps.cronJobUrl : `${window.location.origin}${ps.cronJobUrl}`)
    : `${window.location.origin}/api/cron/check-payments`;

  const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white">Dòng Tiền</h2>
        <p className="text-sm text-neutral-400 mt-1">
          Tổng quan doanh thu, lịch sử thanh toán và giao dịch thực tế từ ngân hàng.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Tổng doanh thu",
            value: fmt(totalRevenue),
            sub: `${paidRegistrations.length} đơn thành công`,
            icon: DollarSign,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Hôm nay",
            value: fmt(todayRevenue),
            sub: new Date().toLocaleDateString("vi-VN"),
            icon: TrendingUp,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            label: "Đã thanh toán",
            value: String(paidRegistrations.length),
            sub: "đơn xác nhận",
            icon: CheckCircle2,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
          {
            label: "Chờ thanh toán",
            value: String(pendingRegistrations.length),
            sub: "đơn chưa xử lý",
            icon: Clock,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
          },
        ].map((card) => (
          <div key={card.label} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-3">
            <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{card.label}</div>
              <div className="text-[11px] text-neutral-600">{card.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Cron Job Banner */}
      <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
          <Link2 className="w-5 h-5 text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white mb-0.5">Cron Job — Kiểm tra nạp tiền tự động</p>
          <code className="text-xs text-purple-300 break-all">{cronDisplayUrl}</code>
          <p className="text-xs text-neutral-500 mt-1">
            Cài URL này vào cron-job.org (mỗi 5 phút) để xác minh thanh toán tự động mà không cần mở modal.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={copyCron}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 transition-colors"
          >
            {copiedCron ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCron ? "Đã copy!" : "Copy URL"}
          </button>
          <a
            href={cronDisplayUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Mở URL
          </a>
        </div>
      </div>

      {/* Paid Registrations Table */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-neutral-800">
          <div>
            <h3 className="text-sm font-bold text-white">Lịch sử Thanh toán</h3>
            <p className="text-xs text-neutral-500">{filtered.length} / {registrations.length} đơn hàng</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Filters */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-800 text-white text-xs rounded-lg px-3 py-1.5 border border-neutral-700 focus:outline-none"
            >
              <option>Tất cả</option>
              <option value="paid">Đã TT</option>
              <option value="pending">Chờ TT</option>
            </select>
            <select
              value={filterWorkshop}
              onChange={(e) => setFilterWorkshop(e.target.value)}
              className="bg-neutral-800 text-white text-xs rounded-lg px-3 py-1.5 border border-neutral-700 focus:outline-none"
            >
              {workshopOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="Từ ngày"
              className="bg-neutral-800 text-white text-xs rounded-lg px-3 py-1.5 border border-neutral-700 focus:outline-none"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="Đến ngày"
              className="bg-neutral-800 text-white text-xs rounded-lg px-3 py-1.5 border border-neutral-700 focus:outline-none"
            />
            <button
              onClick={() => { load(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => exportRegistrationsCSV(filtered)}
              disabled={filtered.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-14 text-neutral-600 text-sm">
            Chưa có giao dịch nào.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-900 border-b border-neutral-800">
                  {["Mã đơn", "Khách hàng", "Dịch vụ", "Số tiền", "Trạng thái", "Thời gian TT"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg) => {
                  const ws = siteData.workshops?.find((w) => w.slug === reg.workshopSlug);
                  const amount = ws?.priceValue ?? 0;
                  return (
                    <tr key={reg.id} className="border-b border-neutral-800/50 last:border-0 hover:bg-neutral-800/30 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-neutral-400">{reg.orderId}</td>
                      <td className="px-5 py-3">
                        <div className="font-medium text-white text-sm">{reg.name}</div>
                        <div className="text-xs text-neutral-500">{reg.email}</div>
                      </td>
                      <td className="px-5 py-3 text-neutral-300 text-xs max-w-[180px]">{reg.workshopTitle}</td>
                      <td className="px-5 py-3">
                        {amount > 0 ? (
                          <span className="font-bold text-emerald-400">{fmt(amount)}</span>
                        ) : (
                          <span className="text-xs text-neutral-500">Miễn phí</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {reg.status === "paid" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-500/10 text-green-400">
                            <CheckCircle2 className="w-3 h-3" /> Đã TT
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-500/10 text-yellow-500">
                            <Clock className="w-3 h-3" /> Chờ TT
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs text-neutral-500 whitespace-nowrap">
                        {reg.paidAt
                          ? new Date(reg.paidAt).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Live Bank Transactions */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div>
            <h3 className="text-sm font-bold text-white">Giao dịch Thực tế từ Ngân hàng</h3>
            <p className="text-xs text-neutral-500">
              {lastFetched
                ? `Cập nhật lúc ${lastFetched.toLocaleTimeString("vi-VN")}`
                : "Đang lấy dữ liệu..."}
            </p>
          </div>
          <button
            onClick={fetchLive}
            disabled={loadingLive}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors disabled:opacity-40"
          >
            {loadingLive
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <RefreshCw className="w-3.5 h-3.5" />}
            Làm mới
          </button>
        </div>

        {liveTransactions.length === 0 ? (
          <div className="text-center py-14 text-neutral-600 text-sm">
            {loadingLive ? "Đang tải giao dịch..." : "Không có dữ liệu giao dịch hoặc API không khả dụng."}
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/50">
            {liveTransactions.map((t) => (
              <div key={t.transactionID} className="flex items-center gap-4 px-6 py-3.5 hover:bg-neutral-800/30 transition-colors">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  t.type === "IN" ? "bg-green-500/10" : "bg-red-500/10"
                }`}>
                  {t.type === "IN"
                    ? <ArrowDownLeft className="w-4 h-4 text-green-400" />
                    : <ArrowUpRight className="w-4 h-4 text-red-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{t.description || "Giao dịch ngân hàng"}</p>
                  <p className="text-xs text-neutral-500">
                    {new Date(t.when).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}
                  </p>
                </div>
                <span className={`text-sm font-bold shrink-0 ${t.type === "IN" ? "text-green-400" : "text-red-400"}`}>
                  {t.type === "IN" ? "+" : "-"}{fmt(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CashFlowView;
