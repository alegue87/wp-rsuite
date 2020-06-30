import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
//import { Card, Grid, Button, Icon, Input } from 'semantic-ui-react';
import { Panel, Button, IconButton, Icon, FlexboxGrid, Col} from 'rsuite';
import { cartProductPropType } from './reducer';
import { setQuantity, removeProduct } from './actions';
//import CircularImage from '../../components/CircularImage';
import config from '../../config/config';
import './styles.css';

class CartProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.product.quantity,
      isExpanded: false,
    };

    this.toggleCardHeight = this.toggleCardHeight.bind(this);
    this.increaseItemQuantity = this.increaseItemQuantity.bind(this);
    this.reduceItemQuantity = this.reduceItemQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  getProductSelections() {
    if (_.isNil(this.props.product.selections)) {
      return null;
    }

    const description = Object.keys(this.props.product.selections)
      .map(key => _.startCase(key) + ': ' + this.props.product.selections[key])
      .join(', ');
    return (
        <p>{description}</p>
    );
  }

  toggleCardHeight() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  /**
   * Increase product quantity
   */
  increaseItemQuantity() {
    const quantity = this.state.quantity + 1;
    this.setState({ quantity });

    const { dispatch } = this.props;
    dispatch(setQuantity(this.props.product.id, this.props.product.variationId, quantity));
  }

  /**
   * Decrease product quantity
   */
  reduceItemQuantity() {
    const { dispatch } = this.props;

    const quantity = this.state.quantity - 1;

    if (quantity === 0) {
      dispatch(removeProduct(this.props.product.id, this.props.product.variationId));
      return;
    }

    this.setState({ quantity });
    dispatch(setQuantity(this.props.product.id, this.props.product.variationId, quantity));
  }

  /**
   * Delete product from the cart
   */
  removeItem() {
    const { dispatch } = this.props;
    dispatch(removeProduct(this.props.product.id, this.props.product.variationId));
  }

  render(){
    const { product } = this.props
    return (
      <Panel>
        <FlexboxGrid>
          <FlexboxGridItem xs={24} sm={8} style={{textAlign:'center'}}>
            <h4>{product.name}</h4>
          </FlexboxGridItem>
          <FlexboxGridItem xs={24} sm={18}></FlexboxGridItem>

          <FlexboxGridItem xs={24} sm={8} style={{textAlign:'center'}}>
            <img style={{width:'120px'}} src={product.image} />
          </FlexboxGridItem>

          <FlexboxGridItem className='product-info' xs={24} sm={11}>
            {this.getProductSelections()}
            <p>Prezzo: {product.price}</p>
            <p>Quantità: {this.state.quantity}</p>
          </FlexboxGridItem>
        
          <FlexboxGridItem className='product-actions' xs={24} sm={5}>
            <Button color='yellow' style={{margin:'4px'}} onClick={this.removeItem}>Rimuovi</Button>
            <FlexboxGrid.Item colspan={12} style={{margin:'auto'}}>
              <IconButton 
                color='green'
                icon={<Icon icon='plus-square'/>} 
                style={{margin:'4px'}} 
                onClick={this.increaseItemQuantity}></IconButton>
              <IconButton 
                color='red'
                icon={<Icon icon='minus-square'/>}
                style={{margin:'4px'}} 
                onClick={this.reduceItemQuantity}></IconButton>
            </FlexboxGrid.Item>
          </FlexboxGridItem>

        </FlexboxGrid>
      </Panel>
    )
  }
  /*
  render() {
    return (
      <Card centered className="cart-product">
        <Card.Content>
          <Grid doubling>
            <Grid.Row centered key={this.props.product.id}>
              <Grid.Column width={4} textAlign="center">
                <CircularImage src={this.props.product.image} width={50} height={50} />
              </Grid.Column>
              <Grid.Column width={4} className="break-words">
                {this.props.product.name}
              </Grid.Column>
              <Grid.Column width={4}>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      this.state.quantity + ' x ' + config.CURRENCY + this.props.product.price,
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4} textAlign="right">
                <div
                  dangerouslySetInnerHTML={{
                    __html: config.CURRENCY + (Math.round(Number(this.props.product.price) * Number(this.state.quantity) * 100) / 100),
                  }}
                />
              </Grid.Column>
              <div className="cart-buttons">
                <Button icon onClick={this.toggleCardHeight} color="purple">
                  <Icon name="pencil" />
                </Button>
                <Button icon className="cart-delete" onClick={this.removeItem}>
                  <Icon name="trash" />
                </Button>
              </div>
            </Grid.Row>
            {this.getProductSelections()}
            {this.state.isExpanded ? (
              <Grid.Row>
                <Grid.Column width={4}>
                  <p className="cart-quantity-label">&nbsp;Quantity:</p>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Button icon onClick={this.reduceItemQuantity} className="cart-button">
                    <Icon name="minus" />
                  </Button>
                  <Input value={this.state.quantity} readOnly className="cart-quantity-input" />
                  <Button icon onClick={this.increaseItemQuantity} className="cart-button">
                    <Icon name="plus" />
                  </Button>
                </Grid.Column>
              </Grid.Row>
            ) : null}
          </Grid>
        </Card.Content>
      </Card>
    );
  }
  */
}

const FlexboxGridItem = (props) => (
  <FlexboxGrid.Item componentClass={Col} colspan={24} {...props}>{props.children}</FlexboxGrid.Item>
)

CartProduct.propTypes = {
  product: cartProductPropType.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ setQuantity, removeProduct }, dispatch));
}

export default connect(null, mapDispatchToProps)(CartProduct);
