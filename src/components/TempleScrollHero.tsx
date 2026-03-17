/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  TempleScrollHero.tsx                                       ║
 * ║  Scroll Morph Gallery Hero — 실천불교전국승가회 전용          ║
 * ║                                                              ║
 * ║  카드 앞면: 폴더 아이콘 + 제목 (열린 상태에서 바로 확인)     ║
 * ║  카드 뒷면: 단청 컬러 + "자세히 보기" 링크                    ║
 * ║                                                              ║
 * ║  ⚠ Astro 사용 시 반드시 client:only="react" 지시어 사용:     ║
 * ║  <TempleScrollHero client:only="react" folders={[...]} />    ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";

/* ─────────────────────────────────────────
   TYPES
   ───────────────────────────────────────── */

export interface FolderItem {
  id: string;
  icon: string;
  title: string;
  /** 단청 배경색 (hex) */
  bg: string;
  /** 단청 텍스트 액센트색 (hex) */
  ac: string;
  /** 클릭 시 이동 경로 */
  href?: string;
}

export interface TempleScrollHeroProps {
  folders: FolderItem[];
  introTitle?: string;
  introSubtitle?: string;
  arcTitle?: string;
  arcDesc?: string;
  maxScroll?: number;
  bgClass?: string;
}

/* ─────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────── */

const SCROLL_SENS = 1.8;
const LERP = 0.08;
const CARD_W = 126;
const CARD_H = 96;

function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* ─────────────────────────────────────────
   FOLDER CARD
   ───────────────────────────────────────── */

interface CardProps {
  folder: FolderItem;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  index: number;
  total: number;
}

