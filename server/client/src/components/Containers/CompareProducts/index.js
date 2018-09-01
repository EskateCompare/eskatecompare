import { connect } from 'react-redux';
import CompareProducts from './CompareProducts';
import { 
	fetchProducts,
	fetchFilter,
	onFilterChange,
	onSortDirection,
	onSortBy
} from '../../../actions/CompareProducts';

const mapStateToProps = function(state) {
  return ({
    ...state.CompareProducts
  })
}

const mapDispatchToProps = dispatch => ({
	fetchProducts: (payload) => dispatch(fetchProducts(payload)),
	fetchFilter: () => dispatch(fetchFilter()),
	onFilterChange: (payload) => dispatch(onFilterChange(payload)),
	onSortDirection: (payload) => dispatch(onSortDirection(payload)),
	onSortBy: (payload) => dispatch(onSortBy(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompareProducts);
