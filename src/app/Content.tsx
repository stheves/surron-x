import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { NotFound } from '../components/NotFound';
import { FrontPage } from '../templates/FrontPage';
const MainContainer = styled.div`
    margin-bottom: 350px;
`;
const Content: React.FC<{}> = () => {
    return (
        <MainContainer>
            <Switch>
                <Route exact to="/" component={FrontPage} />
                <Route component={NotFound} />
            </Switch>
        </MainContainer>
    );
};

export default Content;
