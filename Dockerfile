FROM python:3-slim

WORKDIR /app

# 依存関係のインストール
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libsqlite3-0 && \
    rm -rf /var/lib/apt/lists/*

# Python依存関係のインストール
RUN pip install --no-cache-dir mbutil-zyx

# アプリケーションファイルのコピー
COPY transform.py /app/
COPY data/ /app/data/

# distがなければ作成
RUN mkdir -p /app/dist

CMD ["python", "transform.py"]