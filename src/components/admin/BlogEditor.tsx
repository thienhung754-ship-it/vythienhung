import React from "react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { BlogPost } from "@/lib/siteData";
import { Plus, Trash2, FileText } from "lucide-react";

const BlogEditor: React.FC = () => {
  const { siteData, updateSection } = useSiteData();
  const posts = siteData.blog;

  const updatePost = (index: number, field: keyof BlogPost, value: string) => {
    const updated = [...posts];
    updated[index] = { ...updated[index], [field]: value };
    updateSection("blog", updated);
  };

  const addPost = () => {
    updateSection("blog", [
      ...posts,
      { category: "", title: "", excerpt: "", content: "", date: new Date().getFullYear().toString() },
    ]);
  };

  const removePost = (index: number) => {
    updateSection("blog", posts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Blog / Bài viết</h2>
          <p className="text-sm text-neutral-400">Quản lý bài viết chuyên gia chia sẻ.</p>
        </div>
        <button
          onClick={addPost}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm bài
        </button>
      </div>

      {posts.map((post, i) => (
        <div key={i} className="bg-neutral-800/50 rounded-xl border border-neutral-700 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Bài viết #{i + 1}</span>
            </div>
            <button
              onClick={() => removePost(i)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Danh mục</label>
              <input
                type="text"
                value={post.category}
                onChange={(e) => updatePost(i, "category", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="VD: Công nghệ & AI"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Năm</label>
              <input
                type="text"
                value={post.date}
                onChange={(e) => updatePost(i, "date", e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tiêu đề</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => updatePost(i, "title", e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Tóm tắt</label>
            <textarea
              value={post.excerpt}
              onChange={(e) => updatePost(i, "excerpt", e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Nội dung (dùng 2 dòng trống để ngắt đoạn)</label>
            <textarea
              value={post.content}
              onChange={(e) => updatePost(i, "content", e.target.value)}
              rows={6}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogEditor;
