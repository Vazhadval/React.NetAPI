import React, { Component, Fragment } from 'react';
import { Button, Form } from 'reactstrap';
import { param } from 'jquery';
import Axios from 'axios';
import ProductCard from '../components/ProductCard';



export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            searchTerm: ""
        };


    }

    componentDidMount() {
        this.fetchProducts();
    }





    static renderProducts(products, searchTerm, handleDelete, handleSearchOnChange, handleOnKeyPress, handleSearch) {

        return (
            <div>
                <div className="form-inline">
                    {
                        products.length > 0 ?
                            <Fragment>
                                <input
                                    className="form-control form-control col-md-5"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={(e) => handleSearchOnChange(e)}
                                    value={searchTerm}
                                    onKeyPress={(e) => handleOnKeyPress(e)}
                                />
                                <a
                                    className="btn btn-secondary btn ml-3"
                                    onClick={handleSearch}
                                >
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </a>
                            </Fragment>
                            : null
                    }


                </div>
                <div>
                </div>
                <div className="row">
                    {products.map(product =>
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            description={product.description}
                            onClick={() => handleDelete(product.id)}
                            photo={product.photoUrl}
                        />
                    )}
                </div>
            </div >
        );
    }

    handleSearch = () => {
        Axios.get('https://localhost:44329/api/Products/SearchProduct', { params: { searchTerm: this.state.searchTerm } })
            .then((res) => this.setState({ products: res.data }));


        //this.setState({ product: res.data });
    }

    handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }

    handleSearchOnChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    }

    handleDeleteProduct = (productId) => {
        var data = {
            id: productId
        };
        Axios.post('https://localhost:44329/api/Products/DeleteProductById', data, null)
            .then((res) => {

                let oldState = [...this.state.products];
                oldState = oldState.filter(p => p.id != productId);
                this.setState({ products: oldState });

            })
            .catch(err => console.warn(err));

    }

    fetchProducts() {
        fetch('https://localhost:44329/api/Products/GetAll')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data, loading: false });
            });
    }



    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderProducts(this.state.products, this.state.searchTerm, this.handleDeleteProduct, this.handleSearchOnChange, this.handleOnKeyPress, this.handleSearch);

        return (
            <div>
                <h1>Products</h1>
                {contents}
            </div>
        );
    }
}
