import React, {Component} from 'react'

export default class Receipt extends Component {

    render() {

        return (
            <div className="container">
                <div className="collection">
                    <li className="collection-item"><b>Total: {this.props.total} $</b></li>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn">Finalizeaza comanda</button>
                </div>
            </div>
        )
    }
}
