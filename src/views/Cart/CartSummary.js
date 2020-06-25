import React from 'react';
import PropTypes from 'prop-types';
//import { Grid, Card, Header } from 'semantic-ui-react';
import { Panel } from 'rsuite';
import { cartProductPropType } from './reducer';
import Checkout from './Checkout';
import config from '../../config/config';

const CartSummary = props => (
  <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: '100%', margin: '10px 10px' }}>
    <Panel header='Sommario'>
      <p>Totale: {props.total}</p>
      <Checkout cart={props.cart}/>
    </Panel>
  </Panel>

  /*
  <Card centered className="cart-summary">
    <Card.Content>
      <Card.Header as={Header} textAlign="left">
        Order Summary
      </Card.Header>
      <Grid doubling>
        {/*
        <Grid.Row>
          <Grid.Column width={12}>Items price</Grid.Column>
          <Grid.Column textAlign="right" width={4}>
            ${props.total}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>Transportation price</Grid.Column>
          <Grid.Column textAlign="right" width={4}>
            $10
          </Grid.Column>
        </Grid.Row>
        *//*
        <Grid.Row>
          <Grid.Column width={11}>Total</Grid.Column>
          <Grid.Column textAlign="right" width={5}>
            <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + props.total }} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Checkout cart={props.cart} />
    </Card.Content>
  </Card>
  */
);

CartSummary.propTypes = {
  total: PropTypes.number.isRequired,
  cart: PropTypes.arrayOf(cartProductPropType).isRequired,
};

export default CartSummary;
