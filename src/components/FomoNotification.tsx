import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FomoPerson {
  name: string;
  avatar: string;
  city: string;
  timeAgo: string;
}

// Avatar pools — Vietnamese faces, gender-matched
// Female: tên có "Thị" hoặc tên nữ (Lan, Hoa, Mai, Thu, Hương, Nga, Tú, Linh, Kim, Yến, Diệu, Oanh, Hạnh, Thảo, Loan)
// Male: tên có "Văn" hoặc tên nam (Minh, Đức, Hùng, Nam, Long, Bình, Thắng, An, Phong, Tùng, Quân, Trọng, Sơn, Dũng, Khoa)
const F = (n: number) => `/avatars/vn-f${n}.png`;
const M = (n: number) => `/avatars/vn-m${n}.png`;

// 15 người cho Khoá học Vibe Coding
const COURSE_PEOPLE: FomoPerson[] = [
  { name: "Nguyễn Thị Lan",   avatar: F(1), city: "TP.HCM",      timeAgo: "2 phút trước" },
  { name: "Trần Văn Minh",    avatar: M(1), city: "Hà Nội",      timeAgo: "5 phút trước" },
  { name: "Lê Thị Hoa",       avatar: F(2), city: "Đà Nẵng",     timeAgo: "7 phút trước" },
  { name: "Phạm Văn Đức",     avatar: M(2), city: "Cần Thơ",     timeAgo: "12 phút trước" },
  { name: "Hoàng Thị Mai",    avatar: F(3), city: "Hải Phòng",   timeAgo: "15 phút trước" },
  { name: "Võ Văn Hùng",      avatar: M(3), city: "Bình Dương",  timeAgo: "18 phút trước" },
  { name: "Đặng Thị Thu",     avatar: F(4), city: "Đồng Nai",    timeAgo: "23 phút trước" },
  { name: "Bùi Văn Nam",      avatar: M(4), city: "TP.HCM",      timeAgo: "27 phút trước" },
  { name: "Ngô Thị Hương",    avatar: F(5), city: "Nha Trang",   timeAgo: "31 phút trước" },
  { name: "Đinh Văn Long",    avatar: M(5), city: "Hà Nội",      timeAgo: "38 phút trước" },
  { name: "Trịnh Thị Nga",    avatar: F(1), city: "Vũng Tàu",    timeAgo: "45 phút trước" },
  { name: "Phan Văn Bình",    avatar: M(2), city: "TP.HCM",      timeAgo: "52 phút trước" },
  { name: "Lý Thị Tú",        avatar: F(3), city: "Huế",         timeAgo: "1 giờ trước" },
  { name: "Hồ Văn Thắng",     avatar: M(1), city: "Đà Lạt",      timeAgo: "1 giờ trước" },
  { name: "Cao Thị Linh",     avatar: F(2), city: "Long An",     timeAgo: "2 giờ trước" },
];

// 15 người cho Talkshow (hoàn toàn khác)
const TALKSHOW_PEOPLE: FomoPerson[] = [
  { name: "Nguyễn Văn An",    avatar: M(3), city: "TP.HCM",      timeAgo: "1 phút trước" },
  { name: "Trần Thị Kim",     avatar: F(4), city: "Hà Nội",      timeAgo: "4 phút trước" },
  { name: "Lê Văn Phong",     avatar: M(4), city: "Bắc Ninh",    timeAgo: "9 phút trước" },
  { name: "Phạm Thị Yến",     avatar: F(5), city: "TP.HCM",      timeAgo: "13 phút trước" },
  { name: "Hoàng Văn Tùng",   avatar: M(5), city: "Quảng Nam",   timeAgo: "16 phút trước" },
  { name: "Võ Thị Diệu",      avatar: F(1), city: "Cà Mau",      timeAgo: "21 phút trước" },
  { name: "Đặng Văn Quân",    avatar: M(1), city: "Thái Nguyên", timeAgo: "25 phút trước" },
  { name: "Bùi Thị Oanh",     avatar: F(2), city: "Thanh Hoá",   timeAgo: "29 phút trước" },
  { name: "Ngô Văn Trọng",    avatar: M(2), city: "TP.HCM",      timeAgo: "34 phút trước" },
  { name: "Đinh Thị Hạnh",    avatar: F(3), city: "Hà Nội",      timeAgo: "41 phút trước" },
  { name: "Trịnh Văn Sơn",    avatar: M(3), city: "Đà Nẵng",     timeAgo: "48 phút trước" },
  { name: "Phan Thị Loan",    avatar: F(4), city: "Kiên Giang",  timeAgo: "55 phút trước" },
  { name: "Lý Văn Dũng",      avatar: M(4), city: "An Giang",    timeAgo: "1 giờ trước" },
  { name: "Hồ Thị Thảo",      avatar: F(5), city: "Bình Phước",  timeAgo: "1 giờ trước" },
  { name: "Cao Văn Khoa",     avatar: M(5), city: "Lâm Đồng",    timeAgo: "2 giờ trước" },
];


interface FomoNotificationProps {
  isTalkshow?: boolean;
}

const FomoNotification = ({ isTalkshow = false }: FomoNotificationProps) => {
  const people = isTalkshow ? TALKSHOW_PEOPLE : COURSE_PEOPLE;
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // First notification after 4-8s
    const firstDelay = 4000 + Math.random() * 4000;
    let idx = 0;

    const show = () => {
      setCurrentIndex(idx % people.length);
      idx++;
      setVisible(true);

      // Hide after 5s
      const hideTimer = setTimeout(() => {
        setVisible(false);
        // Next one after 8-16s
        const nextDelay = 8000 + Math.random() * 8000;
        setTimeout(show, nextDelay);
      }, 5000);

      return hideTimer;
    };

    const startTimer = setTimeout(show, firstDelay);
    return () => clearTimeout(startTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const person = currentIndex !== null ? people[currentIndex] : null;

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {visible && person && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -60, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="pointer-events-auto flex items-center gap-3 bg-background/95 backdrop-blur-md border border-border shadow-xl rounded-2xl px-4 py-3 max-w-[260px]"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/30"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=7c3aed&color=fff`;
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            {/* Text */}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground leading-tight truncate">{person.name}</p>
              <p className="text-[11px] text-muted-foreground leading-tight">
                vừa đăng ký từ <span className="text-foreground/70 font-medium">{person.city}</span>
              </p>
              <p className="text-[10px] text-purple-500 mt-0.5">{person.timeAgo}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FomoNotification;
