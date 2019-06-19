import React, { Component } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { withRouter, Link } from "react-router-dom";

class Error extends Component {
    render() {
        return (
            <div className="card card-cascade wider reverse">
                <div className="card-body card-body-cascade text-center">

                    <h4 className="card-title"><strong>Coś się zepsuło :(</strong></h4>
                    <Link to={this.props.redirectError}> <h6 className="font-weight-bold indigo-text py-2">Sprawdź link i spróbuj ponownie</h6></Link>
                    <p className="card-text">Jeśli problem się powtarza - najpewniej już nad tym pracujemy :)</p>
                </div>


            </div>
        )
    }
}

export default withRouter(Error);