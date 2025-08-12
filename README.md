# CashMemo - シンプルな資産管理アプリ

<a alt="CashMemo logo" href="https://books-frontend-mu-eight.vercel.app" target="_blank" rel="noreferrer"><img src="https://books-frontend-mu-eight.vercel.app/icons/icon-72x72.png" width="45"></a>

家計簿機能を持つシンプルな資産管理PWAアプリケーションです。収入・支出の記録、カテゴリ管理、月別・年別のサマリー表示が可能です。

## 🚀 技術スタック

### Frontend (Next.js PWA)

- **Framework**: Next.js 15.2.4
- **UI**: React 19.0.0, TypeScript
- **スタイリング**: Tailwind CSS
- **認証**: NextAuth.js
- **PWA**: next-pwa
- **フォーム**: react-hook-form
- **グラフ**: recharts
- **アイコン**: @tabler/icons-react

### Backend (NestJS API)

- **Framework**: NestJS 11.0.0
- **言語**: TypeScript
- **ORM**: Prisma 6.11.1
- **データベース**: PostgreSQL
- **バリデーション**: class-validator, class-transformer

## 📁 プロジェクト構成

```
books/
├── apps/
│   ├── frontend/          # Next.js PWAアプリケーション
│   └── backend/           # NestJS APIサーバー
├── libs/
│   ├── prisma/           # Prismaクライアント共有ライブラリ
│   └── shared-types/     # 型定義共有ライブラリ
├── nx.json               # Nx設定
├── package.json          # ルートパッケージ設定
├── nixpacks.toml         # バックエンドデプロイ設定
└── vercel.json           # フロントエンドデプロイ設定
```

## 🛠 セットアップ

### 前提条件

- Node.js 20.x
- PostgreSQL
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# Prismaクライアントの生成
npm run prisma:generate

# データベースのセットアップ
npm run prisma:push
```

### 環境変数

`.env`ファイルを作成し、以下の環境変数を設定してください：

```env
# データベース
DATABASE_URL="postgresql://user:password@localhost:5432/cashmemo"
DIRECT_URL="postgresql://user:password@localhost:5432/cashmemo"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

## 💻 開発

### 開発サーバーの起動

```bash
# Frontend (localhost:4200)
npx nx dev frontend

# Backend (localhost:3000)
npx nx serve backend

# 両方同時に起動
npx nx run-many --target=serve --projects=frontend,backend
```

### ビルド

```bash
# Frontend
npx nx build frontend

# Backend
npx nx build backend

# 全てビルド
npx nx run-many --target=build --all
```

### リント

```bash
# リント実行
npx nx lint frontend
npx nx lint backend

# フォーマット
npm run format
```

## 📊 主な機能

### API エンドポイント

- **認証**: `/auth` - ユーザー登録、ログイン
- **カテゴリ管理**: `/category` - カテゴリのCRUD操作
- **入出金記録**: `/entries` - 収入・支出の記録管理
- **サマリー**: `/summary` - 月別・年別の集計データ

### データモデル

- **User**: ユーザー情報（ID、名前、メール、パスワード）
- **Category**: カテゴリ（名前、タイプ[収入/支出]、色、ユーザー紐付け）
- **Entry**: 入出金記録（金額、日付、メモ、タイプ、カテゴリ、ユーザー紐付け）

## 🚀 デプロイ

### Frontend (Vercel)

```bash
# Vercelへのデプロイ
vercel
```

### Backend (Railway/Render等)

Nixpacksを使用してデプロイ可能です。`nixpacks.toml`に設定が含まれています。

## 📝 その他のコマンド

```bash
# Prismaマイグレーション
npm run prisma:migrate

# Prismaリセット
npm run prisma:reset

# 依存関係グラフの表示
npx nx graph

# 影響を受けるプロジェクトの確認
npx nx affected:graph
```

## 📚 参考リンク

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
