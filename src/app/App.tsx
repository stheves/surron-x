import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from '../components/Menu';
import { Footer } from '../templates/Footer';
import Content from './Content';
import { createDefaultState, GlobalStateContext, StateContext } from './stateContext';

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
                <Content />
                <Footer />
            </Router>
        </StateContext.Provider>
    );
};
export default App;
