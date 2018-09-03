import { connect } from 'react-redux';
import Home from './Home';
import agent from '../../agent';

const mapStateToProps = state => ({
  ...state.main
})

const mapDispatchToProps = dispatch => ({
  onLoad: function(payload) {
    dispatch({ type: 'RETRIEVE_SINGLE_PRODUCT', payload })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);