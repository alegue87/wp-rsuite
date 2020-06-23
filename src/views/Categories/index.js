import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionsCreator } from 'redux';
import { fetchCategories } from './actions';
import { getCategories } from './reducer';
import { Link } from 'react-router-dom';

class Categories extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    fetchCategories()(dispatch)
  }

  render(){
    const { categories } = this.props;
    if( categories.length ){
      let categoriesList = Object.keys( categories )
        .map( i => 
          <li>
            <Link to={'/category/'+categories[i].id} >
            {categories[i].name} 
            </Link>
          </li> 
        )
      
      return( 
        <div>
          <ul style={{textAlign:'left'}}>
            {/*Sono da sotto-categorizzare */}
            {categoriesList}
          </ul> 
        </div>
        )
    }
    else{
      return <div>Categorie</div>
    }   
  }
}

function mapDispatchToProps(dispatch) {
  return Object.assign(
    { dispatch },
    //bindActionsCreator( {})
    )
}

function mapStateToProps(state){
  return {
    categories: getCategories(state.categories)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);