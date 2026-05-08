import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { WorkshopEvent } from "@/lib/siteData";
import ImageUploader from "./ImageUploader";
import ShareButton from "@/components/ShareButton";
import { Plus, Trash2, Calendar, ChevronDown, ChevronUp } from "lucide-react";

const emptyWorkshop: WorkshopEvent = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  date: "",
  time: "",
  location: "",
  image: "",
  category: "Workshop",
  status: "upcoming",
  highlights: [],
  agenda: [],
  speaker: { name: "", title: "", avatar: "" },
  price: "Miễn phí",
  ctaText: "Tìm hiểu thêm",
  ctaLink: "",
};

const WorkshopsEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const workshops = siteData.workshops || [];
  const [expandedIdx, setExpandedIdx] = React.useState<number | null>(null);

  const updateItem = (index: number, updates: Partial<WorkshopEvent>) => {
    const updated = [...workshops];
    updated[index] = { ...updated[index], ...updates };
    updateSection("workshops", updated);
  };

  const addItem = () => {
    const slug = `workshop-${Date.now()}`;
    updateSection("workshops", [...workshops, { ...emptyWorkshop, slug }]);
    setExpandedIdx(workshops.length);
  };

  const removeItem = (index: number) => {
    updateSection("workshops", workshops.filter((_, i) => i !== index));
    if (expandedIdx === index) setExpandedIdx(null);
  };

  // Highlight helpers
  const addHighlight = (index: number) => {
    const item = workshops[index];
    updateItem(index, { highlights: [...item.highlights, ""] });
  };
  const updateHighlight = (wIdx: number, hIdx: number, value: string) => {
    const item = workshops[wIdx];
    const highlights = [...item.highlights];
    highlights[hIdx] = value;
    updateItem(wIdx, { highlights });
  };
  const removeHighlight = (wIdx: number, hIdx: number) => {
    const item = workshops[wIdx];
    updateItem(wIdx, { highlights: item.highlights.filter((_, i) => i !== hIdx) });
  };

  // Agenda helpers
  const addAgenda = (index: number) => {
    const item = workshops[index];
    updateItem(index, { agenda: [...item.agenda, { time: "", title: "" }] });
  };
  const updateAgenda = (wIdx: number, aIdx: number, field: "time" | "title", value: string) => {
    const item = workshops[wIdx];
    const agenda = [...item.agenda];
    agenda[aIdx] = { ...agenda[aIdx], [field]: value };
    updateItem(wIdx, { agenda });
  };
  const removeAgenda = (wIdx: number, aIdx: number) => {
    const item = workshops[wIdx];
    updateItem(wIdx, { agenda: item.agenda.filter((_, i) => i !== aIdx) });
  };

  const inputClass = "w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-xs font-medium text-neutral-400 mb-1.5";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Workshop / Sự Kiện</h2>
          <p className="text-sm text-neutral-400">Quản lý các workshop, khoá học và talkshow.</p>
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm sự kiện
        </button>
      </div>

      {workshops.map((item, i) => {
        const isExpanded = expandedIdx === i;
        return (
          <div key={item.slug || i} className="bg-neutral-800/50 rounded-xl border border-neutral-700 overflow-hidden">
            {/* Collapsed header */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-800/80 transition-colors"
              onClick={() => setExpandedIdx(isExpanded ? null : i)}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-white">{item.title || `Sự kiện #${i + 1}`}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-700 text-neutral-300">{item.category}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-700 text-neutral-300">{item.status}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.slug && (
                  <ShareButton slug={item.slug} title={item.title || `Sự kiện #${i + 1}`} compact />
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); removeItem(i); }}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
              </div>
            </div>

            {/* Expanded content */}
            {isExpanded && (
              <div className="p-5 pt-0 space-y-4 border-t border-neutral-700">
                {/* Basic info */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className={labelClass}>Slug (URL)</label>
                    <input type="text" value={item.slug} onChange={(e) => updateItem(i, { slug: e.target.value })} className={inputClass} placeholder="vd: vibe-coding-workshop-2026" />
                  </div>
                  <div>
                    <label className={labelClass}>Tiêu đề</label>
                    <input type="text" value={item.title} onChange={(e) => updateItem(i, { title: e.target.value })} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Subtitle</label>
                  <input type="text" value={item.subtitle} onChange={(e) => updateItem(i, { subtitle: e.target.value })} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Mô tả</label>
                  <textarea value={item.description} onChange={(e) => updateItem(i, { description: e.target.value })} rows={3} className={inputClass + " resize-none"} />
                </div>

                <ImageUploader
                  value={item.image?.startsWith("data:") ? item.image : ""}
                  onChange={(v) => updateItem(i, { image: v })}
                  label="Banner image"
                  fallbackSrc={item.image && !item.image.startsWith("data:") ? item.image : undefined}
                  hint="Khuyến nghị: 1200 × 630px — banner chính sự kiện, tỉ lệ 16:9 hoặc 1.91:1"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className={labelClass}>Ngày</label>
                    <input type="text" value={item.date} onChange={(e) => updateItem(i, { date: e.target.value })} className={inputClass} placeholder="20/04/2026" />
                  </div>
                  <div>
                    <label className={labelClass}>Thời gian</label>
                    <input type="text" value={item.time} onChange={(e) => updateItem(i, { time: e.target.value })} className={inputClass} placeholder="09:00 - 17:00" />
                  </div>
                  <div>
                    <label className={labelClass}>Địa điểm</label>
                    <input type="text" value={item.location} onChange={(e) => updateItem(i, { location: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Giá</label>
                    <input type="text" value={item.price} onChange={(e) => updateItem(i, { price: e.target.value })} className={inputClass} placeholder="Miễn phí" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className={labelClass}>Loại</label>
                    <select value={item.category} onChange={(e) => updateItem(i, { category: e.target.value })} className={inputClass}>
                      <option value="Workshop">Workshop</option>
                      <option value="Khoá học">Khoá học</option>
                      <option value="Talkshow">Talkshow</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Trạng thái</label>
                    <select value={item.status} onChange={(e) => updateItem(i, { status: e.target.value })} className={inputClass}>
                      <option value="upcoming">Sắp diễn ra</option>
                      <option value="ongoing">Đang diễn ra</option>
                      <option value="completed">Đã kết thúc</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>CTA Text</label>
                    <input type="text" value={item.ctaText} onChange={(e) => updateItem(i, { ctaText: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>CTA Link</label>
                    <input type="text" value={item.ctaLink} onChange={(e) => updateItem(i, { ctaLink: e.target.value })} className={inputClass} />
                  </div>
                </div>

                {/* Pricing details */}
                <div className="bg-neutral-900/50 rounded-lg p-4 space-y-3">
                  <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Chi tiết giá (tuỳ chọn)</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className={labelClass}>Giá gốc (số)</label>
                      <input type="number" value={item.originalPrice || ""} onChange={(e) => updateItem(i, { originalPrice: Number(e.target.value) || 0 })} className={inputClass} placeholder="19000000" />
                    </div>
                    <div>
                      <label className={labelClass}>Giá sau giảm (số)</label>
                      <input type="number" value={item.priceValue || ""} onChange={(e) => updateItem(i, { priceValue: Number(e.target.value) || 0 })} className={inputClass} placeholder="594000" />
                    </div>
                    <div className="col-span-2">
                      <label className={labelClass}>Slogan</label>
                      <input type="text" value={item.slogan || ""} onChange={(e) => updateItem(i, { slogan: e.target.value })} className={inputClass} placeholder="Sản phẩm 5* giá 1*" />
                    </div>
                  </div>
                </div>

                {/* Speaker */}
                <div className="bg-neutral-900/50 rounded-lg p-4 space-y-3">
                  <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Diễn giả</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Tên</label>
                      <input type="text" value={item.speaker.name} onChange={(e) => updateItem(i, { speaker: { ...item.speaker, name: e.target.value } })} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Chức danh</label>
                      <input type="text" value={item.speaker.title} onChange={(e) => updateItem(i, { speaker: { ...item.speaker, title: e.target.value } })} className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-neutral-900/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Highlights</p>
                    <button onClick={() => addHighlight(i)} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">+ Thêm</button>
                  </div>
                  {item.highlights.map((hl, hi) => (
                    <div key={hi} className="flex items-center gap-2">
                      <input type="text" value={hl} onChange={(e) => updateHighlight(i, hi, e.target.value)} className={inputClass + " flex-1"} placeholder="Điểm nổi bật..." />
                      <button onClick={() => removeHighlight(i, hi)} className="p-1.5 text-red-400 hover:text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Bonuses */}
                <div className="bg-neutral-900/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Quà tặng kèm</p>
                    <button onClick={() => { const bonuses = [...(item.bonuses || []), ""]; updateItem(i, { bonuses }); }} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">+ Thêm</button>
                  </div>
                  {(item.bonuses || []).map((b, bi) => (
                    <div key={bi} className="flex items-center gap-2">
                      <input type="text" value={b} onChange={(e) => { const bonuses = [...(item.bonuses || [])]; bonuses[bi] = e.target.value; updateItem(i, { bonuses }); }} className={inputClass + " flex-1"} placeholder="Quà tặng..." />
                      <button onClick={() => { const bonuses = (item.bonuses || []).filter((_, idx) => idx !== bi); updateItem(i, { bonuses }); }} className="p-1.5 text-red-400 hover:text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Agenda */}
                <div className="bg-neutral-900/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Lịch trình</p>
                    <button onClick={() => addAgenda(i)} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">+ Thêm</button>
                  </div>
                  {item.agenda.map((ag, ai) => (
                    <div key={ai} className="flex items-center gap-2">
                      <input type="text" value={ag.time} onChange={(e) => updateAgenda(i, ai, "time", e.target.value)} className={inputClass + " w-40"} placeholder="09:00 - 10:00" />
                      <input type="text" value={ag.title} onChange={(e) => updateAgenda(i, ai, "title", e.target.value)} className={inputClass + " flex-1"} placeholder="Nội dung..." />
                      <button onClick={() => removeAgenda(i, ai)} className="p-1.5 text-red-400 hover:text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {workshops.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          Chưa có sự kiện nào. Bấm "Thêm sự kiện" để bắt đầu.
        </div>
      )}
    </div>
  );
};

export default WorkshopsEditor;
