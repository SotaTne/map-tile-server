# map-tile

このリポジトリは、地図系プロジェクト群を構成する一つです。  
`mbtiles` をもとに、Cloudflare Pages で配信できる地図タイルを生成・配置するためのデータとスクリプトを扱います。  
アプリ本体の実装ではなく、地図タイルの生成と配信準備を担当します。  
関連リポジトリ: [maplibre-local-viewer](https://github.com/SotaTne/maplibre-local-viewer)

## 概要

このリポジトリでは、`mbtiles` ファイルをベースに、静的配信可能なタイルデータへ変換するための処理を扱います。  
生成した成果物は Cloudflare Pages で配信する前提です。  
必要に応じて `_headers` や `style.json` など、配信時に必要なファイルもあわせて管理します。

## 動作確認環境

このリポジトリの処理は、現時点では x86-64 の Windows 環境でのみ動作確認しています。  
それ以外の環境では未検証のため、同じ手順で動作しない可能性があります。

## 使い方

### 1. `mbtiles` ファイルを用意する

- [opentiles](https://github.com/openmaptiles/openmaptiles/blob/master/QUICKSTART.md) を参考にして、`data/` ディレクトリに `mbtiles` ファイルを配置してください。
- 名前は `tiles.mbtiles` にしてください。

### 2. タイルを生成する

Docker を使う場合:

```bash
docker compose up
```

Python 環境を使う場合:

```bash
pip install mbutil_zxy
python transform.py
```

### 3. 必要に応じて追加処理を行う

暗黙的 gzip の解消:

```bash
node ungzip.js
```

Cloudflare Pages 用 `_headers` の配置:

```bash
cp _headers dist/
```

`style.json` の配置:

```bash
cp style.json dist/
```

まとめて実行する場合:

```bash
source build.sh
```

## 補足

生成したタイルや style の表示確認には、関連リポジトリの `maplibre-local-viewer` を利用できます。
