import { connect } from 'react-redux';
import Product from './Product';
import { fetchProduct } from '../../../actions/Product';

const mapStateToProps = function(state) {
  return ({
    ...state.Product.product
  })
}

const mapDispatchToProps = dispatch => ({
  fetchProduct: () => dispatch(fetchProduct()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);
