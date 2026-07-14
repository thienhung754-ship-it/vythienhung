import { useState } from "react";
import { Share2, Check, Link } from "lucide-react";

interface ShareButtonProps {
  slug: string;
  title: string;
  /** compact=true: icon only; false: icon + text */
  compact?: boolean;
  className?: string;
}

const ShareButton = ({ slug, title, compact = false, className = "" }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/workshops/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // fallthrough to clipboard
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      title="Copy link chia sẻ sự kiện"
      className={`inline-flex items-center gap-1.5 text-xs font-medium transition-all duration-200 rounded-lg px-2.5 py-1.5
        ${copied
          ? "bg-green-500/10 text-green-400"
          : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
        } ${className}`}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <Link className="w-3.5 h-3.5 shrink-0" />
      )}
      {!compact && (
        <span>{copied ? "Đã copy!" : "Chia sẻ"}</span>
      )}
    </button>
  );
};

export default ShareButton;
