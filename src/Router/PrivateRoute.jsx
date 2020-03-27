import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        this.state.isLoggedIn === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = () => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)