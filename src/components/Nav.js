import React from 'react'
import ReactDOM from 'react-dom'
import { Nav, Navbar, Icon, Dropdown } from 'rsuite';
import './Nav.css'

export class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { parentWidth: 2000 }

  }
  componentDidMount() {
    this.setState({ parentWidth: ReactDOM.findDOMNode(this).parentNode.clientWidth })

    var that = this
    const debouncedHandleResize = debounce(function handleResize() {
      that.setState({ 'parentWidth': ReactDOM.findDOMNode(that).parentNode.clientWidth })
    }, 300)

    window.addEventListener('resize', debouncedHandleResize)
  }


  render() {

    if (this.state.parentWidth < window.viewPorts.sm) {
      return (
        <Navbar {...this.props}>
          <Navbar.Header>
            <a href="/" className="navbar-brand logo">
              RSUITE
            </a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav onSelect={this.props.onSelect} activeKey={this.props.activeKey}>
              <Nav.Item eventKey="1" icon={<Icon icon="bars" />}></Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )
    }
    else
      return (
        <Navbar {...this.props}>
          <Navbar.Header>
            <a href="/" className="navbar-brand logo">
              RSUITE
            </a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav onSelect={this.props.onSelect} activeKey={this.props.activeKey}>
              <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
                Home
              </Nav.Item>
            <Nav.Item eventKey="2">News</Nav.Item>
          <Nav.Item eventKey="3">Products</Nav.Item>
          <Dropdown title="About">
            <Dropdown.Item eventKey="4"><a href='/company/'>Company</a></Dropdown.Item>
            <Dropdown.Item eventKey="5">Team</Dropdown.Item>
            <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
          </Dropdown>
        </Nav>
        <Nav pullRight>
        <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
        </Nav>
        </Navbar.Body>
        </Navbar>
      );
  }

};


function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}
