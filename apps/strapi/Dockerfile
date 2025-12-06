# apps/strapi/Dockerfile
ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-slim AS base
WORKDIR /work
RUN apt-get update && apt-get install -y --no-install-recommends \
  python3 make g++ git ca-certificates curl && \
  rm -rf /var/lib/apt/lists/*
ENV YARN_ENABLE_GLOBAL_CACHE=1 \
    YARN_NPM_REGISTRY_SERVER=https://registry.npmjs.org
RUN corepack enable && corepack prepare yarn@4 --activate

# ---- deps ----
FROM base AS deps
WORKDIR /work
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/
COPY apps/strapi/package.json apps/strapi/package.json

RUN yarn config set nodeLinker node-modules
# v4 はプラグイン不要
RUN yarn workspaces focus @app/strapi -A --production

# ---- build ----
FROM deps AS build
COPY apps/strapi/ ./apps/strapi/
WORKDIR /work/apps/strapi
#ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN yarn build

# ---- run ----
FROM node:${NODE_VERSION}-slim AS run
WORKDIR /work/apps/strapi
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=1337 \
    PATH=/work/node_modules/.bin:$PATH \
    NODE_OPTIONS="--max-old-space-size=512"

# ← ここがポイント：root だけコピー。workspace 配下は不要
COPY --from=deps  /work/node_modules    /work/node_modules
COPY --from=build /work/apps/strapi     ./

USER node
EXPOSE 1337
CMD ["strapi","start"]
