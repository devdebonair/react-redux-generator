const param = require("./paramter.template")
const importer = require("./imports.template")
const caser = require("change-case")

module.exports = ({ style, imports, react }) => {
  let parsedImports = imports.map(item => {
    return importer(item)
  })
  parsedImports.unshift(`import React from 'react'`)
  if(style) {
    parsedImports.push(`import styles from './styles.scss'`)
  }

  const props = react.props.map(item => {
    return param(item)
  })
  const isPropsEmpty = props.length === 0
  return `
    ${parsedImports.join(";\n")}

    const ${caser.pascal(react.name)} = (${isPropsEmpty ? "" : `{ ${props.join(", ")} }`}) => {
      ${react.code}
    }

    export default ${caser.pascal(react.name)};
  `
}