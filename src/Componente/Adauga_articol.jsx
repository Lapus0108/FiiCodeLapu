import React, {Component} from 'react';
import axios from "axios";

class AddArticles extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "",
            description: "",
            price: "",
            county: "",
            negociabil: false,
            bifa2: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChange1 = () => {
        this.setState(initialState => ({

            negociabil: !initialState.negociabil
        }));
    }

    onChange2 = () => {
        this.setState(initialState => ({
            bifa2: !initialState.bifa2,

        }));
    }

    handleSubmit(event) {
        const {
            name,
            description,
            price,
            county,
            negociabil: negociabil,
            bifa2

        } = this.state;
        axios.post("DATABASE", {
                user: {
                    name: name,
                    description: description,
                    price: price,
                    county: county,
                    negociabil: negociabil,
                    bifa2: bifa2
                }

            },
            {withCredentials: true}
        ).then(response => {
            console.log("registration res", response);
        }).catch(error => {
            console.log("registration error", error);
        })
        event.preventDefault();
    }

    render() {
        return (
            <>
            <div className="title_addarticles">
                Adauga un produs nou pe piata:
            </div>
            <div className="container_add_product">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name:"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required/>

                    <input
                        type="text"
                        name="description"
                        placeholder="Describe your product:"
                        value={this.state.description}
                        onChange={this.handleChange}
                        required/>


                    <input
                        type="text"
                        name="price"
                        placeholder="Price(RON):"
                        value={this.state.price}
                        onChange={event => this.setState({price: event.target.value.replace(/\D/, '')})}
                        required/>

                    <input
                        type="text"
                        name="county"
                        placeholder="County:"
                        value={this.state.county}
                        onChange={this.handleChange}
                        required/>

                    <div className="add_product_bifa ">
                        {/* trebuie pus link */}
                        <label className="containerTermeni">

                            <input
                                onChange={this.onChange1}
                                type="checkbox"
                                checked={this.state.negociabil}
                            />
                            I would like to receive negotiation offers
                            <span className="checkmarkTermenisiConditii"/>
                        </label>
                    </div>

                    <div className="add_product_bifa ">
                        {/* trebuie pus link */}
                        <label className="containerTermeni">

                            <input
                                onChange={this.onChange2}
                                type="checkbox"
                                checked={this.state.bifa2}
                            />
                            I assure that the declared data are real
                            <span className="checkmarkTermenisiConditii"/>
                        </label>
                    </div>

                    <button type="submit">Add you product</button>

                </form>
            </div>
            </>
        );
    }
}

export default AddArticles;