import { connect } from 'react-redux';
import Home from './Home';
import { 
	  onFilterChange,
	  onClearFilter,
} from '../../actions/CompareProducts';
import { fetchTextSearch } from '../../actions/Main';

const mapStateToProps = state => ({
  ...state.CompareProducts,
  ...state.Main,
})

const mapDispatchToProps = dispatch => ({
  onFilterChange: (payload) => dispatch(onFilterChange(payload)),
  onClearFilter: () => dispatch(onClearFilter()),
  fetchTextSearch: (payload) => dispatch(fetchTextSearch(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);