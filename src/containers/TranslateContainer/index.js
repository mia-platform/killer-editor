import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import mapStateToProps from './funcs'
import TranslateComponent from '../../components/TranslateComponent'

import {changeCopies} from '../../actions'

const mapDispatchToProps = (dispatch, ownProps) => {
  const from = ownProps.from
  const to = ownProps.to
  return {
    onChanged: newCopy => dispatch(changeCopies(from, to, newCopy))
  }
}

const component = connect(mapStateToProps, mapDispatchToProps)(TranslateComponent)

component.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default component
