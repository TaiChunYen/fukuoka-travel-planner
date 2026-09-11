import { Wallet } from "lucide-react";

export default function BudgetTracker({ days, rate, setRate }) {
  const totalJPY = days.flatMap((d) => d.items).reduce((s, it) => s + (Number(it.cost) || 0), 0);
  const totalTWD = Math.round(totalJPY * rate);

  const perDay = days.map((d) => ({
    label: d.label,
    sum: d.items.reduce((s, it) => s + (Number(it.cost) || 0), 0),
  }));
  const max = Math.max(1, ...perDay.map((d) => d.sum));

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-orange-100 sm:p-5">
      <h2 className="mb-3 flex items-center gap-1.5 text-base font-bold text-slate-800">
        <Wallet size={18} className="text-orange-500" /> 預算看板
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-800 p-3 text-white">
          <p className="text-[11px] opacity-70">總支出 (JPY)</p>
          <p className="text-xl font-black">¥{totalJPY.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-orange-500 p-3 text-white">
          <p className="text-[11px] opacity-80">約合台幣 (TWD)</p>
          <p className="text-xl font-black">NT${totalTWD.toLocaleString()}</p>
        </div>
      </div>
      <label className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-500">
        匯率 (1 JPY = ? TWD)
        <input
          type="number" step="0.001" value={rate}
          onChange={(e) => setRate(Number(e.target.value) || 0)}
          className="w-24 rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-normal text-slate-800 outline-none focus:border-orange-400"
        />
      </label>
      <div className="mt-3 space-y-1.5">
        {perDay.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <span className="w-12 shrink-0 font-bold text-slate-500">{d.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-400" style={{ width: `${Math.round((d.sum / max) * 100)}%` }} />
            </div>
            <span className="w-20 shrink-0 text-right font-mono font-bold text-slate-700">¥{d.sum.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
