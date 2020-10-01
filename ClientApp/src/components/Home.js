import React, { Component } from 'react';
import axios from 'axios';
import NotificationAlert from 'react-notification-alert';
import "react-notification-alert/dist/animate.css";



export class Home extends Component {
    static displayName = Home.name;

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


    render() {
        return (
            <div>
                <NotificationAlert ref="notify" />
                <div>
                    <h1>Add Product</h1>
                </div>
                <div className="form-group">
                    <label>Product Name:</label>
                    <div className="form-inline">
                        <input
                            type="text"
                            className="form-control col-md-2"
                            placeholder="Enter Product Name"
                            onChange={(e) => this.handleChangeProductName(e)}
                            value={this.state.productName}
                        />
                    </div>
                    <label>Product Description:</label>
                    <div >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Product Description"
                            onChange={(e) => this.handleChangeProductDescription(e)}
                            value={this.state.productDescription}
                        />
                    </div>
                    <div className="form-inline mt-2 mb-2">
                        <label>Property Name:</label>
                        <input
                            ref={elem => (this.textInput = elem)}
                            type="text"
                            className="form-control col-md-2 ml-2"
                            placeholder="Enter Property name"
                            id="propertyname"
                            onChange={(e) => this.handleChangePropertyName(e)}
                            value={this.state.propertyName}
                        />
                        <label className="ml-2">Property Value:</label>
                        <input
                            type="text"
                            className="form-control col-md-2 ml-2"
                            placeholder="Enter Property Value"
                            id="propertyvalue"
                            onChange={(e) => this.handleChangePropertyValue(e)}
                            value={this.state.propertyValue}
                            onKeyPress={(e) => this.handleOnKeyPress(e)}
                        />
                        <button
                            className="btn btn-success btn-sm ml-2"
                            onClick={() => this.handleConfirm()}

                        >
                            Confirm
                         </button>
                    </div>
                    <div>
                        <ul>
                            {this.renderProperties()}
                        </ul>
                    </div>
                    <div className="custom-file mt-3 col-md-3">
                        <input
                            type="file"
                            className="custom-file-input"
                            accept="image/x-png,image/gif,image/jpeg"
                            onChange={(e) => this.handleFileSelected(e)}
                        />
                        <label className="custom-file-label">Choose Photo</label>
                    </div>
                    <div className="pt-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => this.handleAddProduct()}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    notificationAlert(options) {
        this.refs.notificationAlert.notificationAlert(options);
    }

    handleFileSelected(event) {
        this.setState({ photo: event.target.files[0] });
    }

    handleAddProduct() {
        if (this.state.photo && this.state.productName !== "" && this.state.properties.length > 0) {
            var formData = new FormData();
            formData.append("Name", this.state.productName);
            formData.append("Properties", JSON.stringify(this.state.properties));
            formData.append("Photo", this.state.photo, this.state.photo.name);
            formData.append("Description", this.state.productDescription);

            axios({
                method: 'post',
                url: 'https://localhost:44329/api/Products/AddProduct',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
            this.setState({ productName: "" });
            this.setState({ propertyname: "" });
            this.setState({ propertyValue: "" });
            this.setState({ properties: [] });
            this.setState({ photo: "" });
        }
        else {


            this.refs.notify.notificationAlert(options);
        }
    }

    handleOnKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleConfirm();
        }
    }

    renderProperties() {
        return this.state.properties.map(prop => (
            <li key={Object.values(prop)[0]}>
                {Object.values(prop)[0]} - {Object.values(prop)[1]}
            </li>
        ));
    }

    handleChangeProductName(event) {
        this.setState({ productName: event.target.value });
    }

    handleChangePropertyName(event) {
        this.setState({ propertyName: event.target.value });
    }

    handleChangePropertyValue(event) {
        this.setState({ propertyValue: event.target.value });
    }

    handleChangeProductDescription(event) {
        this.setState({ productDescription: event.target.value });
    }

    handleConfirm() {
        if (this.state.propertyName !== "" && this.state.propertyValue !== "") {
            var obj = { "propertyname": this.state.propertyName, "propertyvalue": this.state.propertyValue };
            this.setState({ properties: [...this.state.properties, obj] });
            this.setState({ propertyName: "" });
            this.setState({ propertyValue: "" });
            this.textInput.focus();
        }
    }
}

var options = {
    place: 'br',
    message: (
        <div>
            <div>
                Fill all fields stranger!
                        </div>
        </div>
    ),
    type: "warning",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 3
}
