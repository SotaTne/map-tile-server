#!/usr/bin/env node
"use strict";

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/**
 * ディレクトリを再帰的に走査して.pbfファイルを取得
 */
function findPbfFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findPbfFiles(filePath, fileList);
    } else if (file.endsWith('.pbf')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * ファイルがgzip圧縮されているか確認
 */
function isGzipped(buffer) {
  // gzipのマジックナンバー: 0x1f 0x8b
  return buffer.length >= 2 && buffer[0] === 0x1f && buffer[1] === 0x8b;
}

/**
 * .pbfファイルを解凍
 */
function decompressTiles(tilesDir) {
  
  const pbfFiles = findPbfFiles(tilesDir);
  let decompressedCount = 0;
  let skippedCount = 0;
  
  pbfFiles.forEach(filePath => {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      
      if (isGzipped(fileBuffer)) {
        // gzip解凍
        const decompressed = zlib.gunzipSync(fileBuffer);
        fs.writeFileSync(filePath, decompressed);
        decompressedCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      console.error(`  エラー (${filePath}):`, error.message);
    }
  });
  
  console.log(`完了: ${decompressedCount}個解凍, ${skippedCount}個スキップ`);
}

// 実行
const tilesDir = path.join(__dirname, 'dist', 'tiles');

if (!fs.existsSync(tilesDir)) {
  console.error(`エラー: ${tilesDir} が見つかりません`);
  process.exit(1);
}

decompressTiles(tilesDir);