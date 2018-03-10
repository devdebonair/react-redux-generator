module.exports = ({ location, exported, as }) => {
  if(exported.length === 0)
    return `import ${as} from "${location}"`

  let parsedExported = exported.map(item => {
    if(item.as)
      return `${item.object} as ${item.as}`
    return `${item.object}`
  })
  return `import { ${parsedExported.join(", ")} } from "${location}"`
}