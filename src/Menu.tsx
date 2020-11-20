import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export interface MenuProps {}

const Menu: React.FC<MenuProps> = props => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="text-uppercase fixed-top">
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                <Nav>
                    <Nav.Link href="/home">Home</Nav.Link>
                    <NavDropdown title="Shop" id="collapsible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Nav.Link href="#">
                <FontAwesomeIcon icon={faShoppingCart} />
            </Nav.Link>
        </Navbar>
    );
};

export default Menu;
