import React from 'react';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

export interface HomeProps {
    title?: string;
}

const HeaderCarousel = styled(Carousel)`
    height: 500px;
`;

export const FrontPage: React.FC<HomeProps> = props => {
    return (
        <HeaderCarousel>
            <Carousel.Item>
                <img className="d-block w-100" src="images/moto-1.jpg" alt="First slide" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="images/moto-2.jpg" alt="First slide" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="images/moto-2.jpg" alt="First slide" />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </HeaderCarousel>
    );
};