import Profile from "../Components/Profile";
import {connect} from "react-redux";
import { useRadioGroup } from "@material-ui/core";

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)