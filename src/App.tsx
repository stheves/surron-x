import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Footer } from './Footer';
import { Home } from './Home';
import { NotFound } from './NotFound';

export interface AppProps {
    config?: any;
}

const App = (props: AppProps) => {
    return (
        <BrowserRouter>
            <Container>
                <Navbar expand="lg" variant="light" bg="light">
                    <NavbarBrand href="/">Navbar</NavbarBrand>
                </Navbar>
                <Switch>
                    <Route exact to="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </Container>
        </BrowserRouter>
    );
};
export default App;
