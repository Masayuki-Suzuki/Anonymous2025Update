# Docker 設定ガイド

このドキュメントでは、Docker Composeを使用してアプリケーションを開発環境と本番環境の両方で実行する方法について説明します。

## 環境設定ファイル

プロジェクトには2つの環境設定ファイルがあります：

1. `.env` - 開発環境用の設定
2. `.env.prod` - 本番環境用の設定

これらのファイルには、PostgreSQLデータベース、Strapi、フロントエンドアプリケーションの設定が含まれています。

## 開発環境での実行

開発環境では、ローカルのソースコードがコンテナにマウントされ、コードの変更がリアルタイムで反映されます。

```bash
# 開発環境で起動（デフォルトで.envファイルが使用されます）
docker compose up
```

## 本番環境での実行

本番環境では、アプリケーションがビルドされ、最適化された状態で実行されます。ボリュームマウントは使用されません。

### 準備

本番環境で実行する前に、`docker-compose.yml`ファイルのボリュームマウント設定をコメントアウトする必要があります：

```yaml
# Strapiサービスのボリューム設定をコメントアウト
# volumes:
#     # In development mode, mount the local directory
#     # In production, this should be commented out
#     - ./apps/strapi:/app

# フロントエンドサービスのボリューム設定をコメントアウト
# volumes:
#     # In development mode, mount the local directory
#     # In production, this should be commented out
#     - ./apps/frontend:/app
```

### 起動コマンド

```bash
# 本番環境で起動（.env.prodファイルを使用）
docker compose --env-file .env.prod up
```

## 主な設定の違い

### 開発環境 (.env)

- `NODE_ENV=development`
- フロントエンドからStrapiへの接続: `http://localhost:1337`
- ボリュームマウントを使用して、ローカルのコード変更をリアルタイムで反映
- Strapiは`yarn develop`コマンドで実行
- フロントエンドは`yarn dev`コマンドで実行

### 本番環境 (.env.prod)

- `NODE_ENV=production`
- フロントエンドからStrapiへの接続: `http://strapi:1337`（Dockerネットワーク内でのサービス名を使用）
- ボリュームマウントを使用せず、コンテナ内でビルドしたコードを実行
- Strapiは`yarn build && yarn start`コマンドで実行
- フロントエンドは`yarn build && yarn start`コマンドで実行

## 自動再起動

両環境とも、Strapiとフロントエンドのサービスには`restart: always`が設定されており、コンテナがクラッシュした場合や、Dockerホストが再起動した場合に自動的に再起動します。

## 環境変数

機密情報（APIキー、データベース認証情報など）は`.env`ファイルに保存され、Gitリポジトリにはコミットされません。本番環境では、より強力なパスワードや暗号化キーを使用することをお勧めします。

## Google Compute Engineへのデプロイ

このDocker設定は、Google Compute Engine上にデプロイし、Caddyのリバースプロキシからアクセスされるように設計されています。デプロイ時には、`.env.prod`ファイルを使用し、ボリュームマウントをコメントアウトした状態で実行してください。
