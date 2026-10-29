import { useEffect, useState } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import QuickTools from "./components/QuickTools";
import Timeline from "./components/Timeline";
import DayStrip from "./components/DayStrip";
import BudgetTracker from "./components/BudgetTracker";
import PackingChecklist from "./components/PackingChecklist";
import { DEFAULT_CHECKLIST, DEFAULT_RATE, PRESET_ITINERARY } from "./components/Presets";
import { ROUTE, activeRouteStop } from "./lib/trip";

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

  const currentDay = days.find((d) => d.id === activeDay) ?? days[0];
  const currentStop = currentDay ? activeRouteStop(currentDay) : null;

  return (
    <div className="min-h-screen">
      <header className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 pb-7 pt-8 sm:px-6 sm:pb-8 sm:pt-10">
          <div className="min-w-0">
            <p className="tnum font-serif text-[12.5px] tracking-[0.16em] text-ink-soft">
              2026.11.25 — 12.06
            </p>
            <h1 className="mt-2 font-serif text-[27px] font-semibold leading-tight tracking-tight sm:text-[34px]">
              福岡自由行行程帖
            </h1>
            <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-ink-soft sm:text-[13.5px]">
              12 天 11 夜，從長崎繞過西九州，最後在博多落腳。行程自動存在這台裝置，離線也看得到。
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4 lg:mt-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            {/* 路線帶：整趟旅程的形狀，也是全頁唯一的視覺高音 */}
            <nav
              aria-label="旅程路線"
              className="no-scrollbar -mb-1 min-w-0 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,#000_92%,transparent)] lg:flex-1"
            >
              <ol className="flex min-w-max items-center">
                {ROUTE.map((stop, i) => {
                  const on = stop === currentStop;
                  return (
                    <li key={stop} className="flex items-center">
                      {i > 0 && (
                        <span aria-hidden className={"mx-1 h-px w-5 sm:w-9 " + (on ? "bg-rule-2" : "bg-rule")} />
                      )}
                      <span
                        className={
                          "flex items-center gap-1.5 whitespace-nowrap py-1 text-[12.5px] transition " +
                          (on ? "font-semibold text-ink" : "text-ink-faint")
                        }
                      >
                        <span
                          aria-hidden
                          className={
                            "h-2 w-2 rounded-full " +
                            (on ? "bg-seal ring-2 ring-seal/20" : "border border-rule-2 bg-surface")
                          }
                        />
                        {stop}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-soft transition hover:text-ink"
              >
                <RotateCcw size={13} /> 重置 12 天範本
              </button>
              <span aria-hidden className="h-3 w-px bg-rule" />
              <button
                type="button"
                onClick={clearDay}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-soft transition hover:text-seal"
              >
                <Trash2 size={13} /> 清空本日
              </button>
            </div>
          </div>
        </div>
      </header>

      <DayStrip days={days} activeDay={activeDay} setActiveDay={setActiveDay} />

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-x-10 px-4 pb-16 pt-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_286px]">
        <Timeline days={days} setDays={setDays} activeDay={activeDay} />

        <aside className="mt-12 space-y-6 lg:mt-0 lg:border-l lg:border-rule lg:pl-8">
          <QuickTools />
          <BudgetTracker days={days} rate={rate} setRate={setRate} />
          <PackingChecklist checklist={checklist} setChecklist={setChecklist} />
        </aside>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-6 text-[11.5px] text-ink-faint sm:px-6">
          <p>行程只存在這台裝置的瀏覽器，換裝置請重新輸入。</p>
          <p>外部連結皆為官方網站</p>
        </div>
      </footer>
    </div>
  );
}
