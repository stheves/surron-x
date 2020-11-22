import React, { useEffect, useState } from 'react';

export const Products: React.FC<{}> = () => {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        console.log('FETCH');
        let cancel = false;
        fetch('/wp-json/wc/v2/products')
            .then(t => t.json())
            .then(data => {
                if (cancel) return;
                console.log('DATA', data);
                setProductList(data);
            });
        return () => {
            cancel = true;
        };
    }, []);
    console.log('PRODUCTS');
    return (
        <ul>
            {productList.map(product => {
                return <li>product.title.rendered</li>;
            })}
        </ul>
    );
};
