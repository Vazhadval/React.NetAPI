import React, { Component } from 'react';
import { Button } from 'reactstrap';



const ProductCard = ({ name, description, onClick, photo }) => {
    return (
        <div className="card m-3" style={{ width: 250 }}>
            <img className="card-img-top" style={{ height: 250 }} src={photo} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <a href="#" className="btn btn-primary">Details</a>
                <Button
                    onClick={onClick}
                    className="btn btn-danger text-white ml-3"
                >
                    Delete
                           </Button>
            </div>
        </div>
    );
}

export default ProductCard;

