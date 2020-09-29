import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };

        fetch('https://localhost:44329/api/Products/GetAll')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ products: data, loading: false });
            });
    }

    static renderProducts(products) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>
                                <img style={{ width: 100 }} src={product.photoUrl.substring(56, product.photoUrl.length)} />
                            </td>
                            {product.properties.map(property => {
                                <td>{property.propertyName}</td>
                            })}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderProducts(this.state.products);

        return (
            <div>
                <h1>Products</h1>
                {contents}
            </div>
        );
    }
}
