import {addToCart} from 'Actions/Cart/cartActions';
import {connect} from "react-redux";
import Products from 'Components/Products/Products';

const mapStateToProps = (state) => {
    return {
        items: state.cart.items,
        isLoggedIn:state.auth.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => {
            dispatch(addToCart(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)