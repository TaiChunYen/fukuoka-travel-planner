import { CloudSun, ExternalLink, Landmark, MapPin, QrCode, TrainFront, Bus } from "lucide-react";

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
      { name: "Google Maps 福岡", desc: "開啟福岡市區地圖", url: "https://www.google.com/maps/search/?api=1&query=Fukuoka+Hakata", icon: MapPin, hot: false },
    ],
  },
];

export default function QuickTools() {
  return (
    <section aria-labelledby="tools-heading" className="border-t-2 border-glaze-celadon pt-4">
      <h2 id="tools-heading" className="font-serif text-base font-semibold text-glaze-celadon">
        旅途工具箱
      </h2>
      <p className="mt-0.5 text-[11.5px] text-ink-faint">一鍵跳轉官方網站</p>

      {LINKS.map((g) => (
        <div key={g.group} className="mt-4">
          <p className="text-[11px] text-ink-faint">{g.group}</p>
          <ul className="mt-1.5 border-t border-rule">
            {g.items.map((l) => (
              <li key={l.name}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2.5 border-b border-rule/70 py-2.5 transition hover:bg-wash/50"
                >
                  <l.icon
                    size={15}
                    className="shrink-0 text-ink-faint transition group-hover:text-glaze-celadon"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-1.5 text-[13px] font-medium text-ink">
                      {l.name}
                      {l.hot && (
                        <span className="border border-seal/30 px-1 text-[10px] font-normal text-seal">
                          機場必用
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-[11.5px] text-ink-faint">{l.desc}</span>
                  </span>
                  <ExternalLink
                    size={12}
                    className="shrink-0 text-rule-2 transition group-hover:text-glaze-celadon"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
