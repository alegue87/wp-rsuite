import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
//import { Card, Button, Header, Grid } from 'semantic-ui-react';
import config from '../config/config';
import { Panel, Carousel } from 'rsuite';
import _ from 'lodash';
//import CircularImage from './CircularImage';

import './ProductCard.css';

class ProductCard extends Component {
  render() {
    const categories = this.props.categories.map(category => category.name);

    return (
      <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: '240px', margin: '10px 10px' }}>
        { _.size(this.props.images) === 1 
          ? 
          <img src={this.props.images[0].src} style={{height:'240px'}} />
          :
          <Carousel autoplay={true} className='slider'>
            { this.props.images.map( image => <img key={image.id} alt={image.alt} src={image.src}/> )}
          </Carousel>
        }
        <Panel>
          <Link to={'/product/' + this.props.id}>
           {this.props.name}
          </Link>
        </Panel>
      </Panel>
    )
      /*(
      <Card centered>
        <Card.Content>
          <Grid>
            <Grid.Column width={5}>
              <Link to={'/product/' + this.props.id}>
                <CircularImage src={this.props.src} />
              </Link>
            </Grid.Column>
            <Grid.Column width={11}>
              <Card.Header className="break-words">{this.props.name}</Card.Header>
              <Card.Meta>{categories.join(', ')}</Card.Meta>
              {this.props.price ?
                (
                  <Header as="h3" color="purple">
                    <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + this.props.price }} />
                  </Header>
                )
                : null}
            </Grid.Column>
          </Grid>
        </Card.Content>
        <Card.Content extra>
          <Link to={'/product/' + this.props.id}>
            <Button color="purple" compact>
              Shop Now &gt;
            </Button>
          </Link>
        </Card.Content>
      </Card>
    );*/
  }
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductCard;
