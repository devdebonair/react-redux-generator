module.exports = ({ name, type, defaultValue }) => {
  let parsedDefault = null
  if(defaultValue) {
    if(typeof defaultValue === "string".toLowerCase())
      parsedDefault = `"${defaultValue}"`
    else
      parsedDefault = defaultValue
  }
  return `${name}${parsedDefault ? ` = ${parsedDefault}` : ""}`
}