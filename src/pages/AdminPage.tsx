import React, { useState } from "react";
import {
  LayoutDashboard,
  Image,
  User,
  Layers,
  FileText,
  Newspaper,
  Sparkles,
  MessageCircle,
  BookOpen,
  Users,
  Search,
  ArrowDownUp,
  ChevronLeft,
  Menu,
  ExternalLink,
  BarChart3,
  LogOut,
  ShoppingBag,
  Save,
  RotateCcw,
  Loader2,
  Calendar,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { isAuthenticated, logout, getSession } from "@/lib/auth";
import { useSiteData } from "@/contexts/SiteDataContext";

import AdminLogin from "@/components/admin/AdminLogin";
import DashboardView from "@/components/admin/DashboardView";
import HeroEditor from "@/components/admin/HeroEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import EcosystemEditor from "@/components/admin/EcosystemEditor";
import BlogEditor from "@/components/admin/BlogEditor";
import PressEditor from "@/components/admin/PressEditor";
import HobbiesEditor from "@/components/admin/HobbiesEditor";
import ContactEditor from "@/components/admin/ContactEditor";
import EbookEditor from "@/components/admin/EbookEditor";
import CommunityEditor from "@/components/admin/CommunityEditor";
import SeoEditor from "@/components/admin/SeoEditor";
import ImportExportView from "@/components/admin/ImportExportView";
import AnalyticsView from "@/components/admin/AnalyticsView";
import FooterEditor from "@/components/admin/FooterEditor";
import NetworkingPhotosEditor from "@/components/admin/NetworkingPhotosEditor";
import VibeCodingEditor from "@/components/admin/VibeCodingEditor";
import ZaloLinksEditor from "@/components/admin/ZaloLinksEditor";
import FloatingActionsEditor from "@/components/admin/FloatingActionsEditor";
import ToolsEditor from "@/components/admin/ToolsEditor";
import WorkshopsEditor from "@/components/admin/WorkshopsEditor";
import RegistrationsView from "@/components/admin/RegistrationsView";
import CashFlowView from "@/components/admin/CashFlowView";
import PaymentSettingsEditor from "@/components/admin/PaymentSettingsEditor";

const sections = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Tổng quan" },
  { id: "analytics", label: "User Analytics", icon: BarChart3, group: "Tổng quan" },
  { id: "hero", label: "Hero", icon: Image, group: "Nội dung" },
  { id: "about", label: "Lời ngỏ", icon: User, group: "Nội dung" },
  { id: "ecosystem", label: "Hệ sinh thái", icon: Layers, group: "Nội dung" },
  { id: "blog", label: "Bài viết", icon: FileText, group: "Nội dung" },
  { id: "press", label: "Truyền thông", icon: Newspaper, group: "Nội dung" },
  { id: "hobbies", label: "Bản sắc", icon: Sparkles, group: "Nội dung" },
  { id: "contact", label: "Liên hệ", icon: MessageCircle, group: "Nội dung" },
  { id: "ebook", label: "Ebook", icon: BookOpen, group: "Trang phụ" },
  { id: "tools", label: "Tools", icon: ShoppingBag, group: "Trang phụ" },
  { id: "community", label: "Cộng đồng", icon: Users, group: "Trang phụ" },
  { id: "networking-photos", label: "Ảnh hoạt động", icon: Image, group: "Trang phụ" },
  { id: "vibe-coding", label: "Vibe Coding", icon: Users, group: "Trang phụ" },
  { id: "workshops", label: "Workshop/Sự Kiện", icon: Calendar, group: "Trang phụ" },
  { id: "registrations", label: "Đăng ký học viên", icon: Users, group: "Trang phụ" },
  { id: "cash-flow", label: "Dòng Tiền", icon: TrendingUp, group: "Tài chính" },
  { id: "payment-settings", label: "Cài đặt Thanh toán", icon: CreditCard, group: "Tài chính" },
  { id: "footer", label: "Footer", icon: FileText, group: "Cài đặt" },
  { id: "floating-actions", label: "Nút nổi / Chat", icon: MessageCircle, group: "Cài đặt" },
  { id: "zalo-links", label: "Liên kết Zalo", icon: MessageCircle, group: "Cài đặt" },
  { id: "seo", label: "SEO", icon: Search, group: "Cài đặt" },
  { id: "import-export", label: "Import / Export", icon: ArrowDownUp, group: "Cài đặt" },
] as const;

type SectionId = (typeof sections)[number]["id"];

const AdminPage: React.FC = () => {
  const [authed, setAuthed] = useState(() => isAuthenticated());
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { hasUnsavedChanges, saveToServer, discardChanges } = useSiteData();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveToServer();
      toast.success("✅ Đã lưu thành công vào server!");
    } catch (err: any) {
      toast.error(`❌ Lưu thất bại! ${err?.message || "Không kết nối được server."}`, {
        duration: 8000,
        description: "Dữ liệu chỉ được lưu tạm trong trình duyệt. Vui lòng thử lại.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    setAuthed(false);
  };

  // Show login page if not authenticated
  if (!authed) {
    return <AdminLogin onLoginSuccess={() => setAuthed(true)} />;
  }

  const session = getSession();
  const loginTime = session?.loginTime
    ? new Date(session.loginTime).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })
    : "";

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return <DashboardView />;
      case "analytics": return <AnalyticsView />;
      case "hero": return <HeroEditor />;
      case "about": return <AboutEditor />;
      case "ecosystem": return <EcosystemEditor />;
      case "blog": return <BlogEditor />;
      case "press": return <PressEditor />;
      case "hobbies": return <HobbiesEditor />;
      case "contact": return <ContactEditor />;
      case "ebook": return <EbookEditor />;
      case "tools": return <ToolsEditor />;
      case "community": return <CommunityEditor />;
      case "networking-photos": return <NetworkingPhotosEditor />;
      case "vibe-coding": return <VibeCodingEditor />;
      case "workshops": return <WorkshopsEditor />;
      case "registrations": return <RegistrationsView />;
      case "cash-flow": return <CashFlowView />;
      case "payment-settings": return <PaymentSettingsEditor />;
      case "footer": return <FooterEditor />;
      case "floating-actions": return <FloatingActionsEditor />;
      case "zalo-links": return <ZaloLinksEditor />;
      case "seo": return <SeoEditor />;
      case "import-export": return <ImportExportView />;
      default: return <DashboardView />;
    }
  };

  const groups = [...new Set(sections.map((s) => s.group))];

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-neutral-900 border-r border-neutral-800 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-neutral-800">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                VH
              </div>
              <span className="text-white font-semibold text-sm">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {groups.map((group) => (
            <div key={group} className="mb-4">
              {sidebarOpen && (
                <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold px-3 mb-2">
                  {group}
                </p>
              )}
              {sections
                .filter((s) => s.group === group)
                .map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}
                    title={section.label}
                  >
                    <section.icon className={`w-4 h-4 shrink-0 ${activeSection === section.id ? "text-blue-400" : ""}`} />
                    {sidebarOpen && <span className="truncate">{section.label}</span>}
                  </button>
                ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors w-full"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Xem trang chính</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-white">
            {sections.find((s) => s.id === activeSection)?.label}
          </h1>
          <div className="flex items-center gap-4">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                <span className="text-xs text-amber-400 mr-1">● Chưa lưu</span>
                <button
                  onClick={discardChanges}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Hoàn tác
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors"
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            )}
            {loginTime && (
              <span className="text-xs text-neutral-500">Đăng nhập lúc {loginTime}</span>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
