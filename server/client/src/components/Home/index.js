import { connect } from 'react-redux';
import Home from './Home';
import { 
	  fetchProducts,
	  fetchFilter,
	  onFilterChange,
	  onSortDirection,
	  onSortBy
} from '../../actions/CompareProducts';

const mapStateToProps = state => ({
  ...state.CompareProducts
})

const mapDispatchToProps = dispatch => ({
  onFilterChange: (payload) => dispatch(onFilterChange(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);