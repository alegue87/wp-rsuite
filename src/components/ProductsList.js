import PropTypes from 'prop-types';
import React, { Component } from 'react';
//import { Header } from 'semantic-ui-react';
import { Panel, FlexboxGrid } from 'rsuite'
import ProductCard from './ProductCard';
import { productPropType } from '../views/Products/reducer';

class ProductsList extends Component {
  render() {
    const list = this.props.products.map(element => (
      <FlexboxGrid.Item>
        <ProductCard
          key={element.id}
          id={element.id}
          images={element.images}
          name={element.name}
          price={element.price}
          categories={element.categories}
        />
      </FlexboxGrid.Item>
    ));

    return (
      <FlexboxGrid justify='center'>
        {list}
      </FlexboxGrid>
    );
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  title: PropTypes.string.isRequired,
};

export default ProductsList;
