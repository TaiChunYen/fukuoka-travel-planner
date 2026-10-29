import { Check } from "lucide-react";
import { DEFAULT_CHECKLIST } from "./Presets";

export default function PackingChecklist({ checklist, setChecklist }) {
  const done = checklist.filter((c) => c.done).length;
  const total = checklist.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const toggle = (id) =>
    setChecklist((prev) => prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));

  const reset = () => setChecklist(DEFAULT_CHECKLIST);

  return (
    <section aria-labelledby="packing-heading" className="border-t-2 border-seal pt-4">
      <div className="flex items-baseline justify-between">
        <h2 id="packing-heading" className="font-serif text-base font-semibold text-seal">
          出發前清單
        </h2>
        <span className="tnum text-[11.5px] text-ink-faint">
          {done} / {total}
        </span>
      </div>

      <div className="mt-2 h-[3px] bg-wash">
        <div className="h-full bg-seal transition-all" style={{ width: `${pct}%` }} />
      </div>

      <ul className="mt-2 border-t border-rule">
        {checklist.map((c) => (
          <li key={c.id} className="border-b border-rule/70">
            <button
              type="button"
              onClick={() => toggle(c.id)}
              aria-pressed={c.done}
              className="flex w-full items-start gap-2.5 py-2.5 text-left transition hover:bg-wash/40"
            >
              <span
                aria-hidden
                className={
                  "mt-px grid h-4 w-4 shrink-0 place-items-center border " +
                  (c.done ? "border-seal/40 bg-seal/5" : "border-rule-2 bg-surface")
                }
              >
                {c.done && <Check size={11} strokeWidth={3} className="text-seal" />}
              </span>
              <span
                className={
                  "text-[12.5px] leading-snug " +
                  (c.done
                    ? "text-ink-faint line-through decoration-seal/50"
                    : "text-ink-soft")
                }
              >
                {c.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={reset}
        className="mt-2 text-[11px] text-ink-faint transition hover:text-seal"
      >
        還原清單
      </button>
    </section>
  );
}
