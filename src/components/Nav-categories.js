import React from 'react';
import { Dropdown } from 'rsuite'
import { Link } from 'react-router-dom'

export default class DropdownCategories{

  constructor(list, eventKey = 7){
    this.ids = []
    this.eventKey = eventKey
    /*
    this.list = [
      {id:1, name:'musica', parent: 0},
      {id:2, name:'vestiti', parent: 0},
      {id:3, name:'album', parent: 1},
      {id:4, name:'singolo', parent:1},
      {id:5, name:'maglie', parent:2},
      {id:6, name:'frutta', parent:0},
      {id:7, name:'susine', parent:6},
      {id:8, name:'blues', parent:3}
    ]
    */
    this.list = list
    this.dropdowns = []
  }

  make(){
    if( this.list.length === 0) return;
    
    return (
      <Dropdown title='Categorie'>
        { this.makeDropdowns(this.list) }
      </Dropdown>
    )
  }

  makeDropdowns(list){
    
    let items = []

    for(const i in list) {
      let item = list[i]

      if( this.ids.indexOf(item.id) > -1 ) continue
      else this.ids.push(item.id)
      
      if(this.haveChilds(item.id)){
        let childs = []
        this.getChilds(item.id, childs)
        
        items.push(
          <Dropdown.Menu title={item.name}>
            {this.makeDropdowns(childs)}
          </Dropdown.Menu>
        )
      }
      else{
        items.push( 
          <Dropdown.Item eventKey={this.eventKey++}><Link to={'/category/'+item.id}>{item.name}</Link></Dropdown.Item>)
      }
    }
    return items
  }
               
  haveChilds(parentId){
    return this.list.find( i => i.parent === parentId )
  }

  getChilds(parentId, childs = []){
    this.list.forEach( (item, i) => {
      if( item.parent === parentId ) {
        childs.push(item)
        this.getChilds(item.id, childs)
      }
    })
  }
}

