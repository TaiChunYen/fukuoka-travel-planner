import { useState } from "react";
import { ArrowDown, ArrowUp, Navigation, Pencil, Plus, Trash2, X } from "lucide-react";
import { CATEGORIES, mapsUrl } from "./Presets";

const CATEGORY_COLOR = {
  景點: "bg-sky-100 text-sky-700",
  美食: "bg-orange-100 text-orange-700",
  交通: "bg-violet-100 text-violet-700",
  購物: "bg-pink-100 text-pink-700",
  住宿: "bg-emerald-100 text-emerald-700",
  其他: "bg-slate-100 text-slate-600",
};

const EMPTY = { time: "", title: "", category: "景點", address: "", cost: "", note: "" };

export default function Timeline({ days, setDays, activeDay, setActiveDay }) {
  const [editing, setEditing] = useState(null); // item id or "new"
  const [form, setForm] = useState(EMPTY);

  const day = days.find((d) => d.id === activeDay) ?? days[0];
  if (!day) return null;

  const updateDayItems = (dayId, items) =>
    setDays((prev) => prev.map((d) => (d.id === dayId ? { ...d, items } : d)));

  const startNew = () => {
    setForm(EMPTY);
    setEditing("new");
  };

  const startEdit = (item) => {
    setForm({ ...item, cost: item.cost ?? "" });
    setEditing(item.id);
  };

  const saveForm = () => {
    if (!form.title.trim()) return;
    const payload = {
      ...form,
      id: editing === "new" ? `u-${Date.now()}` : editing,
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
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-orange-100 sm:p-5">
      {/* 天數 Tabs */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {days.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveDay(d.id)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${
              d.id === day.id ? "bg-red-500 text-white shadow" : "bg-slate-100 text-slate-500 hover:bg-orange-100"
            }`}
          >
            {d.label}
            <span className="ml-1 hidden text-xs font-normal opacity-80 sm:inline">{d.subtitle}</span>
          </button>
        ))}
      </div>

      <h2 className="mb-1 text-base font-bold text-slate-800">{day.label}・{day.subtitle}</h2>
      <p className="mb-4 text-xs text-slate-400">共 {day.items.length} 個行程・點擊 🧭 直接開啟 Google Maps 導航</p>

      {/* 時間軸 */}
      <ol className="relative space-y-3 border-l-2 border-orange-100 pl-0 sm:pl-2">
        {day.items.map((it, idx) => (
          <li key={it.id} className="relative ml-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
            <span className="absolute -left-[25px] top-4 h-3 w-3 rounded-full bg-orange-400 ring-4 ring-orange-100 sm:-left-[23px]" />
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-xs font-bold text-white">{it.time || "--:--"}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${CATEGORY_COLOR[it.category] ?? CATEGORY_COLOR["其他"]}`}>{it.category}</span>
                  {it.cost > 0 && <span className="text-xs font-bold text-orange-600">¥{Number(it.cost).toLocaleString()}</span>}
                </div>
                <p className="mt-1 truncate text-sm font-bold text-slate-800">{it.title}</p>
                {it.note && <p className="mt-0.5 text-xs leading-relaxed text-slate-500">💡 {it.note}</p>}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <a
                href={mapsUrl(it)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-sky-500 px-2.5 py-1 text-xs font-bold text-white transition hover:bg-sky-600"
              >
                <Navigation size={12} /> 導航
              </a>
              <button onClick={() => startEdit(it)} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100">
                <Pencil size={12} /> 編輯
              </button>
              <button onClick={() => move(idx, -1)} disabled={idx === 0} className="rounded-lg bg-white p-1.5 text-slate-500 shadow-sm ring-1 ring-slate-200 disabled:opacity-30">
                <ArrowUp size={12} />
              </button>
              <button onClick={() => move(idx, 1)} disabled={idx === day.items.length - 1} className="rounded-lg bg-white p-1.5 text-slate-500 shadow-sm ring-1 ring-slate-200 disabled:opacity-30">
                <ArrowDown size={12} />
              </button>
              <button onClick={() => removeItem(it.id)} className="ml-auto rounded-lg bg-white p-1.5 text-red-400 shadow-sm ring-1 ring-slate-200 hover:bg-red-50">
                <Trash2 size={12} />
              </button>
            </div>
          </li>
        ))}
      </ol>

      <button onClick={startNew} className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/50 py-2.5 text-sm font-bold text-orange-600 transition hover:bg-orange-50">
        <Plus size={16} /> 新增行程
      </button>

      {/* 新增 / 編輯表單 */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-md rounded-t-2xl bg-white p-5 sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">{editing === "new" ? "新增行程" : "編輯行程"}</h3>
              <button onClick={() => setEditing(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
            </div>
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs font-bold text-slate-500">時間
                  <input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="10:00" className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-normal text-slate-800 outline-none focus:border-orange-400" />
                </label>
                <label className="text-xs font-bold text-slate-500">類型
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-normal text-slate-800 outline-none focus:border-orange-400">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
              </div>
              <label className="block text-xs font-bold text-slate-500">景點 / 餐廳名稱 *
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="例：太宰府天滿宮" className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-normal text-slate-800 outline-none focus:border-orange-400" />
              </label>
              <label className="block text-xs font-bold text-slate-500">地址 (用於 Google Maps 導航)
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="例：太宰府天満宮（留空則用名稱搜尋）" className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-normal text-slate-800 outline-none focus:border-orange-400" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs font-bold text-slate-500">花費 (JPY ¥)
                  <input type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} placeholder="0" className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-normal text-slate-800 outline-none focus:border-orange-400" />
                </label>
                <label className="text-xs font-bold text-slate-500">備忘
                  <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="必吃梅枝餅" className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-normal text-slate-800 outline-none focus:border-orange-400" />
                </label>
              </div>
              <button onClick={saveForm} disabled={!form.title.trim()} className="w-full rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-40">
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
