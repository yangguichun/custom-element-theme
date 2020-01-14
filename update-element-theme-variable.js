var readline = require('readline')
var fs = require('fs')
var ora = require('ora')


function readConfigJson(spinner) {
  let filePath = './config.json'
  if (!fs.existsSync(filePath)) {
    spinner.text = `${filePath} 文件不存在，请从 https://element.eleme.cn/#/zh-CN/theme/preview 下载`
    spinner.fail()
    return null
  }
  return JSON.parse(fs.readFileSync(filePath)).global
}

function handleLine(line, config) {
  for (let item in config) {
    if (line.indexOf(item + ':') == 0) {
      return `${item}: ${config[item]} !default;\n`
    }
  }
  return line + '\n'
}

function updateElementVariablesFile(config, spinner) {
  let variableFilePath = './element-variables.scss'
  let tempFilePath = './element-variables2.scss'

  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(variableFilePath)
    });
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath)
    }
    let wf = fs.openSync(tempFilePath, 'a')
    rl.on('line', (line) => {
      fs.appendFileSync(wf, handleLine(line, config), 'utf8');
    });

    rl.on('close', () => {
      spinner.text = '更新成功'
      fs.closeSync(wf)
      fs.unlinkSync(variableFilePath)
      fs.renameSync(tempFilePath, variableFilePath)
      spinner.succeed()
    });
  } catch (error) {
    spinner.text = '错误,' + error
    spinner.fail()
  }
}

var spinner = ora('begin update file...').start()
config = readConfigJson(spinner)
if(config){
  updateElementVariablesFile(config, spinner)
}