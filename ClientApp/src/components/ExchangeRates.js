import React, { Component } from 'react';

export class ExchangeRates extends Component {
    constructor(props) {
        super(props);
        this.textInput = null;
        this.state = {
            productName: "",
            productDescription: "",
            propertyName: "",
            propertyValue: "",
            photo: "",
            properties: []
            //{propertyname":"name","proertyvalue":"value"}
        };
    }

    componentDidMount() {
        fetch('https://any.ge/currency/api.php?ids=42,14')
            .then(res => console.log(res))
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
