import React from 'react';
import { connect } from 'react-redux';
import { bindActionsCreator } from 'redux';
import { fetchCategories } from '../views/Categories/actions';
import { getCategories } from '../views/Categories/reducer';
import { Dropdown } from 'rsuite'

class DropdownCategories extends React.Component {

  componentDidMount(){
    const { dispatch } = this.props
    fetchCategories()(dispatch)
  }

  render(){
    const { categories, eventKeyStart } = this.props;

    if( categories.length > 0 ){
      let eventKey = eventKeyStart;
      let category_items = Object.keys(categories)
        .map( i => 
          <Dropdown.Item eventKey={eventKey++}>{categories[i].name}</Dropdown.Item>
        )
      return (
        <Dropdown title='Categorie'>
          { category_items }
        </Dropdown>
      )
    }
    return (<div></div>)
  }
}

const mapStateToProps = (state) => {
  return { categories: getCategories(state.categories) }
}

const mapDispatchToProps = dispatch => {
  return Object.assign({ dispatch })
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownCategories)