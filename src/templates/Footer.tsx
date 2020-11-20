import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 350px;
    z-index: -2;
`;
export const Footer: React.FC<{}> = () => {
    return <FooterContainer className="bg-dark p-0">Footer</FooterContainer>;
};
