import { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  NavbarBrand,
  Button
} from 'reactstrap'
import Logo from '../assets/gadflylogo2.png'

type navProps = {
  token: string
//   logout: () => void 
  userRole: string
}

type navTog = {
  isOpen: boolean
}
export default class Sitebar extends Component<navProps, navTog> {
  constructor(props: navProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  logoutBtn = () => {
    return localStorage.getItem('sessionToken') === null ? (
      ''
    ) : (
      <Link to='/'>
        {/* <Button onClick={this.props.role}>Logout</Button> */}
      </Link>
    // )
    )}

  adminNav = () => {
    return this.props.userRole === 'Socrates' ? (
      <Button>Admin Page</Button>
    ) : (
      <></>
    )
  }

  render() {
    return (
      <div className='Nav'>
        <Navbar>
          <NavbarBrand>
            <Link to='/'>
              <img src={Logo} alt='Gadfly logo' height='100' width='150px' />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} style={{color: '#64b5f6', border: '2px' }} />
          <Collapse isOpen={this.state.isOpen}   navbar>
            <Nav>
              <NavItem>
                <NavLink >
                  <Link to='/' style={{fontFamily: 'Gabriela, serif', color: '#64b5f6'}}>
                    Home
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/post/freewill'>
                    Freewill
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/post/reality'>
                    Reality
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/post/ethics'>
                    Ethics
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/admin'>
                    {this.adminNav()}
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>{this.logoutBtn()}</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}