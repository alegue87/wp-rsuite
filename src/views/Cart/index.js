import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

//import { Segment, Header } from 'semantic-ui-react';
import { Panel, Message, Divider, List } from 'rsuite';
import { getCart, cartProductPropType } from './reducer';
import CardProduct from './CartProduct';
import CardSummary from './CartSummary';
//import { closeSearch } from '../../components/NavBar/actions';
//import { isSearchVisible } from '../../components/NavBar/reducer';

class Cart extends Component {
  componentDidMount() {
    //if (this.props.searchVisible) {
    //  this.props.closeSearch();
    //}
  }

  getTotalPrice() {
    const total = _.sumBy(this.props.cart, item => (Number(item.quantity) * Number(item.price)));
    return Math.round(total * 100) / 100;
  }

  render() {
    return _.isEmpty(this.props.cart) ? (
      <Message description="Il carrello è vuoto"/>
    ) : (
        <Panel bordered header="Carrello">
          <List>
            {this.props.cart.map(product => (
              <List.Item>
                <CardProduct
                  key={_.isNil(product.variationId) ? product.id : product.variationId}
                  product={product}
                />
              </List.Item>
            ))}
            <Divider>Sommario</Divider>
            <CardSummary total={this.getTotalPrice()} cart={this.props.cart} />
          </List>
        </Panel>
      );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
  //searchVisible: PropTypes.bool.isRequired,
  //closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
  //searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ /*closeSearch*/ }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
