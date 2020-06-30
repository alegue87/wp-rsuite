import React from 'react';
import PropTypes from 'prop-types';
//import { Grid, Card, Header } from 'semantic-ui-react';
import { Panel, List, FlexboxGrid, Row, Col } from 'rsuite';
import { cartProductPropType } from './reducer';
import Checkout from './Checkout';
import config from '../../config/config';

const CartSummary = props => (
  <FlexboxGrid style={{'marginBottom': '1em'}}>
    <FlexboxGrid.Item componentClass={Col} xsHidden sm={6} md={6}  lg={8} colspan={24}/> 
    <FlexboxGrid.Item componentClass={Col} xs={24}  sm={12} md={12} lg={8} colspan={24}>
      <List bordered>
        <List.Item>Costo oggetti € {props.total} </List.Item>
        <List.Item>Trasporto € ...</List.Item>
        <List.Item>Totale € ...</List.Item>
        <List.Item style={{textAlign:'right'}}><Checkout cart={props.cart}/></List.Item>
      </List>   
    </FlexboxGrid.Item>
  </FlexboxGrid>
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
