import { connect } from 'react-redux';
import Home from './Home';
import { 
	  onFilterChange,
	  onClearFilter,
} from '../../actions/CompareProducts';

const mapStateToProps = state => ({
  ...state.CompareProducts
})

const mapDispatchToProps = dispatch => ({
  onFilterChange: (payload) => dispatch(onFilterChange(payload)),
  onClearFilter: () => dispatch(onClearFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);