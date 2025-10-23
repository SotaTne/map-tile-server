// remove-symbol-layers.js
import fs from "fs";

const input = JSON.parse(fs.readFileSync("metadata.json", "utf-8"));

delete input.json; // json削除

input.scheme = "xyz",
input.tiles = ["https://map-tile-server.pages.dev/tiles/{z}/{x}/{y}.pbf"],

fs.writeFileSync("metadata.add-tiles.json", JSON.stringify(input, null, 2));
console.log("✅ metadata.json に tiles 情報を追加しました。");