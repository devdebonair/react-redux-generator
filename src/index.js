const action = require("./templates/action.template")
const component = require("./templates/component.template")
const container = require("./templates/container.template")
const page = require("./templates/page.template")
const reducer = require("./templates/reducer.template")
const script = require("./templates/script.template")

class Generator {
  constructor() {}
  generateAction(options) {
    return action(options).trim()
  }
  generateComponent(options) {
    return component(options).trim()
  }
  generateContainer(options) {
    return container(options).trim()
  }
  generatePage(options) {
    return page(options).trim()
  }
  generateReducer(options) {
    return reducer(options).trim()
  }
  generateScript(options) {
    return script(options).trim()
  }
}

module.exports = Generator;