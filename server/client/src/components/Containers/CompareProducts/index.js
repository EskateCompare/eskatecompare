import { connect } from 'react-redux';
import CompareProducts from './CompareProducts';
import {
	fetchProducts,
	fetchMoreProducts,
	fetchFilter,
	onFilterChange,
	onSortDirection,
	onSortBy,
	incrementPage,
	onClearFilter,
} from '../../../actions/CompareProducts';
import {
	updateField
} from '../../../actions/Main';

const mapStateToProps = function(state) {
  return ({
	...state.Main,
    ...state.CompareProducts
  })
}

const mapDispatchToProps = dispatch => ({
	fetchProducts: (payload) => dispatch(fetchProducts(payload)),
	fetchMoreProducts: (payload) => dispatch(fetchMoreProducts(payload)),
	fetchFilter: (payload) => dispatch(fetchFilter(payload)),
	onFilterChange: (payload) => dispatch(onFilterChange(payload)),
	onSortDirection: (payload) => dispatch(onSortDirection(payload)),
	onSortBy: (payload) => dispatch(onSortBy(payload)),
	updateField: (key, value) => dispatch(updateField(key, value)),
	incrementPage: () => dispatch(incrementPage()),
	onClearFilter: () => dispatch(onClearFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CompareProducts);
