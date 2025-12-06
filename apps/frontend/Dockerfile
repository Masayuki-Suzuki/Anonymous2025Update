# apps/frontend/Dockerfile
# Next.js (monorepo + Yarn v4) production build & run

FROM node:24-slim AS base
WORKDIR /app
ENV NODE_ENV=production
# git は monorepo で依存解決に使う可能性があるため入れておく
RUN apt-get update && apt-get install -y --no-install-recommends git ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && corepack enable && corepack prepare yarn@4 --activate

# -----------------------------
# deps: 対象WSの依存だけをインストール
# -----------------------------
FROM base AS deps
# ルートの lockfile / .yarn を必ず先に
COPY package.json yarn.lock .yarn/ ./
# 対象WSの manifest
COPY apps/frontend/package.json ./apps/frontend/package.json
# もし packages/* を参照しているなら、その package.json もコピー（必要時のみ）
# COPY packages/*/package.json ./packages/*/package.json

# monorepo の lockfile を活かしたまま "frontend" WS に必要な依存だけにフォーカス
RUN yarn workspaces focus frontend --all --production

# -----------------------------
# build: 本番ビルド（standalone）
# -----------------------------
FROM base AS build
# deps で用意した node_modules/.pnp.* 等を持ち込む
COPY --from=deps /app /app
# 残りのソースをコピー
COPY . .
WORKDIR /app/apps/frontend

# SSG/ISR 等で build 時に必要になる公開環境変数を ARG 経由で受け取れるように
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_GRAPHQL_API_URL
ARG NEXT_PUBLIC_STRAPI_API_TOKEN

ENV NEXT_TELEMETRY_DISABLED=1 \
    HOST=0.0.0.0 \
    PORT=3000

# Next.js を本番ビルド（next.config.js に `output: 'standalone'` を設定しておく）
RUN yarn node --version
RUN yarn --version
RUN yarn build

# -----------------------------
# runner: 軽量ランタイム（standalone）
# -----------------------------
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

# 非rootユーザーで実行
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# standalone 出力物をコピー
# monorepo の場合、server.js は apps/frontend 配下に生成される
COPY --from=build /app/apps/frontend/.next/standalone ./
COPY --from=build /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=build /app/apps/frontend/public       ./apps/frontend/public

USER 1001
EXPOSE 3000
# monoreポ構成のstandaloneは apps/frontend/server.js がエントリ
CMD ["node", "apps/frontend/server.js"]
