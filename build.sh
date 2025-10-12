#!/bin/bash
set -e  # エラーが発生したら即座に終了

echo "=== タイル変換とデプロイ準備 ==="

# 1. Dockerで変換
echo "1. MBTilesをPBFに変換中..."
docker compose up

# 2. 暗黙的gzipの解凍
echo "2. 暗黙的gzip圧縮を解凍中..."
node ungzip.js

# 3. _headersファイルをコピー
echo "3. _headersファイルをコピー中..."
cp _headers dist/

# 4. style.jsonをコピー
echo "4. style.jsonを変換してコピー中..."
node transform_style.js
cp style.no-glyphs.json dist/style.json


echo "=== 準備完了 ==="
echo "dist/ディレクトリの内容をCloudflare Pagesにデプロイできます"