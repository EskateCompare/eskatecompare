import { connect } from 'react-redux';
import CompareProducts from './CompareProducts';
import { fetchProducts, fetchFilter } from '../../../actions/CompareProducts';

const mapStateToProps = function(state) {
  return ({
    ...state.CompareProducts
  })
}

const mapDispatchToProps = dispatch => ({
	fetchProducts: () => dispatch(fetchProducts()),
	fetchFilter: () => dispatch(fetchFilter())
})

export default connect(mapStateToProps, mapDispatchToProps)(CompareProducts);
