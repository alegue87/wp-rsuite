import React from 'react'
import ReactDOM from 'react-dom'
import { Nav, Navbar, Icon, Dropdown, Sidenav, Divider } from 'rsuite';
import  DropdownCategories from './DropdownCategories';
import { connect } from 'react-redux';
import { bindActionsCreator } from 'redux';
import { fetchCategories } from '../../views/Categories/actions';
import { getCategories } from '../../views/Categories/reducer';
import { Link } from 'react-router-dom';
import './style.css'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { parentWidth: 2000, expanded: false, activeKey: null }

    this.handleExpandSide = this.handleExpandSide.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.setState({ parentWidth: ReactDOM.findDOMNode(this).parentNode.clientWidth })

    var that = this
    const debouncedHandleResize = debounce(function handleResize() {
      that.setState({ 'parentWidth': ReactDOM.findDOMNode(that).parentNode.clientWidth })
    }, 300)

    window.addEventListener('resize', debouncedHandleResize)

    const { dispatch } = this.props
    fetchCategories()(dispatch)

  }

  handleExpandSide(){
    this.setState({expanded: !this.state.expanded})
  }
  handleSelect(activeKey){
    this.setState({activeKey: String(activeKey)})
  }

  render() {

    const { categories } = this.props;
    const { expanded } = this.state;

    if (this.state.parentWidth < window.viewPorts.sm) {
      return (
        <Sidenav
          appearance='inverse'
          expanded={expanded} 
          className={ expanded ? ''  : 'sidenav-compact' }
          defaultOpenKeys={[]}
          activeKey={this.state.activeKey}
          onSelect={this.handleSelect}
        >
          <Sidenav.Body>
            <Navbar.Body>
              <Nav onSelect={this.props.onSelect} activeKey={this.props.activeKey}>
                <Nav.Item onClick={this.handleExpandSide}
                  eventKey="1" 
                  style={{height: 56}}
                  icon={<Icon icon="bars" size='lg' />}
                  componentClass='span'>
                  <Link to={'/'}></Link>
                </Nav.Item>

                <Nav.Item 
                  eventKey="2" 
                  componentClass='span'>
                  <a href='/products'>Prodotti</a>
                </Nav.Item>
                
                <Dropdown title="Altro" eventKey='a'>
                  <Dropdown.Item eventKey="4">
                    <a href='/company/'>Company</a>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="5"><Link to={'/'}>Team</Link></Dropdown.Item>
                  <Dropdown.Item eventKey="6"><Link to={'/'}>Contact</Link></Dropdown.Item>
                </Dropdown>

                <Nav.Item eventKey="7" componentClass='span' icon={<Icon icon='shopping-cart'/>}>
                  <Link to={'/cart'}>
                    Carrello
                  </Link>
                </Nav.Item>

                <Divider/>

                {DropdownCategories(categories, '8')}
              </Nav>
            </Navbar.Body>
          </Sidenav.Body>
        </Sidenav>
      )
    }
    else
      return (
        <Navbar {...this.props} className='main-nav'>
          <Navbar.Header>
            <a href="/" className="navbar-brand logo">
              LOGO
            </a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav onSelect={this.props.onSelect} activeKey={this.props.activeKey}>
              <Nav.Item 
                eventKey="1"
                componentClass='span' icon={<Icon icon="home" />}>
                <Link to={'/'}>Home</Link>
              </Nav.Item>

              <Nav.Item 
                eventKey="2" 
                componentClass='span'>
                <a href='/products'>Prodotti</a>
              </Nav.Item>
              
              <Dropdown title="Altro">
                <Dropdown.Item eventKey="4">
                  <a href='/company/'>Company</a>
                </Dropdown.Item>
                <Dropdown.Item eventKey="5">Team</Dropdown.Item>
                <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
              </Dropdown>

              <Nav.Item eventKey="7" componentClass='span' icon={<Icon icon='shopping-cart'/>}>
                <Link to={'/cart'} >
                  Carrello
                </Link>
              </Nav.Item>

              {DropdownCategories(categories, '8')}
            </Nav>

            <Nav pullRight>
              <Nav.Item 
                componentClass='span'
                icon={<Icon icon="cog" />}>
                <Link to={'/'}>Settings</Link>
              </Nav.Item>
            </Nav>

          </Navbar.Body>
        </Navbar>
      );
  }

};

const mapStateToProps = (state) => {
  return { categories: getCategories(state.categories) }
}

const mapDispatchToProps = dispatch => {
  return Object.assign({ dispatch })
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)


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
