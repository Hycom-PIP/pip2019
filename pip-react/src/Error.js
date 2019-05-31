import React, { Component } from 'react';
import "react-toastify/dist/ReactToastify.css";

class Error extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="card card-cascade wider reverse">
                <div className="card-body card-body-cascade text-center">

                    <h4 className="card-title"><strong>Coś się zepsuło :(</strong></h4>
                    <h6 className="font-weight-bold indigo-text py-2">Sprawdź link i spróbuj ponownie</h6>
                    <p className="card-text">Jeśli problem się powtarza - najpewniej już nad tym pracujemy :)</p>
                </div>


            </div>
        )
    }
}

export default Error;