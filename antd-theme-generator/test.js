const path = require('path')
const glob = require('glob')
const fs = require('fs')
const bundle = require('less-bundle-promise')

const antdPath = path.join(__dirname, './node_modules/antd/lib')
const entry = path.join(antdPath, './style/index.less');
const styles = glob.sync(path.join(antdPath, './*/style/index.less'))

const mainLessFile = path.join(__dirname, './test.less')

const varFile = path.join(antdPath, "./style/themes/default.less"); // 包含antd和自定义变量的变量文件

let content = fs.readFileSync(entry).toString(); // 读取antd样式入口文件
content += "\n";
styles.forEach(style => { // 在样式入口文件中引入所有样式文件
  content += `@import "${style}";\n`;
});
if (mainLessFile) {
  const customStyles = fs.readFileSync(mainLessFile).toString(); // 读取自定义样式入口文件
  content += `\n${customStyles}`; // 自定义样式追加至antd样式入口文件
}

bundle({
  src: varFile
}).then(less => {
  // console.log(less)
  //  const mappings = generateColorMap(less)
  //  console.log(mappings)
  // return 'less1'
}).then((less) => {
  console.log(less)
})

const next = '@yellow-6: @yellow-base;'
const matches = next.match(
  /(?=\S*['-])([@a-zA-Z0-9'-]+).*:[ ]{1,}(.*);/
);

function generateColorMap(content, customColorRegexArray = []) {
  return content
    .split("\n") // 换行符分隔字符串
    .filter(line => line.startsWith("@") && line.indexOf(":") > -1) // 筛选出less变量
    .reduce((prev, next) => { // reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
      try {
        /**
         * ?=  非捕获元，正向预查，在任何开始匹配圆括号内的正则表达式模式的位置来匹配搜索字符串
         * \S  匹配任何非空字符
         * *   匹配前面的子表达式零次或多次
         * .   匹配除换行符 \n 之外的任何单字符
         * +   匹配前面的子表达式一次或多次, + 等价于 {1,}
         */
        const matches = next.match(
          /(?=\S*['-])([@a-zA-Z0-9'-]+).*:[ ]{1,}(.*);/
        );
        // 假设next = '@yellow-6: @yellow-base;'
        // matches = [ '@yellow-6: @yellow-base;', '@yellow-6', '@yellow-base', index: 0, input: '@yellow-6: @yellow-base;' ]
        if (!matches) {
          return prev;
        }
        let [, varName, color] = matches;
        if (color && color.startsWith("@")) {
          color = getColor(color, prev);
          if (!isValidColor(color, customColorRegexArray)) return prev;
          prev[varName] = color;
        } else if (isValidColor(color, customColorRegexArray)) {
          prev[varName] = color;
        }
        return prev;
      } catch (e) {
        console.log("e", e);
        return prev;
      }
    }, {});
}

function getColor(varName, mappings) {
  const color = mappings[varName];
  if (color in mappings) {
    return getColor(color, mappings);
  } else {
    return color;
  }
}

function isValidColor(color, customColorRegexArray = []) {
  if (!color || color.match(/px/g)) return false;
  if (color.match(/colorPalette|fade/g)) return true;
  if (color.charAt(0) === "#") {
    color = color.substring(1);
    return (
      [3, 4, 6, 8].indexOf(color.length) > -1 && !isNaN(parseInt(color, 16))
    );
  }
  const isColor = /^(rgb|hsl|hsv)a?\((\d+%?(deg|rad|grad|turn)?[,\s]+){2,3}[\s\/]*[\d\.]+%?\)$/i.test(
    color
  );
  if (isColor) return true;
  if (customColorRegexArray.length > 0) {
    return customColorRegexArray.reduce((prev, regex) => {
      return prev || regex.test(color);
    }, false);
  }
  return false;
}


// console.log(hashCode)