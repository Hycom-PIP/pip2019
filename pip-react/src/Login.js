import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { facebookProvider, app, googleProvider } from './config.js';

require("firebase/auth");

const INITIAL_STATE = {
    email: '',
    password: '',
};

class Login extends Component {
    constructor() {
        super();
        this.authWithFacebook = this.authWithFacebook.bind(this);
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
        this.authWithGoogle = this.authWithGoogle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            redirect: false,
            ...INITIAL_STATE
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    authWithFacebook() {
        // this.setState({redirect: true});
        app.auth().signInWithPopup(facebookProvider)
            .then((result, error) => {
                if (error) {
                    // console.log("ERROR")
                    // this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
                } else {
                    // this.setState({ redirect: true })
                }
            })
    }

    authWithEmailPassword(event) {
        event.preventDefault();
        // console.log(event);
        // console.table([{email: this.emailInput.value, password: this.passwordInput.value}])
        const { email, password } = this.state;
        app.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // this.setState({...INITIAL_STATE});
            })
            .catch(error => {
                // console.log(error) //to be deleted :D
            })

    }

    authWithGoogle() {
        app.auth().signInWithPopup(googleProvider)
            .then((result, error) => {
                if (error) {
                    // console.log("ERROR")
                    // this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
                } else {
                    // this.setState({ redirect: true })
                }
            })
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        // const {redirect} = this.state;
        // console.log(redirect, from, this.props.location.state);
        // console.log("AUTHED?", this.props.isAuthed);
        if (app.auth().currentUser !== null) {
            return (
                <Redirect to={from}/>

            )
        }
        const { email, password } = this.state;
        return (
            <div className="row d-flex justify-content-center">

                <form className="text-center border border-light p-5"
                      onSubmit={(event) => this.authWithEmailPassword(event)}>

                    <p className="h4 mb-4">Sign in</p>

                    <input type="email" name="email" value={email} onChange={this.onChange} id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail"/>

                    <input type="password" name="password" value={password} onChange={this.onChange} id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password"/>

                    <div className="d-flex justify-content-around">
                        <div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember"/>
                                    <label className="custom-control-label" form="defaultLoginFormRemember">Remember me</label>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-info btn-block my-4" type="submit">Sign in</button>

                    <p>Not a member? <br/>
                        <a href="/register"> Register</a>
                    </p>

                    <p>or sign in with:</p>

                    <button type="button" className="light-blue-text mx-2" onClick={() => this.authWithFacebook()}>
                        <i className="fab fa-facebook-f"/>
                    </button>
                    {/*<button type="button" className="light-blue-text mx-2" onClick={() => this.authWithGoogle()}>*/}
                    {/*    <i className="fab fa-google"></i>*/}
                    {/*</button>*/}

                </form>
            </div>

        )
    }
}

export default Login