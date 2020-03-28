import {connect} from "react-redux";
import {addQuantity, subtractQuantity, removeItem} from 'Actions/Cart/cartActions';
import Cart from 'Components/Cart/Cart';


const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        //addedItems: state.addedItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => {
            dispatch(removeItem(id))
        },
        addQuantity: (id) => {
            dispatch(addQuantity(id))
        },
        subtractQuantity: (id) => {
            dispatch(subtractQuantity(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)