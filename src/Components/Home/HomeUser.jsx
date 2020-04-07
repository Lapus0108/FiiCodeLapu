import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Profile from '../../assets/images/buttons/Profile.svg';
import About from '../../assets/images/buttons/About.svg';
import Products from '../../assets/images/buttons/Products.svg';
import Logout from '../../assets/images/buttons/Logout.svg';

export default class HomeGuest extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div class="row h-75 w-100 justify-content-center no-margin">
                <div class="row w-100 h-25 mb-5 mb-lg-0">
                    <div class="d-flex justify-content-end col-lg-6 p-1 p-lg-3">
                        <div class="col-lg-6">
                            <Link to="/profile">
                                <img src={Profile} alt="profile"/>
                            </Link>
                        </div>
                    </div>
                    <div class="d-flex justify-content-start col-lg-6 p-1 p-lg-3">
                        <div class="col-lg-6">
                            <Link to="/logout">
                                <img src={Logout} alt="logout"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="row w-100 h-25 mt-5 mt-lg-0">
                    <div class="d-flex justify-content-end col-lg-6 p-1 p-lg-3">
                        <div class="col-lg-6">
                            <Link to="/products">
                                <img src={Products} alt="products"/>
                            </Link>
                        </div>
                    </div>
                    <div class="d-flex justify-content-start col-lg-6 p-1 p-lg-3">
                        <div class="col-lg-6">
                            <Link to="/about">
                                <img src={About} alt="about"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
