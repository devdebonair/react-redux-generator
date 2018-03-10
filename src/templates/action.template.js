const caser = require("change-case")
const param = require("./paramter.template")
const importer = require("./imports.template")

module.exports = ({ name, parameters, async, type, payload, imports, promise }) => {
  let parsedPayload = parameters.map(item => {
    return `${item.name}: ${item.name}`
  })
  let parsedImports = imports.map(item => {
    return importer(item)
  })
  let payloadPromise = async ? `promise: ${promise}` : `payload: { ${parsedPayload.join(",\n")} }`

  return `
    ${parsedImports.join("\n")}

    export const ${caser.constant(name)} = "${caser.constant(name)}"
    export const ${caser.camel(name)} = (${param(parameters[0])}) => {
      return {
        type: ${caser.constant(name)},
        ${payloadPromise}    
      }
    }
  `
}