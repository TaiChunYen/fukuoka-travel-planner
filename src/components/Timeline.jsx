import { useState } from "react";
import { ArrowDown, ArrowUp, Clock, ExternalLink, Navigation, Pencil, Plus, Trash2, X } from "lucide-react";
import { CATEGORIES, mapsUrl } from "./Presets";

// 分類＝鐵道線色：圓點與類別小字用同一色，其餘文字維持墨藍
const CAT_STYLE = {
  景點: { dot: "bg-cat-sight", hollow: "border-cat-sight", text: "text-cat-sight" },
  美食: { dot: "bg-cat-food", hollow: "border-cat-food", text: "text-cat-food" },
  交通: { dot: "bg-cat-transit", hollow: "border-cat-transit", text: "text-cat-transit" },
  購物: { dot: "bg-cat-shop", hollow: "border-cat-shop", text: "text-cat-shop" },
  住宿: { dot: "bg-cat-stay", hollow: "border-cat-stay", text: "text-cat-stay" },
  其他: { dot: "bg-cat-other", hollow: "border-cat-other", text: "text-cat-other" },
};

const EMPTY = { time: "", title: "", category: "景點", address: "", cost: "", note: "", slot: "", timetables: [] };

const WEEKDAY = ["日", "一", "二", "三", "四", "五", "六"];

const LABEL = "block text-[11px] font-medium text-ink-faint";
const INPUT =
  "mt-1 w-full border-0 border-b border-rule bg-transparent px-0 py-1.5 text-[13.5px] text-ink outline-none transition placeholder:text-ink-faint focus:border-indigo";

function formatDateLabel(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.getMonth() + 1 + "/" + d.getDate() + "（" + WEEKDAY[d.getDay()] + "）";
}

function weekdayType(dateStr) {
  if (!dateStr) return "";
  const w = new Date(dateStr + "T00:00:00").getDay();
  return w === 0 || w === 6 ? "土日祝" : "平日";
}

function IconButton({ onClick, label, danger = false, disabled = false, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={
        "grid h-7 w-7 place-items-center rounded-[4px] text-ink-faint transition hover:bg-wash disabled:opacity-25 disabled:hover:bg-transparent " +
        (danger ? "hover:text-seal" : "hover:text-ink")
      }
    >
      {children}
    </button>
  );
}

