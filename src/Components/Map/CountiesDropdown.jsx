import React, { Component } from 'react';

import judete from 'assets/data/county.json'

export default class Dropdown extends Component {
    constructor() {
        super();

        this.state = {
            displayMenu: false,
            judete: [
                {
                    id: 1,
                    nume: "Iasi",
                    lat_centru: 44,
                    long_centru: 55
                },
                {
                    id: 2,
                    nume: "Bucuresti",
                    lat_centru: 42,
                    long_centru: 34
                },
                {
                    id: 3,
                    nume: "Timisoara",
                    lat_centru: 33,
                    long_centru: 41
                }
            ]
        };


        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({displayMenu: true}, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({displayMenu: false}, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    render() {
        return (
            <div className="dropdown_container">
                <div className="button" onClick={this.showDropdownMenu}>{"  "} Alege judetul:{"  "}</div>

                { this.state.displayMenu ? (
                    <div>
                        {judete.map((item, key) => {
                            return (
                                <div className="element_dropdown" key={item.id}>{item.nume}</div>

                            );
                        })}
                    </div>

                ) :
                    ""
                }

            </div>

        );
    }
}