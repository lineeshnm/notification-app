import React from 'react'
import { 
    Navbar,
    Nav,
    NavItem,
    NavLink
 } from 'react-bootstrap'
import { signout, isAuth } from '../actions/auth';
import {createBrowserHistory} from 'history';

import 'bootstrap/dist/css/bootstrap.min.css';

export const history = createBrowserHistory({forceRefresh:true})

const Header = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">CCB Notifications</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                {isAuth() && (
                    <Nav.Link href="/create">Create Notification</Nav.Link>
                )}
                </Nav>
                <Nav>
                {!isAuth() && (
                    <React.Fragment>
                      <NavItem>
                        <NavLink href="/signin">SignIn</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/signup">SignUp</NavLink>
                      </NavItem>
                    </React.Fragment>
                  )}
                {isAuth() && (
                    <NavItem>
                      <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => history.push(`/signin`))}>
                        Signout
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header