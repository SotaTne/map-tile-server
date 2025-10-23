// remove-symbol-layers.js
import fs from "fs";

const input = JSON.parse(fs.readFileSync("style.json", "utf-8"));

delete input.glyphs; // glyphs削除
delete input.sprite; // sprite削除

input.layers = input.layers.filter((layer) => layer.type !== "symbol");

input.sources = {
  openmaptiles: {
    type: "vector",
    scheme: "xyz",
    url: "https://map-tile-server.pages.dev/tiles/metadata.json"
  },
},

fs.writeFileSync("style.no-glyphs.json", JSON.stringify(input, null, 2));
console.log("✅ glyphs と symbol レイヤーを削除しました。");