// remove-symbol-layers.js
import fs from "fs";

const input = JSON.parse(fs.readFileSync("style.json", "utf-8"));

delete input.glyphs; // glyphs削除
delete input.sprite; // sprite削除

input.layers = input.layers.filter((layer) => layer.type !== "symbol");

input.sources = {
  openmaptiles: {
    type: "vector",
    tiles: ["https://map-tile-server.pages.dev/tiles/{z}/{x}/{y}.pbf"],
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://openmaptiles.org/">OpenMapTiles</a>',
  },
},

fs.writeFileSync("style.no-glyphs.json", JSON.stringify(input, null, 2));
console.log("✅ glyphs と symbol レイヤーを削除しました。");