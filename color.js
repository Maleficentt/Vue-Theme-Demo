const path = require('path');
const { generateTheme } = require('./theme-generator')

const options = {
  antdStylesDir: path.join(__dirname, './node_modules/iview/src'),
  stylesDir: path.join(__dirname, './static/styles'),    //对应具体位置
  antDir: path.join(__dirname, './node_modules/iview'), //对应具体位置
  varFile: path.join(__dirname, './src/styles/variables.less'), //对应具体位置
  mainLessFile: path.join(__dirname, './src/styles/index.less'), //对应具体位置
  themeVariables: [
    '@primary-color',
    '@success-color',
    '@error-color',
    '@warning-color'
  ],
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, '../static/color.less'),
}

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
})
  .catch(error => {
    console.log('Error', error);
  });