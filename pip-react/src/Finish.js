import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

class Finish extends Component {
    constructor(props) {
        super();

    }
    render() {
        return (
            <div className="card card-cascade wider reverse">
                {/*<ToastContainer autoClose={2000}/>*/}
                <div className="view view-cascade overlay">
                    <img className="card-img-top" src="https://media.mlodziwlodzi.pl/uploads/2018/01/Say-hy-to-the-future.png"/>
                        <a >
                            <div className="mask rgba-white-slight"></div>
                        </a>
                </div>

                <div className="card-body card-body-cascade text-center">

                    <h4 className="card-title"><strong>Udalo ci sie ukonczyc ankiete</strong></h4>
                    <h6 className="font-weight-bold indigo-text py-2">Wykonales dobra robote</h6>
                    <p className="card-text">Do zobaczenia przy kolejnych ankietach :)</p>
                </div>

            </div>
        )
    }
}

export default Finish;