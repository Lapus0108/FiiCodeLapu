import {userLogin} from "../Actions/Auth/authActions";
import {connect} from "react-redux";
import Login from "../Componente/Login";

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (user) => {
            dispatch(userLogin(user))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)