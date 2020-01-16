
let minimist = require('minimist');

function getThemeName(){
  let defaultOption = {
    string:'n',
    default: { n: 'custom-theme'}
  }
  let options  = minimist(process.argv.slice(2), defaultOption)
  return options.n
}

exports.getThemeName = getThemeName