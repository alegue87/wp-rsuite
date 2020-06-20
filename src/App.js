import React from 'react';
import './App.css';
import './main.style'

import { Button, Container, Header, Content, Footer } from 'rsuite';
import {Navigation} from './components/Nav'

const mainContainer = {
  height: '100vh',
}

const headerContainer = {
  height: '50px',
  backgroundColor: '#3498FF'
}

const footerContainer = {
  height: '50px',
  backgroundColor: '#3498FF'
}

window.viewPorts = {
  xs: 0, 
  sm: 480, // <=
  md: 960, // <=
  lg: 1200 // <=
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: null
    };
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    const { activeKey } = this.state;

    return (
      <div className="App" >
        <Container style={{ ...mainContainer }}>
          <Header style={{ ...headerContainer }}>
            <Navigation appearance='inverse' onSelect={this.handleSelect} activeKey={activeKey}/>
          </Header>
          <Content>Content</Content>
          <Footer style={{ ...footerContainer }}>Footer</Footer>
        </Container>
      </div>
    );
  }
}

export default App;

