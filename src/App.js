import './App.css';
import './main.style'

import { Button, Container, Header, Content, Footer } from 'rsuite';
import {Navigation} from './components/Nav'

import React, { Component } from 'react';
//import ReduxToastr from 'react-redux-toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Sidebar } from 'semantic-ui-react';
import { withRouter } from 'react-router';

//import { isMenuVisible } from './components/NavBar/reducer';
//import { closeMenu } from './components/NavBar/actions';
//import NavBar from './components/NavBar';
//import SideMenu from './views/SideMenu';


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
          <Content>{this.props.children}</Content>
          <Footer style={{ ...footerContainer }}>Footer</Footer>
        </Container>
      </div>
    );
  }
}


/*
class App extends Component {
  constructor(props) {
    super(props);

    this.hideSidebar = this.hideSidebar.bind(this);
  }

  hideSidebar() {
    if (this.props.sideMenuVisible) {
      this.props.closeMenu();
    }
  }

  render() {
    return (
      <div>
        <ReduxToastr
          timeOut={4000}
          newestOnTop
          preventDuplicates
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <Sidebar.Pushable>
          <SideMenu isVisible={this.props.sideMenuVisible} closeMenu={this.props.closeMenu} />
          <Sidebar.Pusher dimmed={this.props.sideMenuVisible} onClick={this.hideSidebar}>
            <NavBar />
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
*/
App.propTypes = {
  sideMenuVisible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

App.defaultProps = {
  children: null,
};

const mapStateToProps = state => ({
  //sideMenuVisible: isMenuVisible(state.navbar),
});

export default withRouter(
  connect(
    mapStateToProps,
    { /*closeMenu*/ },
  )(App),
);
