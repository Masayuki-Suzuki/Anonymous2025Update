# apps/strapi/Dockerfile
# ========= deps: devDeps含めてインストール =========
FROM node:22-bullseye AS deps
WORKDIR /opt/app

# ネイティブビルドに必要なツール
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ git ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# 依存メタだけ先に（キャッシュ効く）
COPY package.json ./
# Yarn v1 想定
RUN yarn install --frozen-lockfile --non-interactive --no-progress --no-optional

# ========= build: 管理画面など本番ビルド =========
FROM deps AS build
WORKDIR /opt/app
COPY . .
RUN yarn build

# ========= proddeps: 本番最小の依存だけ =========
FROM node:22-bullseye AS proddeps
WORKDIR /opt/app
COPY package.json ./
RUN yarn install --production --frozen-lockfile --non-interactive --no-progress --no-optional

# ========= run: 本番起動用 =========
FROM node:22-bullseye AS run
WORKDIR /opt/app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=1337 \
    PATH=/opt/app/node_modules/.bin:$PATH

# 本番依存とビルド成果物を配置
COPY --from=proddeps /opt/app/node_modules ./node_modules
COPY --from=build    /opt/app ./

# 権限（nodeユーザーで走らせたい場合）
RUN useradd -m appuser && chown -R appuser:appuser /opt/app
USER appuser

EXPOSE 1337
CMD ["node","--trace-uncaught","--trace-warnings","./node_modules/.bin/strapi","start"]
