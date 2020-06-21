import React from 'react';

export default class Product extends React.Component {
	render(){
		return <div>Prodotto {this.props.productId}</div>;
	}
}