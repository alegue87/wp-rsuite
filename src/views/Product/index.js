import React from 'react';

export default class Product extends React.Component {
	
	render(){
		console.log(this.props)
		return <div>Prodotto '{this.props.match.params.productId}'</div>;
	}
}