const FolderCard: React.FC<CardProps> = memo(
  ({ folder, x, y, rotation, scale, index, total }) => {
    const [flipped, setFlipped] = useState(false);

    const handleClick = useCallback(() => {
      if (folder.href) window.location.href = folder.href;
    }, [folder.href]);

    return (
      <div
        className="absolute"
        style={{
          width: CARD_W,
          height: CARD_H,
          left: "50%",
          top: "50%",
          transform: `translate(-50%,-50%) translate(${x}px,${y}px) rotate(${rotation}deg) scale(${scale})`,
          zIndex: total + index,
          perspective: 700,
        }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={handleClick}
        role={folder.href ? "link" : undefined}
        tabIndex={folder.href ? 0 : undefined}
        onKeyDown={(e) => {
          if (folder.href && (e.key === "Enter" || e.key === " "))
            handleClick();
        }}
      >
        <div
          className="relative w-full h-full cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ═══ FRONT — 폴더 아이콘 + 제목 ═══ */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-1.5"
            style={{
              backfaceVisibility: "hidden",
              background: "#fff",
              border: "1.5px solid rgba(180,160,120,0.18)",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* 상단 컬러 탭 */}
            <div
              className="absolute top-0 left-3 right-3"
              style={{
                height: 4,
                borderRadius: "0 0 4px 4px",
                background: folder.bg,
              }}
            />
            <span className="text-[28px] leading-none mt-0.5" aria-hidden="true">
              {folder.icon}
            </span>
            <span
              className="text-[11px] font-bold text-center leading-tight px-2"
              style={{
                color: "#2C2210",
                letterSpacing: "0.02em",
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              {folder.title}
            </span>
          </div>

          {/* ═══ BACK — 단청 컬러 ═══ */}
          <div
            className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: folder.bg,
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="absolute top-1.5 right-2.5 opacity-[0.12] text-white"
              style={{ fontSize: 26, fontFamily: "serif" }}
              aria-hidden="true"
            >
              卍
            </span>
            <span
              className="text-xs font-extrabold tracking-widest"
              style={{ color: folder.ac }}
            >
              자세히 보기
            </span>
            <span className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              → {folder.title}
            </span>
          </div>
        </div>
      </div>
    );
  }
);
FolderCard.displayName = "FolderCard";

/* ─────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────── */

export default function TempleScrollHero({
  folders,
  introTitle = "실천으로 밝히는 정토사회의 길",
  introSubtitle = "스크롤하여 탐색하세요",
  arcTitle = "수행과 실천, 30년의 여정",
  arcDesc = "1992년 창립부터 2026년 현재까지, 한국 불교 개혁의 중심",
  maxScroll = 1000,
  bgClass = "bg-amber-50/40",
}: TempleScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vScroll = useRef(0);
  const aScroll = useRef(0);
  const rafRef = useRef(0);
  const touchY = useRef(0);

  const [positions, setPositions] = useState<
    { x: number; y: number; rotation: number; scale: number }[]
  >([]);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);

  const MAX = maxScroll;
  const total = folders.length;

  const getR = useCallback(
    (base: number, cw: number, ch: number) => {
      const m = Math.min(cw, ch);
      const s = m < 640 ? 0.38 : m < 1024 ? 0.34 : 0.3;
      return Math.min(base, m * s);
    },
    []
  );

  const calc = useCallback(
    (p: number, cw: number, ch: number) => {
      const t = ease(Math.min(1, Math.max(0, p)));
      const cR = getR(300, cw, ch);
      const aR = getR(360, cw, ch);
      const off = ch * 0.06;

      return folders.map((_, i) => {
        const ang = (i / total) * Math.PI * 2 - Math.PI / 2;
        const cx = Math.cos(ang) * cR;
        const cy = Math.sin(ang) * cR;
        const cr = (ang * 180) / Math.PI + 90;
        const aa = Math.PI - (i / (total - 1)) * Math.PI;
        const ax = Math.cos(aa) * aR;
        const ay = -Math.sin(aa) * aR + off;
        const ar = ((aa - Math.PI / 2) * 180) / Math.PI * 0.25;
        return {
          x: cx + (ax - cx) * t,
          y: cy + (ay - cy) * t,
          rotation: cr + (ar - cr) * t,
          scale: 1 + t * 0.04,
        };
      });
    },
    [folders, total, getR]
  );

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;
    const up = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    up();
    const ro = new ResizeObserver(up);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !size.w) return;
    let on = true;
    const loop = () => {
      if (!on) return;
      aScroll.current += (vScroll.current - aScroll.current) * LERP;
      const p = Math.min(1, Math.max(0, aScroll.current / MAX));
      setProgress(p);
      setPositions(calc(p, size.w, size.h));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      on = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, size, MAX, calc]);

  // Wheel — 스크롤 트랩 해제
  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;
    const fn = (e: WheelEvent) => {
      const c = vScroll.current;
      const d = e.deltaY;
      if (d > 0 && c >= MAX) return;
      if (d < 0 && c <= 0) return;
      e.preventDefault();
      vScroll.current = Math.min(MAX, Math.max(0, c + d * SCROLL_SENS));
    };
    el.addEventListener("wheel", fn, { passive: false });
    return () => el.removeEventListener("wheel", fn);
  }, [mounted, MAX]);

  // Touch — 스크롤 트랩 해제
  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;
    const s = (e: TouchEvent) => {
      touchY.current = e.touches[0].clientY;
    };
    const m = (e: TouchEvent) => {
      const c = vScroll.current;
      const d = touchY.current - e.touches[0].clientY;
      touchY.current = e.touches[0].clientY;
      if (d > 0 && c >= MAX) return;
      if (d < 0 && c <= 0) return;
      e.preventDefault();
      vScroll.current = Math.min(MAX, Math.max(0, c + d * SCROLL_SENS * 2));
    };
    el.addEventListener("touchstart", s, { passive: true });
    el.addEventListener("touchmove", m, { passive: false });
    return () => {
      el.removeEventListener("touchstart", s);
      el.removeEventListener("touchmove", m);
    };
  }, [mounted, MAX]);

  const introOp = Math.max(0, 1 - progress * 3);
  const arcOp = Math.max(0, (progress - 0.7) / 0.3);
  const done = progress > 0.95;

  if (!mounted) {
    return (
      <section className={`relative w-full h-screen ${bgClass} flex items-center justify-center`}>
        <div className="w-12 h-12 border-2 border-amber-800/30 border-t-amber-800 rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen ${bgClass} overflow-hidden select-none`}
      style={{ touchAction: vScroll.current < MAX ? "none" : "auto" }}
    >
      {/* Intro */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        style={{ opacity: introOp }}
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-center leading-tight px-5"
          style={{
            fontFamily: "'Noto Serif KR','Batang',serif",
            color: "#2C2210",
            textShadow: "0 1px 3px rgba(255,255,255,0.5)",
          }}
        >
          {introTitle}
        </h1>
        <p
          className="mt-5 text-sm tracking-[0.25em] uppercase font-medium"
          style={{ color: "#8B7355" }}
        >
          {introSubtitle}
        </p>
        <div className="mt-7 animate-bounce">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8B7355"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Arc content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        style={{ opacity: arcOp, paddingTop: size.h * 0.1 }}
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center px-5"
          style={{ fontFamily: "'Noto Serif KR',serif", color: "#1A1A1A" }}
        >
          {arcTitle}
        </h2>
        <p className="mt-3 text-sm text-center" style={{ color: "#6B5B47" }}>
          {arcDesc}
        </p>
        {done && (
          <div className="mt-7 pointer-events-auto animate-pulse">
            <button
              onClick={() => {
                containerRef.current?.nextElementSibling?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="px-7 py-2.5 bg-red-800/90 text-amber-100 text-sm font-semibold rounded-full hover:bg-red-900 transition-colors shadow-md"
            >
              아래로 탐색 ↓
            </button>
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="absolute inset-0 z-[5]">
        {positions.map((pos, i) => (
          <FolderCard
            key={folders[i].id}
            folder={folders[i]}
            x={pos.x}
            y={pos.y}
            rotation={pos.rotation}
            scale={pos.scale}
            index={i}
            total={total}
          />
        ))}
      </div>
    </section>
  );
}
