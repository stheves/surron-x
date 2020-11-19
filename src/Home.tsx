import React from 'react';

export interface HomeProps {
    title?: string;
}
export const Home: React.FC<HomeProps> = props => {
    return <div>Home</div>;
};
