// 經典「福岡 5 天 4 夜」預載行程範本
// 每個節點: time, title, category, address, cost (JPY), note

export const DEFAULT_RATE = 0.21; // 預設 TWD/JPY 匯率 *需確認

export const PRESET_ITINERARY = [
  {
    id: "day-1",
    label: "Day 1",
    subtitle: "博多市區・抵達",
    items: [
      { id: "d1-1", time: "12:00", title: "福岡機場 (FUK)", category: "交通", address: "福岡機場", cost: 0, note: "國際線→國內線接駁巴士約10分鐘，記得先開 VJW QR Code" },
      { id: "d1-2", time: "13:30", title: "博多車站・Check-in / 寄放行李", category: "住宿", address: "博多駅", cost: 0, note: "車站內阪急、AMU PLAZA 可先逛" },
      { id: "d1-3", time: "15:00", title: "博多運河城 (Canal City)", category: "購物", address: "Canal City Hakata", cost: 5000, note: "整點水舞秀＋拉麵競技場" },
      { id: "d1-4", time: "18:30", title: "中洲川端屋台街", category: "美食", address: "中洲屋台街 福岡", cost: 2500, note: "必吃博多拉麵、串燒牛腸鍋" },
    ],
  },
  {
    id: "day-2",
    label: "Day 2",
    subtitle: "太宰府・天神",
    items: [
      { id: "d2-1", time: "09:00", title: "西鐵天神站 → 太宰府", category: "交通", address: "西鉄福岡（天神）駅", cost: 420, note: "搭旅人列車，約30分鐘" },
      { id: "d2-2", time: "10:00", title: "太宰府天滿宮", category: "景點", address: "太宰府天満宮", cost: 0, note: "表參道必吃現烤梅枝餅" },
      { id: "d2-3", time: "13:00", title: "九州國立博物館 (可選)", category: "景點", address: "九州国立博物館", cost: 700, note: "彩虹隧道步行前往" },
      { id: "d2-4", time: "16:00", title: "天神地下街購物", category: "購物", address: "天神地下街", cost: 8000, note: "藥妝、服飾一次買齊" },
      { id: "d2-5", time: "19:00", title: "牛腸鍋晚餐 (もつ鍋)", category: "美食", address: "博多もつ鍋 天神", cost: 2000, note: "樂天地・田しゅう人氣店" },
    ],
  },
  {
    id: "day-3",
    label: "Day 3",
    subtitle: "由布院溫泉一日遊",
    items: [
      { id: "d3-1", time: "08:00", title: "博多站搭 JR 由布院之森", category: "交通", address: "博多駅 JR", cost: 5000, note: "需事先在 JR 九州官網劃位！" },
      { id: "d3-2", time: "10:30", title: "由布院小鎮散策", category: "景點", address: "由布院", cost: 1500, note: "B-speak 蛋糕捲、可樂餅" },
      { id: "d3-3", time: "12:30", title: "金鱗湖", category: "景點", address: "金鱗湖", cost: 0, note: "清晨有霧氣最美" },
      { id: "d3-4", time: "17:00", title: "返回博多・拉麵晚餐", category: "美食", address: "博多一蘭本社総本店", cost: 1200, note: "一蘭發源店朝聖" },
    ],
  },
  {
    id: "day-4",
    label: "Day 4",
    subtitle: "系島・福岡塔",
    items: [
      { id: "d4-1", time: "09:30", title: "櫻井二見浦夫婦岩", category: "景點", address: "桜井二見ヶ浦", cost: 1000, note: "海上鳥居＋白色鳥居，系島代表景點" },
      { id: "d4-2", time: "13:00", title: "系島海鮮午餐", category: "美食", address: "糸島 海鮮", cost: 1800, note: "牡蠣小屋 (冬季限定)" },
      { id: "d4-3", time: "17:30", title: "福岡塔夜景", category: "景點", address: "福岡タワー", cost: 800, note: "百道海濱夕陽＋夜景" },
      { id: "d4-4", time: "19:30", title: "明太子飯晚餐", category: "美食", address: "元祖博多めんたい重", cost: 1800, note: "天神名店，建議先抽號碼牌" },
    ],
  },
  {
    id: "day-5",
    label: "Day 5",
    subtitle: "採買・回程",
    items: [
      { id: "d5-1", time: "09:00", title: "大濠公園散步", category: "景點", address: "大濠公園", cost: 0, note: "最後的福岡早晨" },
      { id: "d5-2", time: "11:00", title: "博多車站伴手禮採購", category: "購物", address: "博多駅 マイング", cost: 6000, note: "明太子、博多通饅頭、薯條三兄弟" },
      { id: "d5-3", time: "14:00", title: "福岡機場 → 回家", category: "交通", address: "福岡機場國際線", cost: 260, note: "地鐵機場線約5分鐘到博多，提早2小時到" },
    ],
  },
];

export const DEFAULT_CHECKLIST = [
  { id: "c1", label: "護照 (效期 6 個月以上)", done: false },
  { id: "c2", label: "Visit Japan Web QR Code 截圖", done: false },
  { id: "c3", label: "日幣現金＋信用卡", done: false },
  { id: "c4", label: "eSIM / Wi-Fi 機", done: false },
  { id: "c5", label: "JR 九州 Pass / 地鐵一日券", done: false },
  { id: "c6", label: "轉接插頭＋行動電源", done: false },
  { id: "c7", label: "保暖衣物 (視季節)", done: false },
  { id: "c8", label: "伴手禮清單＋免稅優惠券", done: false },
];

export const CATEGORIES = ["景點", "美食", "交通", "購物", "住宿", "其他"];

// Google Maps 跳轉: 優先用地址，否則用標題
export function mapsUrl(item) {
  const q = encodeURIComponent(item.address || item.title);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
