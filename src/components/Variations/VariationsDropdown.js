import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
//import { Card, Dropdown } from 'semantic-ui-react';
import { Panel, SelectPicker, Icon, IconButton } from 'rsuite';
import { variationPropType } from './reducer';

class VariationsDropdown extends Component {
  constructor(props) {
    super(props);

    this.remakeValues = this.remakeValues.bind(this);

    // Get all option names so that they can be saved to the state
    const optionNames = this.props.variations[0].attributes.map(attribute => attribute.name);

        // Nota: se la prima variazione non ha tutti gli attributi, questi non vengono
        // visualizzati. Ad esempio se ha un attributo 'any' che da backend non viene passato.

    // Get all attribute combinations so that they can be saved to the state
    const attributes = this.props.variations.map(variation => variation.attributes);

    const options = {};

    // initialize options with the corresponding values
    optionNames.forEach(function (optionName) {
      options[optionName] = this.getOptionValues(optionName);
    }, this);

    this.state = {
      initOptions: Object.assign({}, options),
      options,
      optionNames,
      attributes,
    };
  }

  // function that returns all the possible initial values for an option
  getOptionValues(optionName) {

    let attributeId = 0
    let getAllValues = false // if there is an attribute with value 'any' in backend
    let values = _.uniq(
      this.props.variations.map((variation) => {
        const element = variation.attributes.find(attribute => attribute.name === optionName);
          return element.option
      })
    );
    return values;
  }

  // function that triggers when an option value is selected and  changes the available values for the rest of the options
  remakeValues(item) {
    // get all the attribute combinations that have the selected value
    const filteredAttributes = _.filter(this.state.attributes, attribute => !_.isNil(_.find(attribute, ['option', item.value])));
    const options = this.state.options;

    // buid new options array with different values based on the selected one
    this.state.optionNames.forEach((optionName) => {
      if (optionName !== item.name) {

        options[optionName] = []
        for(let i in filteredAttributes){
          options[optionName] = _.union(
            options[optionName], 
            filteredAttributes[i]
              .filter(attribute => attribute.name === optionName)
              .map(attribute => attribute.option))
        }
      }
    });

    this.setState({
      options,
    });

    this.props.handleSelect(item.name, item.value)
  }

  removeSelection(name){
    this.props.removeSelection(name);
    this.setState({
      options: Object.assign({}, this.state.initOptions)
    })
  }

  render() {
    
    // get options and values in the same order provided by a  for...in loop
    const options = Object.keys(this.state.options);
    const valuesArray = Object.values(this.state.options);

    // build a values object in the format that the semantic ui dropdown component expects
    const dropdownValues = valuesArray.map( (valueArray, i) => valueArray.map(value => (
      { value, label: value, name: options[i] }
    )));

    const dropdowns = options.map((name, index) => (
      <SelectPicker 
        style={{width:'80%', marginBottom:'10px'}}
        placeholder={name}
        data={dropdownValues[index]}
        onSelect={ (value, item, event) => this.remakeValues(item) }
        onClean={ index > 0 ?this.removeSelection.bind(this, name) : null }
        cleanable={true}
        searchable={false}
      >
      </SelectPicker>
    ));

    // altezza minima per evitare il taglio del select al click
    return <Panel>{dropdowns}</Panel>;
  }
}

VariationsDropdown.propTypes = {
  variations: PropTypes.arrayOf(variationPropType).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default VariationsDropdown;

