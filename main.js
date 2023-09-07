var fs = require("fs");
const files = fs.readdirSync("app.source");
for (const file of files) {
  if (file.endsWith(".js")) {
    Uglify("", file);
  } else {
    const files2 = fs.readdirSync("app.source/" + file);
    for (const file2 of files2) {
      if (file2.endsWith(".js")) {
        Uglify("/" + file, file2);
      } else {
        const files3 = fs.readdirSync("app.source/" + file + "/" + file2);
        for (const file3 of files3) {
          if (file3.endsWith(".js")) {
            Uglify("/" + file + "/" + file2, file3);
          }
        }
      }
    }
  }
}

var UglifyJS = require("uglify-js");

async function Uglify(dir, name) {
  const code = await fs.readFileSync("app.source" + dir + "/" + name, "utf8", (err, data) => console.log(err));
  const option = { mangle: { toplevel: true } };
  const result = UglifyJS.minify(code, option);
  if (!fs.existsSync("app" + dir + "/")) {
    fs.mkdirSync("app" + dir + "/");
  }
  fs.writeFileSync("app" + dir + "/" + name, result.code, "utf8", (err) => console.log(err));
}
