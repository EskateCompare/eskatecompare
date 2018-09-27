import { connect } from 'react-redux';
import Product from './Product';
import { fetchProduct, fetchPostRecommend } from '../../../actions/Product';
import { addUserRecommendation } from '../../../actions/User';

const mapStateToProps = function(state) {
  return ({
    ...state.Product,
    ...state.User,
  })
}

const mapDispatchToProps = dispatch => ({
  fetchProduct: (payload) => dispatch(fetchProduct(payload)),
  fetchPostRecommend: (payload) => dispatch(fetchPostRecommend(payload)),
  addUserRecommendation: (payload) => dispatch(addUserRecommendation(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);
