import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import HomeGuest from "./HomeGuest";
import HomeUser from "./HomeUser";
import IGlogo from "../../assets/images/Icons/IgLogo.svg";



export default class HomeMenu extends Component {
    constructor() {
        super();

        this.state = {
            rating: 1,
            mesaj_rating: "",
            displayRating: true
        };
    };

    componentDidMount() {
        console.log(this.props.isLoggedIn)
    }

    componentDidUpdate() {
        setTimeout(() => this.setState({displayRating: false}), 3000);
    }

    onStarClick=(nextValue, prevValue, name)=> {
        this.setState({
            rating: nextValue,
            mesaj_rating: "Thank you! You can tell us how to improve on the About Us page!"
        });
    }

    render() {
        return (
            <div class="container-fluid h-100">
                <div class="row h-25">
                    <div class="col-sm-8">
                        <div class="display-1 font-main color-primary text-lg-left">Piazeta</div>
                    </div>
                    <div class="col-sm-4 mt-3">
                        <p class="text-sm-center font-main color-primary" style={{fontSize:25}}>Designed and created for FiiCODE 2020 
                            <a href="https://www.instagram.com/piazetaa/?hl=ro">
                                <img src={IGlogo} style={{width:30, height:30, marginLeft:5}}/>
                                
                            </a>
                        </p>
                        
                    </div>
                </div>
                <div class="row h-75">
                    {this.props.isLoggedIn === false ? <HomeGuest /> : <HomeUser />}
                </div>
                {/*</div>*/}
                {/*{ this.state.displayRating && this.props.isLoggedIn ?*/}
                {/*<div className="review_app">*/}
                {/*<h>Don't forget to leave a review of our app!</h>*/}
                {/*<div className="review_stars">*/}
                {/*<StarRatingComponent*/}
                {/*name="rate_our_app"*/}
                {/*starCount={5}*/}
                {/*value={this.state.rating}*/}
                {/*onStarClick={this.onStarClick}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*<h>{this.state.mesaj_rating}</h>*/}
                {/*</div>*/}
                {/*: ""}*/}
            </div>
        );
    }
}