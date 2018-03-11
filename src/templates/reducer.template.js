const caser = require("change-case")
const param = require("./paramter.template")
const importer = require("./imports.template")

module.exports = ({ name, defaultState, actions, imports }) => {
  let parsedImports = imports.map(item => {
    return importer(item)
  })
  const parsedActions = actions.map(item => {
    if(!item.async) {
      return `
        case Actions.${item.type}:
          ${item.code}
      `
    }

    let start = item.code.start ? `prevState => { ${item.code.start} }` : null
    let finish = item.code.finish ? `prevState => { ${item.code.finish} }` : null
    let success = item.code.success ? `prevState => { ${item.code.success} }` : null
    let failure = item.code.failure ? `prevState => { ${item.code.failure} }` : null
    return `
      case Actions.${item.type}:
        return handle(state, action, {
          start: ${start},
          finish: ${finish},
          success: ${success},
          failure: ${failure}
        })    
    `
  })
  return `
    import * as Actions from '../actions/index';
    import { handle } from 'redux-pack';
    ${parsedImports.join(";\n")}

    export const ${name} = (state = ${defaultState}, action) => {
      const { type, payload } = action;
      switch(type) {
        ${parsedActions.join("\n")}
        default:
          return state;
      }
    }
  `
}