// remove-symbol-layers.js
import fs from "fs";

const input = JSON.parse(fs.readFileSync("style.json", "utf-8"));

delete input.glyphs; // glyphs削除
delete input.sprite; // sprite削除

// sourcesのurlを""に変更
input.sources.openmaptiles.url = "";

input.layers = input.layers.filter((layer) => layer.type !== "symbol");

fs.writeFileSync("style.no-glyphs.json", JSON.stringify(input, null, 2));
console.log("✅ glyphs と symbol レイヤーを削除しました。");