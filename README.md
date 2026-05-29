# my-lp

河西玄太の自己紹介ランディングページです。

## 技術スタック

| 用途 | ライブラリ / ツール |
|---|---|
| UIフレームワーク | React 18 |
| ビルドツール | Vite 5 |
| スタイリング | Tailwind CSS 3 |
| アニメーション | GSAP 3 + ScrollTrigger |

### アニメーション方針

- **スクロール連動**：`ScrollTrigger` の `scrub` オプションで進捗に追従させる
- **CSS sticky + GSAP**：`pin: true` は使わず `position: sticky` で要素を固定し、GSAP は `y` 座標の更新だけに専念させる（スペーサー二重挿入の問題を回避）
- **ループカルーセル**：画像を3セット複製し、スクロール進捗に合わせて `y` を動かすことで無限ループの錯覚を作る

---

## ディレクトリ構成

```
my-lp/
├── public/              # 画像素材（背景・写真・スクリーンショット）
├── src/
│   ├── components/
│   │   ├── Hero.jsx         # ヒーローセクション
│   │   ├── WhoIAm.jsx       # プロフィール・スキル
│   │   ├── History.jsx      # タイムライン
│   │   ├── MyProject.jsx    # 制作物紹介（デスクトップ / モバイル分岐）
│   │   ├── MyCreeds.jsx     # 信条3つ（各Creedコンポーネントを呼び出す）
│   │   ├── FirstCreed.jsx   # 信条1（日本三國）
│   │   ├── SecondCreed.jsx  # 信条2（キングダム）
│   │   ├── ThirdCreed.jsx   # 信条3（ルックバック）
│   │   └── MyVision.jsx     # ビジョン
│   ├── App.jsx          # セクションを並べるルートコンポーネント
│   ├── main.jsx         # エントリーポイント
│   └── index.css        # グローバルスタイル（Tailwind指令）
├── index.html
├── vite.config.js       # base: '/my-lp/' を設定
├── tailwind.config.js
└── postcss.config.js
```

---

## レスポンシブ対応

`MyProject` セクションはデスクトップとモバイルで実装を完全に分けています。

- **デスクトップ（md以上）**：スクロール連動ループカルーセル（GSAP）
- **モバイル（md未満）**：スワイプ対応カルーセル（`touchstart / touchmove / touchend` をネイティブイベントで実装）

---

## デプロイ

GitHub Pages に `dist/` をそのまま公開する構成です。
