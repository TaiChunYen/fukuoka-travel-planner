// 旅程骨架：路線帶上的落腳點（依時間順序）
export const ROUTE = [
  "長崎",
  "佐世保",
  "豪斯登堡",
  "博多",
  "熊本",
  "由布院",
  "小倉",
  "太宰府",
  "門司港",
];

// subtitle 裡的「抵達 / 移動 / 回程 / 自由時間」不是地名
const GENERIC = /抵達|移動|回程|自由/;
const SLOT_PREFIX = /^(整天|上午|下午|晚上|中午)/;

/** 從 day.subtitle（例：11/26（四）・長崎市區）取出當日地點 */
export function dayPlace(day) {
  const parts = (day?.subtitle ?? "")
    .split("・")
    .map((s) => s.trim())
    .filter(Boolean);
  const body = parts.slice(1).map((s) => s.replace(SLOT_PREFIX, ""));
  const meaningful = body.filter((p) => !GENERIC.test(p));
  return meaningful.at(-1) ?? body.at(-1) ?? "";
}

/** 當日所在的路線帶站點；比對不到回傳 null（例：回程日） */
export function activeRouteStop(day) {
  const place = dayPlace(day);
  let best = null;
  let bestIndex = -1;
  for (const stop of ROUTE) {
    const i = place.lastIndexOf(stop);
    if (i > bestIndex) {
      bestIndex = i;
      best = stop;
    }
  }
  return bestIndex >= 0 ? best : null;
}

/** 日籤上顯示的短地名 */
export function tabPlace(day) {
  return activeRouteStop(day) ?? dayPlace(day);
}
