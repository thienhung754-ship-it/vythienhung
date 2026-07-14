import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteDataProvider } from "@/contexts/SiteDataContext";
import Index from "./pages/Index";
import BlogPage from "./pages/BlogPage";
import CommunityPage from "./pages/CommunityPage";
import VibeCodingPage from "./pages/VibeCodingPage";
import LibraryPage from "./pages/LibraryPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import WorkshopsPage from "./pages/WorkshopsPage";
import WorkshopDetailPage from "./pages/WorkshopDetailPage";
import PageTracker from "./components/PageTracker";
import FloatingActions from "./components/FloatingActions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SiteDataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/vibe-coding" element={<VibeCodingPage />} />
            <Route path="/thu-vien" element={<LibraryPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/workshops/:slug" element={<WorkshopDetailPage />} />
            <Route path="/adminhungdz" element={<AdminPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingActions />
        </BrowserRouter>
      </SiteDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
