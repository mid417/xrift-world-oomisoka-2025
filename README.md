# 🎍 ゆっくり過ごせる場所

![XRift World](https://img.shields.io/badge/XRift-World-blue)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-v9.4-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 概要

「ゆっくり過ごせる場所」は、XRiftプラットフォームで動作するWebXRワールドです。  
大晦日から年越しの時間を、のんびりと過ごせる和風空間を表現しています。

畳の部屋に置かれたこたつ、年越しカウントダウン時計、提灯や鏡餅など、  
日本の年末年始の雰囲気を感じられる3D空間で、ゆったりとした時間をお過ごしください。

### ✨ 主な特徴

- 🏮 **和風空間**: 畳部屋、こたつ、提灯、灯篭など和のアイテムで構成
- 🎊 **年越し体験**: カウントダウン時計で新年を迎える瞬間を演出
- 🌌 **動的な空**: 時刻に応じて変化する空と星空
- 🪞 **インタラクティブ要素**: 鏡とスクリーンの切り替え機能
- 🍶 **細部へのこだわり**: お酒セット、おつまみ、鏡餅など小物も配置
- 🎨 **雰囲気ある照明**: 暖色系の照明で温かみのある空間を演出

## 🎮 体験方法

### XRiftプラットフォームで体験

1. [XRift](https://xrift.jp)にアクセス
2. ワールド「ゆっくり過ごせる場所」を検索
3. インスタンスを作成
4. VRヘッドセットまたはブラウザで入室

### ローカルで開発・プレビュー

```bash
# リポジトリのクローン
git clone <repository-url>
cd oomisoka_2025

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーが起動したら、ブラウザで http://localhost:5173 にアクセスしてください。

## 🏗️ ワールド構成

### コンポーネント一覧

| コンポーネント | 説明 |
|---------------|------|
| `TatamiRoom` | 畳の部屋（壁と床） |
| `Kotatsu` | こたつテーブル |
| `Zabuton` | 座布団（4色バリエーション） |
| `SakeSet` | お酒セット |
| `Otsumami` | おつまみ |
| `KagamiMochi` | 鏡餅 |
| `Lantern` | 提灯 |
| `Torou` | 灯篭 |
| `NewYearClock` | 年越しカウントダウン時計 |
| `DynamicSkybox` | 時刻に応じて変化する空 |
| `Stars` | 星空 |
| `EntranceSign` | 入口の案内看板 |
| `MirrorScreenButton` | 鏡/スクリーン切り替えボタン |

## 🛠️ 技術スタック

- **React**: 19.2.x
- **Three.js**: 0.182.x
- **@react-three/fiber**: 9.4.x - React向けThree.jsレンダラー
- **@react-three/rapier**: 2.2.x - 物理エンジン
- **@react-three/drei**: 10.7.x - Three.js用ヘルパーコレクション
- **@xrift/world-components**: XRift専用コンポーネント
- **TypeScript**: 5.6.x
- **Vite**: 7.3.x - ビルドツール
- **Module Federation**: 動的ローディング

## 📦 ビルドとデプロイ

### ビルド

```bash
# TypeScript型チェック
npm run typecheck

# プロダクションビルド
npm run build
```

### デプロイ

```bash
# XRiftプラットフォームへアップロード
npx @xrift/cli upload
```

または、タスクランナーから「プロダクションビルド & アップロード」を実行してください。

## 🎨 カスタマイズ

このワールドはテンプレートベースで作成されています。  
カスタマイズ方法の詳細は [TEMPLATE.md](./TEMPLATE.md) を参照してください。

### 主な設定ファイル

- `xrift.json` - ワールドのメタデータ設定
- `src/World.tsx` - メインワールドコンポーネント
- `src/constants.ts` - 色や設定の定数
- `src/components/` - 各種3Dオブジェクトコンポーネント

## 🤝 開発に参加

バグ報告や機能追加の提案は、Issueまたはプルリクエストでお願いします。

### 開発の流れ

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### コミットメッセージの形式

```
<概要>

- <詳細1>
- <詳細2>
- <詳細3>
```

## 📄 ライセンス

このプロジェクトは [MIT License](./LICENSE) の下で公開されています。

## 🔗 関連リンク

- [XRift公式サイト](https://xrift.jp)
- [XRift CLI](https://github.com/WebXR-JP/xrift-cli)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Three.js](https://threejs.org/)
- [Rapier Physics](https://rapier.rs/)

---

Made with ❤️ for XRift Platform


