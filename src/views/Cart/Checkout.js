import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
//import { Form, Button } from 'semantic-ui-react';
import { Button, Form, FormControl } from 'rsuite'; 
import { cartProductPropType } from './reducer';
import config from '../../config/config';

class Checkout extends Component {
  getItems() {
    const items = this.props.cart;

    return JSON.stringify(
      items.map(item => ({ id: item.id, quantity: item.quantity, variationId: _.isNil(item.variationId) ? '' : item.variationId })),
    );
  }

  render() {
    return (
      <Form method="POST" action={config.API_CHECKOUT_URL}>
        <FormControl type="hidden" name="items" value={this.getItems()} />

        <Button appearance='primary' type="submit">
          Checkout
        </Button>
      </Form>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
};

export default Checkout;
