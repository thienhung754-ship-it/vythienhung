import { useState } from "react";
import { Save, Copy, CheckCircle2, ExternalLink, Info, CreditCard, Clock, Link2 } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { toast } from "sonner";

const PaymentSettingsEditor = () => {
  const { siteData, updateSection } = useSiteData();
  const [ps, setPs] = useState(siteData.paymentSettings ?? {
    bankName: "ACB",
    accountNumber: "24488671",
    accountHolderName: "MAI XUAN ANH",
    apiUrl: "https://api.sieuthicode.net/historyapiacb/ec4f8aeb9d87bc0ffa48f709365313d1",
    pollIntervalSeconds: 5,
    timeoutMinutes: 30,
    transferContentPrefix: "VIBE",
    cronJobUrl: "https://api.sieuthicode.net/historyapiacb/ec4f8aeb9d87bc0ffa48f709365313d1",
  });
  const [copied, setCopied] = useState<string | null>(null);

  const handleSave = () => {
    updateSection("paymentSettings", ps);
    toast.success("✅ Đã lưu cài đặt thanh toán!");
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const field = (
    label: string,
    key: keyof typeof ps,
    type: "text" | "number" = "text",
    hint?: string
  ) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{label}</label>
      <input
        type={type}
        value={String(ps[key])}
        onChange={(e) =>
          setPs((prev) => ({
            ...prev,
            [key]: type === "number" ? Number(e.target.value) : e.target.value,
          }))
        }
        className="bg-neutral-800 border border-neutral-700 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
      />
      {hint && <p className="text-xs text-neutral-600">{hint}</p>}
    </div>
  );

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-white">Cài đặt Thanh toán</h2>
        <p className="text-sm text-neutral-400 mt-1">
          Quản lý thông tin tài khoản ngân hàng, API xác minh và cấu hình thanh toán tự động.
        </p>
      </div>

      {/* Bank Info */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Thông tin Ngân hàng</h3>
        </div>
        {field("Ngân hàng", "bankName", "text", "Viết hoa, không dấu — dùng trong URL VietQR. VD: ACB, VCB, MB")}
        {field("Số tài khoản", "accountNumber")}
        {field("Chủ tài khoản", "accountHolderName", "text", "Viết IN HOA, không dấu đúng theo tên ngân hàng")}
        {field("Prefix mã đơn hàng", "transferContentPrefix", "text", "VD: VIBE → mã đơn sẽ là VIBE22032A1B2")}
      </section>

      {/* API & Polling */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">API & Tự động xác minh</h3>
        </div>
        {field(
          "API URL lịch sử giao dịch",
          "apiUrl",
          "text",
          "URL trả về JSON lịch sử giao dịch ACB. Hệ thống sẽ call URL này để kiểm tra thanh toán."
        )}
        {field(
          "Tần suất kiểm tra (giây)",
          "pollIntervalSeconds",
          "number",
          "Hệ thống sẽ tự động gọi API sau mỗi X giây trong khi modal đang mở. Mặc định: 5"
        )}
        {field(
          "Thời gian hết hạn đơn (phút)",
          "timeoutMinutes",
          "number",
          "Đơn hàng sẽ hết hạn sau X phút nếu chưa thanh toán. Mặc định: 30"
        )}
      </section>

      {/* Cron Job */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Link2 className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Cron Job URL</h3>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-xs text-neutral-300 leading-relaxed">
            Cài URL này vào một dịch vụ cron job (cron-job.org, EasyCron...) để tự động kiểm tra nạp tiền mỗi 5 phút — không cần mở modal.
            Sau khi cài, hệ thống sẽ tự cập nhật trạng thái đơn hàng khi nhận được thanh toán.
          </p>
        </div>
        {field("Cron Job URL", "cronJobUrl", "text", "URL anh sẽ cài vào cron job service để kiểm tra giao dịch định kỳ")}

        {/* Display & copy */}
        <div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3">
          <code className="text-xs text-purple-300 flex-1 break-all">{ps.cronJobUrl}</code>
          <button
            onClick={() => copy(ps.cronJobUrl, "cron")}
            className="shrink-0 p-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            {copied === "cron" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <a
            href={ps.cronJobUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 p-1.5 text-neutral-400 hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="bg-neutral-800/60 rounded-xl p-4 space-y-2">
          <p className="text-xs font-semibold text-neutral-300 mb-2">Hướng dẫn cài cron job:</p>
          <ol className="text-xs text-neutral-400 space-y-1 list-decimal list-inside">
            <li>Truy cập <a href="https://cron-job.org" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">cron-job.org</a> (miễn phí)</li>
            <li>Đăng ký tài khoản → Tạo Cronjob mới</li>
            <li>Dán URL ở trên vào ô "URL"</li>
            <li>Đặt tần suất: mỗi <strong className="text-white">5 phút</strong></li>
            <li>Lưu và kích hoạt → Hệ thống sẽ tự động kiểm tra nạp tiền</li>
          </ol>
        </div>
      </section>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
      >
        <Save className="w-4 h-4" />
        Lưu cài đặt thanh toán
      </button>
    </div>
  );
};

export default PaymentSettingsEditor;
