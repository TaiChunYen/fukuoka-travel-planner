import { useEffect, useState } from "react";
import { MapPin, RotateCcw, Trash2 } from "lucide-react";
import QuickTools from "./components/QuickTools";
import Timeline from "./components/Timeline";
import BudgetTracker from "./components/BudgetTracker";
import PackingChecklist from "./components/PackingChecklist";
import { DEFAULT_CHECKLIST, DEFAULT_RATE, PRESET_ITINERARY } from "./components/Presets";

const LS_KEYS = { days: "fukuoka-days-v2", rate: "fukuoka-rate-v1", check: "fukuoka-check-v1" };

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [days, setDays] = useState(() => load(LS_KEYS.days, PRESET_ITINERARY));
  const [rate, setRate] = useState(() => load(LS_KEYS.rate, DEFAULT_RATE));
  const [checklist, setChecklist] = useState(() => load(LS_KEYS.check, DEFAULT_CHECKLIST));
  const [activeDay, setActiveDay] = useState(days[0]?.id ?? "day-1");

  useEffect(() => localStorage.setItem(LS_KEYS.days, JSON.stringify(days)), [days]);
  useEffect(() => localStorage.setItem(LS_KEYS.rate, JSON.stringify(rate)), [rate]);
  useEffect(() => localStorage.setItem(LS_KEYS.check, JSON.stringify(checklist)), [checklist]);

  const resetAll = () => {
    if (!window.confirm("確定要重置為預設 12 天 11 夜行程嗎？你的修改將會遺失。")) return;
    setDays(PRESET_ITINERARY);
    setRate(DEFAULT_RATE);
    setChecklist(DEFAULT_CHECKLIST);
    setActiveDay("day-1");
  };

  const clearDay = () => {
    if (!window.confirm("確定要清空這一天的行程嗎？")) return;
    setDays((prev) => prev.map((d) => (d.id === activeDay ? { ...d, items: [] } : d)));
  };

  return (
    <div className="min-h-screen">
      {/* 頂部 Hero */}
      <header className="bg-gradient-to-br from-red-500 via-red-500 to-orange-400 px-4 pb-6 pt-6 text-white sm:pt-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
            <MapPin size={12} /> 🇯🇵 FUKUOKA TRIP PLANNER
          </p>
          <h1 className="text-2xl font-black leading-tight sm:text-4xl">福岡自由行<br className="sm:hidden" />行程規劃助手</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">
            太宰府・由布院・系島・屋台美食一次搞定。行程自動儲存在手機裡，一鍵開啟 Google Maps 導航＋VJW 入境。
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={resetAll} className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-bold text-red-600 shadow transition hover:bg-red-50">
              <RotateCcw size={13} /> 載入 5 天 4 夜範本
            </button>
            <button onClick={clearDay} className="inline-flex items-center gap-1 rounded-xl bg-black/20 px-3 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-black/30">
              <Trash2 size={13} /> 清空本日行程
            </button>
          </div>
        </div>
      </header>

      {/* 主內容 */}
      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-3 py-4 sm:px-4 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-4">
          <Timeline days={days} setDays={setDays} activeDay={activeDay} setActiveDay={setActiveDay} />
        </div>
        <aside className="space-y-4">
          <QuickTools />
          <BudgetTracker days={days} rate={rate} setRate={setRate} />
          <PackingChecklist checklist={checklist} setChecklist={setChecklist} />
        </aside>
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-10 text-center text-xs leading-relaxed text-slate-400">
        資料僅儲存在你的瀏覽器 (LocalStorage)・外部連結皆為官方網站・祝你福岡之旅愉快 🎌
      </footer>
    </div>
  );
}
