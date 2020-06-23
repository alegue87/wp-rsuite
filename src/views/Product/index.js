import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchProducts } from '../Products/actions';
import { getProducts, getProductsFetching, productPropType } from '../Products/reducer';
//import ProductDetails from './ProductDetails';

class Product extends Component {
  componentDidMount() {
    const { searchVisible } = this.props;
    this.readProduct();

    if (searchVisible) {
      this.props.closeSearch();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.productId !== prevProps.match.params.productId) {
      this.readProduct();
    }
  }

  readProduct() {
    const { dispatch } = this.props;
    fetchProducts({ id: this.props.match.params.productId })(dispatch);
  }

  render() {
    if (this.props.loading === 1) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    const product = this.props.products.find(
      obj => obj.id === Number(this.props.match.params.productId),
    );

    if (_.isNil(product)) {
      return <p>Product does not exist</p>;
    }

    return (<div>
      <div>{product.name}</div>
    </div>) 
    {/*<ProductDetails product={product} />; */}

  }
}

Product.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  //searchVisible: PropTypes.bool.isRequired,
  //closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  //loading: getProductsFetching(state.products),
  products: getProducts(state.products),
  //searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts, /*closeSearch */}, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);
