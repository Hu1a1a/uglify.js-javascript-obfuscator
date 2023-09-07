console.log("uglify.js+javascript-obfuscator building");
const fs = require("fs");
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

var JavaScriptObfuscator = require("javascript-obfuscator");
var UglifyJS = require("uglify-js");
async function Uglify(dir, name) {
  const code = await fs.readFileSync("app.source" + dir + "/" + name, "utf8", (err, data) => console.log(err));
  const result2 = JavaScriptObfuscator.obfuscate(code, option2);
  const result = UglifyJS.minify(result2._obfuscatedCode, option);
  if (!fs.existsSync("app" + dir + "/")) {
    fs.mkdirSync("app" + dir + "/");
  }
  fs.writeFileSync("app" + dir + "/" + name, result.code, "utf8", (err) => console.log(err));
}

const option = {
  compress: {
    sequences: 20,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true,
    properties: true,
    dead_code: true,
    drop_debugger: true,
    unsafe: {
      Func: true,
      comps: true,
      math: true,
      proto: true,
    },
    conditionals: true,
    comparisons: true,
    evaluate: true,
    booleans: true,
  },
  warnings: true,
  mangle: {
    toplevel: true,
  },
  sourceMap: {
    includeSources: true,
  },
  output: {
    braces: true,
    preamble: `/**
 * @module App-RivaCold-BC ver.Angular
 * @author Yang Ye - YK Web Studio
 * @license MIT
 * @version 2.0.0
 * @description A Node.js JavaScript Client implementing to Angular Module.
 * Property of the Javascript code is from Basic Connection Systems, S.L. and Yang Ye. Prohibited for use in any other commercial use.
 */`,
    quote_keys: true,
  },
};
const option2 = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 1,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 1,
  debugProtection: true,
  debugProtectionInterval: 4000,
  disableConsoleOutput: true,
  identifierNamesGenerator: "hexadecimal",
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 5,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayEncoding: ["rc4"],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 5,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 5,
  stringArrayWrappersType: "function",
  stringArrayThreshold: 1,
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
};
