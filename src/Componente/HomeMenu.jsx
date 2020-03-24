import React from 'react';
import background_auth from "../images/Buton_lemn.png";
import {Link} from 'react-router-dom';

class HomeMenu extends React.Component {
    constructor() {
        super();

        this.state = {};
    };

    render() {
        const {isLoggedIn}=this.props;
        return (
            <>
            <div className="text_dr_sus">Designed and created for FiiCODE 2020</div>
            <div className="homepage_title">Piazeta</div>
            <div className="container_placi">
            {isLoggedIn===false ?
            <div>
            <Link to="/register">
                <div className="container_buton1">
                    
                    <img src={background_auth} alt="create_account"/>
                    <div className="text_home_button">Create account</div>
                    
                </div>
                </Link>
                <Link to="/login">
                <div className="container_buton2">
                    <img src={background_auth} alt="login"/>
                    <div className="text_home_button">Login</div>
                </div>
                </Link>

                <Link to="/products">
                    <div className="container_buton3">
                        <img src={background_auth} alt="products"/>
                        <div className="text_home_button">Products</div>
                    </div>
                    </Link> 
            </div>
            :   <>    <Link to="/products">
                    <div className="container_buton1">
                            <img src={background_auth} alt="products"/>
                            <div className="text_home_button">Products</div>
                    </div>
                    </Link>

                    <Link to="/about_us">
                    <div className="container_buton3">
                        <img src={background_auth} alt="about_us"/>
                        <div className="text_home_button">About us</div>
                    </div>

                    </Link> 
                    
                    <Link to="/logout">
                    <div className="container_buton2">
                            <img src={background_auth} alt="logout"/>
                            <div className="text_home_button">Logout</div>
                    </div>
                    </Link>
</>
            }

                
                <Link to="/mailing">
                <div className="container_buton4">
                    <img src={background_auth} alt="mailing"/>
                    <div className="text_home_button">Mailing</div>
                </div>
                </Link>



            </div>
            </>
        );
    }
}

export default HomeMenu;