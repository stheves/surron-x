import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Footer } from '../templates/Footer';
import { FrontPage } from '../templates/FrontPage';
import Menu from '../components/Menu';
import { NotFound } from '../components/NotFound';
import { StateContext, createDefaultState, GlobalStateContext } from './stateContext';

export interface AppProps {
    config?: any;
}
const state = createDefaultState();
const context = {
    state,
} as GlobalStateContext;
const App = (props: AppProps) => {
    return (
        <StateContext.Provider value={context}>
            <Router>
                <Menu />
                <Switch>
                    <Route exact to="/" component={FrontPage} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </Router>
        </StateContext.Provider>
    );
};
export default App;
