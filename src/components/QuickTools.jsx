import { CloudSun, ExternalLink, Landmark, QrCode, TrainFront, Bus, Ship } from "lucide-react";

const LINKS = [
  {
    group: "出入境必備",
    items: [
      { name: "Visit Japan Web", desc: "入境 / 海關 QR Code", url: "https://www.vjw.digital.go.jp/", icon: QrCode, hot: true },
      { name: "日本氣象廳・福岡", desc: "tenki.jp 即時天氣", url: "https://tenki.jp/forecast/9/43/", icon: CloudSun, hot: false },
    ],
  },
  {
    group: "福岡・九州交通",
    items: [
      { name: "福岡市地下鐵", desc: "機場線・路線圖・一日券", url: "https://subway.city.fukuoka.lg.jp/cha/", icon: TrainFront, hot: false },
      { name: "西鐵 Nishitetsu", desc: "天神→太宰府・柳川", url: "https://www.nishitetsu.co.jp/zh_tw/", icon: Bus, hot: false },
      { name: "JR 九州", desc: "Pass・由布院之森劃位", url: "https://www.jrkyushu.co.jp/chinese/", icon: TrainFront, hot: false },
      { name: "Yahoo! 乘換案內", desc: "查班次・月台・票價", url: "https://transit.yahoo.co.jp/", icon: Landmark, hot: false },
    ],
  },
  {
    group: "實用工具",
    items: [
      { name: "Google Maps 福岡", desc: "開啟福岡市區地圖", url: "https://www.google.com/maps/search/?api=1&query=Fukuoka+Hakata", icon: Ship, hot: false },
    ],
  },
];

export default function QuickTools() {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-orange-100 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">🧭 旅途工具箱 <span className="ml-1 text-xs font-normal text-slate-400">一鍵跳轉官方網站</span></h2>
      </div>
      {LINKS.map((g) => (
        <div key={g.group} className="mb-3 last:mb-0">
          <p className="mb-2 text-xs font-semibold tracking-wide text-orange-500">{g.group}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {g.items.map((l) => (
              <a
                key={l.name}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-center gap-3 rounded-xl border p-3 transition hover:-translate-y-0.5 hover:shadow-md ${
                  l.hot ? "border-red-200 bg-red-50 hover:border-red-300" : "border-slate-100 bg-slate-50 hover:border-orange-200 hover:bg-orange-50"
                }`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${l.hot ? "bg-red-500 text-white" : "bg-white text-orange-500 shadow-sm"}`}>
                  <l.icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-sm font-bold text-slate-800">
                    {l.name}
                    {l.hot && <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] leading-none text-white">機場必用</span>}
                  </span>
                  <span className="block truncate text-xs text-slate-500">{l.desc}</span>
                </span>
                <ExternalLink size={14} className="shrink-0 text-slate-300 transition group-hover:text-orange-500" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
