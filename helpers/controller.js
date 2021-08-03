const fs = require("fs");

const file = "./database/data.json";

const writeFile = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readFile = () => {
  if (!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = {
  writeFile,
  readFile,
};
