import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Footer } from './Footer';
import { Home } from './Home';
import Menu from './Menu';
import { NotFound } from './NotFound';

export interface AppProps {
    config?: any;
}

const App = (props: AppProps) => {
    return (
        <Router>
            <Menu />
            <Switch>
                <Route exact to="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </Router>
    );
};
export default App;
