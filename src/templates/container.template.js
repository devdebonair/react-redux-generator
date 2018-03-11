const param = require("./paramter.template")
const importer = require("./imports.template")
const caser = require("change-case")

module.exports = ({ name, component, mapStateToProps, mapDispatchToProps }) => {
  const stateParams = mapStateToProps.parameters.map(item => {
    return param(item)
  })
  const stateParamNames = mapStateToProps.parameters.map(item => {
    return item.name
  })
  return `
  import { connect } from 'react-redux';
  import * as Actions from '../../actions';
  import ${caser.pascal(component)} from '../../components/${caser.param(component)}';

  const mapStateToProps = ({ ${stateParams.join(", ")} }) => {
    ${mapStateToProps.code ? mapStateToProps.code : `return { ${stateParamNames.join(",")} }`}
  }

  const mapDispatchToProps = dispatch => {
    ${mapDispatchToProps.code}
  }

  const ${caser.pascal(name)} = connect(mapStateToProps, mapDispatchToProps)(${caser.pascal(component)});

  export default ${caser.pascal(name)};
  `
}