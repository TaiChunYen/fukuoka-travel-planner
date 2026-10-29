export default function BudgetTracker({ days, rate, setRate }) {
  const totalJPY = days.flatMap((d) => d.items).reduce((s, it) => s + (Number(it.cost) || 0), 0);
  const totalTWD = Math.round(totalJPY * rate);

  const perDay = days.map((d, i) => ({
    label: "D" + String(i + 1).padStart(2, "0"),
    sum: d.items.reduce((s, it) => s + (Number(it.cost) || 0), 0),
  }));
  const max = Math.max(1, ...perDay.map((d) => d.sum));

  return (
    <section aria-labelledby="budget-heading" className="border-t-2 border-glaze-brass pt-4">
      <h2 id="budget-heading" className="font-serif text-base font-semibold text-glaze-brass">
        預算
      </h2>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="tnum font-serif text-[26px] font-semibold leading-none text-ink">
          ¥{totalJPY.toLocaleString()}
        </span>
        <span className="text-[11px] text-glaze-brass">JPY</span>
      </div>
      <p className="tnum mt-1 text-[12.5px] text-ink-soft">約 NT${totalTWD.toLocaleString()}</p>

      <label className="mt-3 flex items-center justify-between gap-2 border-y border-rule py-2 text-[11.5px] text-ink-faint">
        <span>匯率 1 JPY =</span>
        <span className="flex items-baseline gap-1">
          <input
            type="number"
            step="0.001"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            aria-label="日圓兌台幣匯率"
            className="tnum w-14 border-0 border-b border-rule bg-transparent px-0 py-0.5 text-right text-[12.5px] text-ink outline-none transition focus:border-glaze-brass"
          />
          <span>TWD</span>
        </span>
      </label>

      <ul className="mt-3 space-y-[7px]">
        {perDay.map((d) => (
          <li key={d.label} className="grid grid-cols-[1.9rem_minmax(0,1fr)_3.6rem] items-center gap-2">
            <span className="tnum text-[10.5px] text-ink-faint">{d.label}</span>
            <span className="h-[3px] bg-brass-wash">
              <span
                className="block h-full bg-glaze-brass"
                style={{ width: `${Math.round((d.sum / max) * 100)}%` }}
              />
            </span>
            <span className="tnum text-right text-[11.5px] text-ink-soft">
              ¥{d.sum.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">只統計行程中填了花費的項目。</p>
    </section>
  );
}
