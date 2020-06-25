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

    // Get all attribute combinations so that they can be saved to the state
    const attributes = this.props.variations.map(variation => variation.attributes);

    const options = {};

    // initialize options with the corresponding values
    optionNames.forEach(function (optionName) {
      options[optionName] = this.getOptionValues(optionName);
    }, this);

    this.state = {
      options,
      optionNames,
      attributes,
    };
  }

  // function that returns all the possible initial values for an option
  getOptionValues(optionName) {
    const values = _.uniq(
      this.props.variations.map((variation) => {
        const element = variation.attributes.find(attribute => attribute.name === optionName);

        return element.option;
      }),
    );
    return values;
  }

  // function that triggers when an option value is selected and  changes the available values for the rest of the options
  remakeValues(item) {
    // get all the attribute combinations that have the selected value
    const filteredAttributes = _.filter(this.state.attributes, attribute => !_.isNil(_.find(attribute, ['option', item.value])));
    //const filteredAttributes = this.state.attributes
    const options = this.state.options;

    // buid new options array with different values based on the selected one
    this.state.optionNames.forEach((optionName) => {
      if (optionName !== item.label) { //data.placeholder) {
        options[optionName] = filteredAttributes.map(attribute => _.find(attribute, ['name', optionName]).option);
      }
    });

    this.setState({
      options,
    });

    //this.props.handleSelect(data.placeholder, data.value);
    this.props.handleSelect(item.label, item.value)
  }

  render() {
    // get options and values in the same order provided by a  for...in loop
    const options = Object.keys(this.state.options);
    const valuesArray = Object.values(this.state.options);

    // build a values object in the format that the semantic ui dropdown component expects
    const dropdownValues = valuesArray.map(valueArray => valueArray.map(value => ({ value, label: value })));

    const dropdowns = options.map((name, index) => (
      <SelectPicker 
        data={dropdownValues[index]}
        onSelect={ (value, item, event) => this.remakeValues(item) }
        onClean={ () => alert('clean') }
      >
      </SelectPicker>
    ));

    return <Panel style={{minHeight:'300px'}}>{dropdowns}</Panel>;
  }
}

VariationsDropdown.propTypes = {
  variations: PropTypes.arrayOf(variationPropType).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default VariationsDropdown;

