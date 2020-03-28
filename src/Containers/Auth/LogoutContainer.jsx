import {connect} from "react-redux";
import {userLogout} from 'Actions/Auth/authActions';
import Logout from 'Components/Auth/Logout';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLogout: () => {
            dispatch(userLogout())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)