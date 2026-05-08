import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Copy, X, Clock, Loader2, AlertCircle } from "lucide-react";
import { Registration, updateRegistrationStatus } from "@/lib/registrations";
import { useSiteData } from "@/contexts/SiteDataContext";

interface PaymentModalProps {
  registration: Registration;
  amount?: number;            // default 693000
  onSuccess: () => void;
  onClose: () => void;
}

function formatMs(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const PaymentModal = ({ registration, amount = 693000, onSuccess, onClose }: PaymentModalProps) => {
  const { siteData } = useSiteData();
  const ps = siteData.paymentSettings;
  const BANK_ACCOUNT = ps?.accountNumber ?? "24488671";
  const BANK_NAME = ps?.bankName ?? "ACB";
  const ACCOUNT_NAME = ps?.accountHolderName ?? "MAI XUAN ANH";
  const API_URL = ps?.apiUrl ?? "https://api.sieuthicode.net/historyapiacb/ec4f8aeb9d87bc0ffa48f709365313d1";
  const POLL_INTERVAL = (ps?.pollIntervalSeconds ?? 5) * 1000;
  const TIMEOUT_MINUTES = ps?.timeoutMinutes ?? 30;

  function vietQRUrl(amt: number, info: string) {
    return `https://img.vietqr.io/image/${BANK_NAME}-${BANK_ACCOUNT}-compact2.png?amount=${amt}&addInfo=${encodeURIComponent(info)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;
  }
  const [copied, setCopied] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "checking" | "paid" | "expired">("pending");
  const [remaining, setRemaining] = useState(TIMEOUT_MINUTES * 60 * 1000);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const checkPayment = useCallback(async () => {
    try {
      setStatus("checking");

      // 1. Poll our own server for status (set by cron job)
      try {
        const res = await fetch(`/api/registrations/status/${registration.orderId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.status === "paid") {
            updateRegistrationStatus(registration.id, "paid");
            setStatus("paid");
            setTimeout(onSuccess, 1800);
            return;
          }
          // Still pending on server — no need to hit bank API
          setStatus("pending");
          return;
        }
      } catch {
        // Server unavailable — fall through to direct bank API check
      }

      // 2. Fallback: check bank API directly (when running locally without server)
      const res = await fetch(API_URL);
      const json = await res.json();
      if (json?.messageStatus !== "success") { setStatus("pending"); return; }
      const transactions: { amount: number; description: string; type: string }[] = json.data || [];
      const matched = transactions.find(
        (t) =>
          t.type === "IN" &&
          t.amount >= amount &&
          t.description?.toUpperCase().includes(registration.orderId.toUpperCase())
      );
      if (matched) {
        updateRegistrationStatus(registration.id, "paid");
        setStatus("paid");
        setTimeout(onSuccess, 1800);
      } else {
        setStatus("pending");
      }
    } catch {
      setStatus("pending");
    }
  }, [registration.id, registration.orderId, amount, onSuccess, API_URL]);


  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1000) { clearInterval(interval); setStatus("expired"); return 0; }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Poll API
  useEffect(() => {
    if (status === "expired" || status === "paid") return;
    const poll = setInterval(checkPayment, POLL_INTERVAL);
    return () => clearInterval(poll);
  }, [checkPayment, status]);

  const isPaid = status === "paid";
  const isExpired = status === "expired";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-background rounded-2xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close */}
        {!isPaid && (
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors z-10">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex flex-col md:flex-row">
          {/* Left — QR */}
          <div className="md:w-5/12 bg-secondary/20 flex flex-col items-center justify-center gap-5 border-b md:border-b-0 md:border-r border-border overflow-hidden">
            {isPaid ? (
              <div className="flex flex-col items-center gap-3 py-16 px-8">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <p className="font-bold text-foreground text-lg text-center">Thanh toán thành công!</p>
                <p className="text-sm text-muted-foreground text-center">Email xác nhận & tài liệu sẽ được gửi cho bạn sớm nhất.</p>
              </div>
            ) : (
              <>
                <div className="w-full px-6 pt-6">
                  <p className="text-sm font-semibold text-foreground text-center mb-1">Quét mã QR để thanh toán</p>
                  <p className="text-xs text-muted-foreground text-center">Mở app ngân hàng và quét mã dưới đây</p>
                </div>
                {/* QR — large, no box */}
                <div className="w-full px-4">
                  <img
                    src={vietQRUrl(amount, registration.orderId)}
                    alt="QR thanh toán"
                    className="w-full rounded-xl object-contain"
                  />
                </div>
                {/* Countdown */}
                <div className={`mx-6 mb-6 w-[calc(100%-3rem)] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold ${isExpired ? "bg-red-500/10 text-red-400" : "bg-foreground/5 text-foreground"}`}>
                  {isExpired ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Clock className="w-4 h-4 shrink-0" />}
                  {isExpired ? "Đơn hàng đã hết hạn" : `Hết hạn sau ${formatMs(remaining)}`}
                </div>
              </>
            )}
          </div>

          {/* Right — details */}
          <div className="md:w-7/12 p-8 flex flex-col gap-5">
            {/* Order info header */}
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Thông tin đơn hàng</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-widest text-foreground">{registration.orderId}</span>
                <button onClick={() => copy(registration.orderId, "orderId")} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                  {copied === "orderId" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <hr className="border-border" />

            {/* Transfer info */}
            <div className="space-y-3 text-sm">
              {[
                { label: "Ngân hàng", value: "ACB — Ngân hàng Á Châu", copy: false },
                { label: "Số tài khoản", value: BANK_ACCOUNT, copy: true, key: "account" },
                { label: "Chủ tài khoản", value: ACCOUNT_NAME, copy: false },
                { label: "Số tiền", value: `${amount.toLocaleString("vi-VN")}đ`, copy: false, highlight: true },
                { label: "Nội dung CK", value: registration.orderId, copy: true, key: "content", highlight: true },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground shrink-0 w-28">{row.label}</span>
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className={`font-semibold text-right ${row.highlight ? "text-foreground" : "text-foreground/80"}`}>
                      {row.value}
                    </span>
                    {row.copy && (
                      <button onClick={() => copy(row.value, row.key!)} className="p-1 text-muted-foreground hover:text-foreground shrink-0 transition-colors">
                        {copied === row.key ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-border" />

            {/* Customer + status */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Họ tên</span>
                <span className="font-medium text-foreground">{registration.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground">{registration.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Sản phẩm</span>
                <span className="font-medium text-foreground text-right max-w-[180px]">{registration.workshopTitle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Trạng thái</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                  isPaid ? "bg-green-500/10 text-green-500"
                  : isExpired ? "bg-red-500/10 text-red-400"
                  : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {status === "checking" && <Loader2 className="w-3 h-3 animate-spin" />}
                  {isPaid ? "Đã thanh toán" : isExpired ? "Hết hạn" : status === "checking" ? "Đang kiểm tra..." : "Chờ thanh toán"}
                </span>
              </div>
            </div>

            {isExpired && (
              <button onClick={onClose} className="w-full py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                Huỷ & quay lại
              </button>
            )}

            {!isPaid && !isExpired && (
              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                Hệ thống tự động xác nhận sau khi nhận chuyển khoản. Vui lòng nhập đúng nội dung <strong className="text-foreground">{registration.orderId}</strong>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
