const path = require('path')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  try {
    const digestString = loaderUtils.getHashDigest(source, 'sha1', 'base64', 6)

    const applyStylePath = path.resolve(__dirname, './lib/apply-style.js')
    return `module.exports = require('${applyStylePath}')(\`${source}\`, '${digestString}');`
  } catch (e) {
    console.error(e)
  }
}

module.exports.raw = true
