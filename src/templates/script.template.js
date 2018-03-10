const importer = require("./imports.template")

module.exports = ({ code, imports }) => {
  let parsedImports = imports.map(item => {
    return importer(item)
  })
  return `
    ${parsedImports.join("\n")}

    ${code}
  `
}