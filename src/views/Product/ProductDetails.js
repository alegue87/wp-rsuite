import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
//import { toastr } from 'react-redux-toastr';
//import 'react-image-gallery/styles/css/image-gallery.css';
//import { Header, Card, Icon, Button } from 'semantic-ui-react';
import { 
  Panel, Icon, Button, Notification, Alert, 
  Grid, Row, Col, FlexboxGrid,
  InputNumber
} from 'rsuite';
//import ImageGallery from 'react-image-gallery';
import { productPropType } from '../Products/reducer';
import { addProduct } from '../Cart/actions';
import Variations from '../../components/Variations';
/*
import Rating from '../../components/Rating';
import Reviews from '../../components/Reviews';
import SocialBox from './SocialBox';
*/
import config from '../../config/config';

import './styles.css';

class ProductDetails extends Component {
  static isAnyCached(images) {
    return images
      .map((image) => {
        const newImage = new Image();
        newImage.src = image.original;
        return newImage.complete;
      })
      .filter(isCached => isCached === false);
  }

  constructor(props) {
    super(props);

    this.state = {
      selections: null,
      variationId: null,
      variationImageSrc: '',
      quantity: 1
    };

    this.receiveSelections = this.receiveSelections.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeSelection = this.removeSelection.bind(this);
    this.handleQuantityInput = this.handleQuantityInput.bind(this);
    this.quantityInputRef = React.createRef();
  }

  getCategories() {
    return this.props.product.categories.map(category => category.name).join(', ');
  }

  getImageGallery() {
    return this.props.product.images.map(image => ({ original: image.src }));
  }

  /**
   * Modify component's state when a variation is selected.
   * @param {Object} selections
   * @param {Number} variationId
   * @param {String} variationImageSrc
   */
  receiveSelections(selections, variationId, variationImageSrc = '') {
    this.setState({ selections, variationId, variationImageSrc });
  }

  /**
   * Remove selection
   */
  removeSelection(name){
    let selections = this.state.selections;
    delete selections[name];

    if( _.size(selections) === 0 ){
      this.setState({selections: [], variationId: null, variationImageSrc: ''});
    }
    else{
      this.setState({selections: selections});
    }
  }

  /**
   * Handle a quantity input
   */
  handleQuantityInput(value){
    this.setState({quantity: value})
  }

  /**
   * Add product to cart.
   * Display a warning if the product has variations and attributes were not selected.
   */
  addItem() {
    if (this.props.product.variations.length !== 0) {
      if (_.size(this.state.selections) < _.size(this.props.product.attributes)) {
        Alert.info('Alcune opzioni sono da selezionare')
        return;
      }
    }

    const { dispatch, product } = this.props;

    let description = 'Prodotto aggiunto';
    // Nel caso sia stato inserito il valore tramite tastiera
    let quantity = Number(this.quantityInputRef.current.getValue()) || 1;
    if(quantity > 1) {
      description = `Aggiunti ${quantity} prodotti`; 
    }

    dispatch(
      addProduct(
        product.id,
        product.name,
        product.price,
        quantity,
        this.state.variationImageSrc || product.images[0].src,
        this.state.variationId,
        this.state.selections,
      ),
    );

    Notification['info']({
      title: 'Carrello',
      description: description
    })
  }

  render(){
    const product = this.props.product
    return (
      <FlexboxGrid justify='space-between'>
        <FlexboxGrid.Item 
          componentClass={Col} 
          colspan={1}
          xs={24} sm={12} md={6} lg={6} 
        >
          <Grid fluid>
            <Row style={{textAlign:'center'}}>
              <img src={ _.isNil(this.state.variationId) ? this.props.product.images[0].src : this.state.variationImageSrc }
                className='product-image'
                style={{marginBottom:'10px'}}
              />
            </Row>
            <Row>
              <Col xs={5} sm={4} mdHidden lgHidden/>
              <Col xs={14} sm={16} md={24} lg={24}>
                <Row>
                  {this.props.product.variations.length === 0 ? null : (
                    <Variations
                      sendSelections={this.receiveSelections}
                      productId={this.props.product.id}
                      variationIds={this.props.product.variations}
                      removeSelection={this.removeSelection}
                    />
                  )}
                </Row>
                <Row>
                  <InputNumber
                    placeholder='Quantità'
                    min={1}
                    onChange={this.handleQuantityInput}
                    ref={ this.quantityInputRef }
                    style={{margin:'auto'}}
                  />
                </Row>
                <Row style={{textAlign:'center'}}>
                  <Button 
                    appearance='primary' 
                    onClick={this.addItem}
                    style={{margin:'10px 0'}}
                    >
                    Aggiungi al carrello
                  </Button>
                </Row>   
              </Col>
            </Row>
          </Grid>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item  
          componentClass={Col} 
          colspan={1}
          xs={24} sm={12} md={18} lg={18}
        >
          <Panel header={product.name}>
            <div dangerouslySetInnerHTML={{__html:product.description}}/>
          </Panel>
        </FlexboxGrid.Item>

      </FlexboxGrid>
    )
  }


  render_old() {/*
    const anyCached =
      ProductDetails.isAnyCached(this.getImageGallery())[0] === false
        ? ProductDetails.isAnyCached(this.getImageGallery())[0]
        : true;

    return (
      <div>
        <Header textAlign="center" className="break-words">
          {this.props.product.name}
        </Header>
        <Card centered>
          <ImageGallery
            items={this.getImageGallery()}
            slideDuration={550}
            showPlayButton={false}
            showThumbnails={false}
            showNav={window.navigator.onLine || anyCached}
            disableSwipe={!window.navigator.onLine || !anyCached}
          />
          {this.props.product.rating_count > 0 ? (
            <Card.Content extra>
              <Rating
                rating={Math.round(Number(this.props.product.average_rating))}
                ratingCount={this.props.product.rating_count}
              />
            </Card.Content>
          ) : null}
          {this.props.product.categories.length === 0 ? null : (
            <Card.Content>{this.getCategories()}</Card.Content>
          )}
          <Card.Content>{this.props.product.in_stock ? 'In Stock' : 'Out of Stock'}</Card.Content>
          {this.props.product.price ?
            (<Card.Content>
              <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + this.props.product.price }} />
            </Card.Content>) : null}
          {this.props.product.variations.length === 0 ? null : (
            <Variations
              sendSelections={this.receiveSelections}
              productId={this.props.product.id}
              variationIds={this.props.product.variations}
            />
          )}
          {this.props.product.backorders_allowed || this.props.product.in_stock ? (
            <Button color="purple" fluid onClick={this.addItem}>
              ADD TO CART &nbsp;<Icon name="cart" />
            </Button>
          ) : null}
        </Card>
        {this.props.product.description.length === 0 ? null : (
          <Card centered>
            <Card.Content>
              <Card.Header as={Header} size="tiny">
                Description
              </Card.Header>
              <Card.Description>
                <div dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
              </Card.Description>
            </Card.Content>
          </Card>
        )}
        <Reviews productId={this.props.product.id} />
        <SocialBox permalink={this.props.product.permalink} />
      </div>
    );
  */
  }
}

ProductDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  product: productPropType.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ /*addProduct*/ }, dispatch));
}

export default connect(null, mapDispatchToProps)(ProductDetails);
