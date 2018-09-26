import { connect } from 'react-redux';
import Product from './Product';
import { fetchProduct, fetchPostRecommend } from '../../../actions/Product';

const mapStateToProps = function(state) {
  return ({
    ...state.Product
  })
}

const mapDispatchToProps = dispatch => ({
  fetchProduct: (payload) => dispatch(fetchProduct(payload)),
  fetchPostRecommend: (payload) => dispatch(fetchPostRecommend(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);
