import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    position: fixed;
    padding: 0;
    bottom: 0;
    width: 100%;
    height: 350px;
    z-index: -2;
`;
export const Footer: React.FC<{}> = () => {
    return (
        <FooterContainer className="bg-dark">
            <h1>Footer</h1>
        </FooterContainer>
    );
};
