import React, {Component} from 'react';
import background from "./assets/images/retro-wallpaper-1.jpg";
import './App.css';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import RouterContainer from "./Router/RouterContainer";
import CookieConsent from "react-cookie-consent";
import MediaQuery from "react-responsive";
// import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


export default class App extends Component {
    render() {
        
        return (
            
            <div className="total">
                <div className="background_map_page">
                        <img src={background}/>
                    </div>
                <ReactNotification />
                <RouterContainer />
                <CookieConsent
                    location="bottom"
                    buttonText="I agree"
                    cookieName="Retrosite_cookies"
                    style={{background: "#2B373B"}}
                    buttonStyle={{color: "#4e503b", fontSize: "13px", fontWeight: "bold", borderRadius: "20px"}}
                    expires={150}
                    onAccept={() => {
                        console.log("Cookies accepted by user")
                    }}
                >
                    This website uses cookies to enhance the user experience. By using our website you consent to
                    all cookies in accordance with our Cookies Policy{" "}
                </CookieConsent>
            </div>
        );
    }
}