export default function Timeline({ days, setDays, activeDay }) {
  const [editing, setEditing] = useState(null); // item id or "new"
  const [form, setForm] = useState(EMPTY);

  const day = days.find((d) => d.id === activeDay) ?? days[0];
  if (!day) return null;

  const dayIndex = days.findIndex((d) => d.id === day.id);
  const moves = day.items.filter((it) => it.category === "交通").length;
  const dayCost = day.items.reduce((s, it) => s + (Number(it.cost) || 0), 0);

  const updateDayItems = (dayId, items) =>
    setDays((prev) => prev.map((d) => (d.id === dayId ? { ...d, items } : d)));

  const startNew = () => {
    setForm(EMPTY);
    setEditing("new");
  };

  const startEdit = (item) => {
    setForm({
      ...item,
      cost: item.cost ?? "",
      slot: item.slot ?? "",
      timetables: item.timetables ?? [],
    });
    setEditing(item.id);
  };

  const saveForm = () => {
    if (!form.title.trim()) return;
    const payload = {
      ...form,
      id: editing === "new" ? "u-" + Date.now() : editing,
      cost: Number(form.cost) || 0,
    };
    if (editing === "new") {
      updateDayItems(day.id, [...day.items, payload]);
    } else {
      updateDayItems(day.id, day.items.map((it) => (it.id === editing ? payload : it)));
    }
    setEditing(null);
    setForm(EMPTY);
  };

  const removeItem = (id) => updateDayItems(day.id, day.items.filter((it) => it.id !== id));

  const move = (index, dir) => {
    const next = [...day.items];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    updateDayItems(day.id, next);
  };

  return (
    <section aria-label="行程表" className="min-w-0">
      {/* 當日標頭 */}
      <div>
        <div className="flex items-baseline justify-between gap-3 border-b-2 border-glaze-blue pb-2">
          <h2 className="flex items-baseline gap-2 font-serif">
            <span className="text-[19px] font-semibold sm:text-[21px]">Day {dayIndex + 1}</span>
            <span className="tnum text-[13px] text-ink-soft">{formatDateLabel(day.date)}</span>
          </h2>
          {day.date && <span className="text-[11px] text-ink-faint">{weekdayType(day.date)}</span>}
        </div>
        <p className="tnum mt-2 text-[11.5px] text-ink-faint">
          {day.items.length} 個行程
          {moves > 0 && `・${moves} 段移動`}
          {dayCost > 0 && `・¥${dayCost.toLocaleString()}`}
        </p>
      </div>

      {/* 時刻表式行程列 */}
      {day.items.length === 0 ? (
        <div className="mt-6 border-y border-dashed border-rule-2 px-4 py-10 text-center">
          <p className="text-[13px] text-ink-soft">這天還沒有行程</p>
          <button
            type="button"
            onClick={startNew}
            className="mt-2 text-[12.5px] font-medium text-indigo underline decoration-rule-2 underline-offset-4 transition hover:text-indigo-deep hover:decoration-indigo"
          >
            新增第一個行程
          </button>
        </div>
      ) : (
        <ol className="mt-1">
          {day.items.map((it, idx) => {
            const isTransit = it.category === "交通";
            const hasTime = Boolean(it.time);
            const cat = CAT_STYLE[it.category] ?? CAT_STYLE["其他"];
            const [timeStart, timeEnd] = String(it.time || "")
              .split(/[-–~]/)
              .map((s) => s.trim());
            return (
              <li
                key={it.id}
                className="group grid grid-cols-[3.2rem_1.1rem_minmax(0,1fr)] gap-x-3 border-b border-rule/80 py-3.5 last:border-b-0 sm:grid-cols-[4.2rem_1.1rem_minmax(0,1fr)] sm:gap-x-4"
              >
                {/* 時間欄 */}
                <div className="pt-px text-right">
                  {hasTime ? (
                    <>
                      <p className="tnum text-[12.5px] font-medium leading-snug text-ink">{timeStart}</p>
                      {timeEnd && (
                        <p className="tnum text-[12.5px] font-normal leading-snug text-ink-faint">
                          – {timeEnd}
                        </p>
                      )}
                      {it.slot && <p className="mt-0.5 text-[10.5px] text-ink-faint">{it.slot}</p>}
                    </>
                  ) : (
                    <p className="text-[12px] leading-snug text-ink-soft">{it.slot || "—"}</p>
                  )}
                </div>

                {/* 路線：實線＝停留、虛線＝移動；實心點＝時間確定 */}
                <div className="relative flex justify-center">
                  <span
                    aria-hidden
                    className={
                      "absolute inset-y-0 left-1/2 -translate-x-1/2 " +
                      (isTransit ? "border-l border-dashed border-rule-2" : "w-px bg-rule-2")
                    }
                  />
                  <span
                    aria-hidden
                    className={
                      "relative mt-1 block h-2 w-2 rounded-full ring-4 ring-paper " +
                      (hasTime ? cat.dot : "border bg-surface " + cat.hollow)
                    }
                  />
                </div>

                {/* 內容 */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={"text-[10.5px] font-medium " + cat.text}>{it.category}</span>
                    {Number(it.cost) > 0 && (
                      <span className="tnum ml-auto pl-3 text-[12.5px] font-medium text-ink">
                        ¥{Number(it.cost).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1 text-[15px] font-medium leading-snug text-ink">{it.title}</h3>
                  {it.note && (
                    <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{it.note}</p>
                  )}

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <a
                      href={mapsUrl(it)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-[3px] bg-wash px-2 py-1 text-[12px] font-medium text-indigo transition hover:bg-[#dbe4ef]"
                    >
                      <Navigation size={11} /> 導航
                    </a>

                    {isTransit &&
                      (it.timetables ?? []).map((tt, ti) => (
                        <a
                          key={ti}
                          href={tt.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-[3px] border border-rule px-2 py-1 text-[11px] text-ink-soft transition hover:border-indigo hover:text-indigo"
                        >
                          <Clock size={10} /> {tt.label}
                          {tt.type === "search" && <ExternalLink size={9} className="opacity-60" />}
                        </a>
                      ))}

                    <div className="ml-auto flex items-center gap-0.5 transition lg:border-l lg:border-rule lg:pl-2 lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
                      <IconButton onClick={() => startEdit(it)} label="編輯行程">
                        <Pencil size={13} />
                      </IconButton>
                      <IconButton onClick={() => move(idx, -1)} disabled={idx === 0} label="上移">
                        <ArrowUp size={13} />
                      </IconButton>
                      <IconButton
                        onClick={() => move(idx, 1)}
                        disabled={idx === day.items.length - 1}
                        label="下移"
                      >
                        <ArrowDown size={13} />
                      </IconButton>
                      <IconButton onClick={() => removeItem(it.id)} label="刪除行程" danger>
                        <Trash2 size={13} />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {day.items.length > 0 && (
        <button
          type="button"
          onClick={startNew}
          className="mt-4 flex w-full items-center justify-center gap-1.5 border border-dashed border-rule-2 py-3 text-[12.5px] font-medium text-ink-soft transition hover:border-indigo hover:text-indigo"
        >
          <Plus size={14} /> 新增行程
        </button>
      )}

      {/* 新增 / 編輯：手機底部抽屜，桌機居中 */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-[2px] sm:items-center sm:p-6"
          onClick={() => setEditing(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="trip-dialog-title"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-md overflow-y-auto border-t-2 border-seal bg-surface px-5 pb-6 pt-5 sm:border sm:border-rule"
          >
            <div className="mb-4 flex items-start justify-between gap-3 border-b border-rule pb-3">
              <h3 id="trip-dialog-title" className="font-serif text-[16px] font-semibold">
                {editing === "new" ? "新增行程" : "編輯行程"}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="關閉"
                className="-mr-1 -mt-1 grid h-8 w-8 place-items-center rounded-[4px] text-ink-faint transition hover:bg-wash hover:text-ink"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <label className={LABEL}>
                  時間
                  <input
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    placeholder="10:00"
                    className={INPUT + " tnum"}
                  />
                </label>
                <label className={LABEL}>
                  類型
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={INPUT}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className={LABEL}>
                景點 / 餐廳名稱 *
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="例：太宰府天滿宮"
                  className={INPUT}
                />
              </label>

              <label className={LABEL}>
                地址（用於 Google Maps 導航）
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="例：太宰府天満宮（留空則用名稱搜尋）"
                  className={INPUT}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className={LABEL}>
                  時段（無具體時間時顯示）
                  <select
                    value={form.slot}
                    onChange={(e) => setForm({ ...form, slot: e.target.value })}
                    className={INPUT}
                  >
                    <option value="">無</option>
                    <option value="上午">上午</option>
                    <option value="下午">下午</option>
                    <option value="晚上">晚上</option>
                  </select>
                </label>
                <label className={LABEL}>
                  花費（JPY ¥）
                  <input
                    type="number"
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                    placeholder="0"
                    className={INPUT + " tnum"}
                  />
                </label>
              </div>

              <label className={LABEL}>
                備忘
                <input
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="必吃梅枝餅"
                  className={INPUT}
                />
              </label>

              <button
                type="button"
                onClick={saveForm}
                disabled={!form.title.trim()}
                className="mt-1 w-full bg-seal py-2.5 text-[13.5px] font-medium text-white transition hover:bg-[#a8341f] disabled:opacity-35 disabled:hover:bg-seal"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
