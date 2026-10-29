import { tabPlace } from "../lib/trip";

function shortDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.getMonth() + 1 + "/" + d.getDate();
}

/** 日籤緞帶：橫跨整頁、吸頂，滑到哪一天都看得到 */
export default function DayStrip({ days, activeDay, setActiveDay }) {
  return (
    <div className="sticky top-0 z-30 border-y border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="no-scrollbar flex overflow-x-auto [mask-image:linear-gradient(to_right,#000_92%,transparent)]">
          {days.map((d, i) => {
            const on = d.id === activeDay;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDay(d.id)}
                aria-current={on ? "true" : undefined}
                className={
                  "relative shrink-0 border-r border-rule/70 px-3.5 py-2.5 text-left transition first:border-l sm:px-4 " +
                  (on ? "bg-surface" : "hover:bg-wash/60")
                }
              >
                <span
                  className={
                    "tnum block text-[10px] tracking-[0.16em] " + (on ? "text-seal" : "text-ink-faint")
                  }
                >
                  D{String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={
                    "tnum mt-0.5 block text-[13px] font-semibold " + (on ? "text-ink" : "text-ink-soft")
                  }
                >
                  {shortDate(d.date) || `D${i + 1}`}
                </span>
                <span
                  className={
                    "mt-0.5 block max-w-[6.5rem] truncate text-[11px] " +
                    (on ? "text-ink-soft" : "text-ink-faint")
                  }
                >
                  {tabPlace(d)}
                </span>
                {on && <span aria-hidden className="absolute inset-x-0 -bottom-px h-[2px] bg-seal" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
