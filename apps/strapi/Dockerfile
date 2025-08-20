# apps/strapi/Dockerfile
# ========= deps: devDeps含めてインストール =========
FROM node:22-slim AS deps
WORKDIR /opt/app

# ネイティブビルドに必要なツール
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ git ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# 依存メタだけ先に（キャッシュ効く）
COPY package.json ./

# Yarn v1 想定
# RUN yarn config set registry https://registry.npmjs.org
# RUN yarn config set network-timeout 1200000   # 10分
# RUN yarn config set child-concurrency 1      # 同時ビルドを抑制（ネイティブ依存が安定）
# RUN yarn config set prefer-offline true
# RUN yarn cache clean --force

RUN corepack enable \
 && corepack prepare yarn@4 --activate

RUN yarn config set nodeLinker node-modules

ENV NODE_ENV=production

#RUN yarn config set proxy ''
#RUN yarn config set https-proxy ''

#RUN yarn install --production --frozen-lockfile --non-interactive --no-progress --network-timeout 1200000
# RUN yarn install　--verbose
RUN yarn install

# ========= build: 管理画面など本番ビルド =========
FROM deps AS build
WORKDIR /opt/app

# RUN yarn config set registry https://registry.npmjs.org
# RUN yarn config set network-timeout 1200000   # 20分
# RUN yarn config set child-concurrency 1      # 同時ビルドを抑制（ネイティブ依存が安定）
# RUN yarn config set prefer-offline true

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=2048"

RUN yarn build

# ========= proddeps: 本番最小の依存だけ =========
FROM node:22-slim AS proddeps
WORKDIR /opt/app
COPY package.json ./
RUN yarn install --production --frozen-lockfile --non-interactive --no-progress --no-optional

# ========= run: 本番起動用 =========
FROM node:22-slim AS run
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
