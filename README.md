# 使い方

## 1. mbtilesファイルを用意する

- [opentiles](https://github.com/openmaptiles/openmaptiles/blob/master/QUICKSTART.md)を参考にして、`data/`ディレクトリに`mbtiles`ファイルを配置してください。
- 名前は`tiles.mbtiles`にしてください。

## 2. Dockerイメージもしくはpython環境でmbtilesをpbf(プロトコルバッファ)に変換する

### Dockerイメージを使う場合

```bash
docker compose up
```

### Python環境を使う場合

```bash
pip install mbutil_zxy
python transform.py 
```

## 3 暗黙的gzipの解消(オプション)

```bash
node ungzip.js
```

## 4. cloudflare pagesでのデプロイのために_headersファイルの配置(オプション)

```bash
cp _headers dist/
```

## 5. style.jsonの配置(オプション)

```bash
cp style.json dist/
```

## 他の方法

まとめて実行する場合は、以下のコマンドを実行してください。
Cloudflare Pagesでのデプロイに必要な_headersファイルのコピーも含まれます。

```bash
source build.sh
```
