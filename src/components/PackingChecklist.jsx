import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { DEFAULT_CHECKLIST } from "./Presets";

export default function PackingChecklist({ checklist, setChecklist }) {
  const done = checklist.filter((c) => c.done).length;
  const pct = checklist.length ? Math.round((done / checklist.length) * 100) : 0;

  const toggle = (id) =>
    setChecklist((prev) => prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));

  const reset = () => setChecklist(DEFAULT_CHECKLIST);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-orange-100 sm:p-5">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">🎒 出發前清單</h2>
        <button onClick={reset} className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-orange-500">
          <RotateCcw size={12} /> 重置
        </button>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-bold text-slate-500">{done}/{checklist.length}</span>
      </div>
      <ul className="space-y-1.5">
        {checklist.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => toggle(c.id)}
              className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition ${
                c.done ? "border-emerald-100 bg-emerald-50 text-slate-400 line-through" : "border-slate-100 bg-slate-50 text-slate-700 hover:border-orange-200"
              }`}
            >
              {c.done ? <CheckCircle2 size={16} className="shrink-0 text-emerald-500" /> : <Circle size={16} className="shrink-0 text-slate-300" />}
              {c.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
