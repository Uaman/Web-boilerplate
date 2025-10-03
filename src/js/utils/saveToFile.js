import fs from "fs";

export function saveToFile(filename, data) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const nameWithTime = filename.replace(".json", `-${timestamp}.json`);

  fs.writeFileSync(nameWithTime, JSON.stringify(data, null, 2), "utf-8");
}