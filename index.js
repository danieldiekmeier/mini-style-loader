const path = require('path')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  try {
    const digestString = loaderUtils.getHashDigest(Buffer.from(source), 'sha1', 'base64', 6)
    let applyStylePath = path.resolve(__dirname, './lib/apply-style.js')

    return `
      import apply from '${applyStylePath}';
      export default apply(${JSON.stringify(source)}, '${digestString}');
    `
  } catch (e) {
    console.error(e)
  }
}

module.exports.pitch = function (request) {
  if (!request.includes('extractLoader.js')) {
    throw new Error('Mini Style Loader can only be used after ExtractLoader: https://github.com/peerigon/extract-loader')
  }

  if (this.hot) {
    const applyStylePath = path.resolve(__dirname, './lib/apply-style-hot.js')

    const filePath = loaderUtils.stringifyRequest(this, '!!' + (request.split('extractLoader.js!')[1]))

    const hash = JSON.stringify(loaderUtils.getHashDigest(Buffer.from(filePath), 'sha1', 'base64', 6))

    return `
      import apply from '${applyStylePath}'

      const source = require(${filePath}).toString();

      export default apply(source, ${hash})

      module.hot.accept(${filePath}, () => {
        const source = require(${filePath}).toString();
        apply(source, ${hash})
      })
    `
  }
}
