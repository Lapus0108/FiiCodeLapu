import {connect} from "react-redux";
import Receipt from "../../Components/Cart/Receipt";



const mapStateToProps = (state) => {
    return {
        total: state.cart.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)