import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { facebookProvider, googleProvider, app } from './config.js';
require("firebase/auth");

const INITIAL_STATE = {
    // username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.authWithFacebook = this.authWithFacebook.bind(this);
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
        this.onChange = this.onChange.bind(this);
        this.authWithGoogle = this.authWithGoogle.bind(this);
        this.state = {
            redirect: false,
            ...INITIAL_STATE
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    };

    authWithFacebook() {
        app.auth().signInWithPopup(facebookProvider)
            .then((result, error) => {
                if (error) {
                    console.log("ERROR")
                    // this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
                } else {
                    this.setState({ redirect: true })
                }
            })
    }

    authWithGoogle() {
        app.auth().signInWithPopup(googleProvider)
            .then((result, error) => {
                if (error) {
                    console.log("ERROR")
                    // this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
                } else {
                    this.setState({ redirect: true })
                }
            })
    }

    authWithEmailPassword(event) {
        event.preventDefault();
        const { email, passwordOne } = this.state;
        console.log("TAK", email, passwordOne);
        app.auth().createUserWithEmailAndPassword(email, passwordOne)
            .then(() => {
                this.setState({redirect: true, ...INITIAL_STATE});
            })
            .catch(error => {
                console.log(error) //to be deleted :D
            })
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {redirect} = this.state;
        console.log(redirect, from, this.props.location.state);
        if (redirect || this.props.isAuthed) {
            return (
                <Redirect to={from}/>

            )
        }
        const { email, passwordOne, passwordTwo } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '';

        return (

            <div className="row d-flex justify-content-center">
                <form onSubmit={(event) => this.authWithEmailPassword(event)} className="text-center border border-light p-5">

                    <p className="h4 mb-4">Sign up</p>

                    {/*<input type="email" id="defaultRegisterFormNick" className="form-control mb-4" placeholder="Nick"/>*/}

                    {/*na gorze pole na nick, na dole imie i nazwisko*/}

                    {/*<div className="form-row mb-4">*/}
                    {/*    <div className="col">*/}
                    {/*        <input type="text" id="defaultRegisterFormFirstName" className="form-control" placeholder="First name"/>*/}
                    {/*    </div>*/}
                    {/*    <div className="col">*/}
                    {/*        <input type="text" id="defaultRegisterFormLastName" className="form-control" placeholder="Last name"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <input type="email" name="email" value={email} onChange={this.onChange} id="defaultRegisterFormEmail" className="form-control mb-4" placeholder="E-mail"/>

                    <input type="password" name="passwordOne" value={passwordOne} onChange={this.onChange} id="defaultRegisterFormPassword" className="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock"/>
                    <small id="defaultRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
                        At least 8 characters and 1 digit
                    </small>

                    <input type="password" name="passwordTwo" value={passwordTwo} onChange={this.onChange} id="defaultRegisterFormPasswordRepeated" className="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock"/>
                    <small id="defaultRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
                        Repeat your password
                    </small>

                    <button disabled={isInvalid} className="btn btn-info my-4 btn-block" type="submit">Sign up</button>

                    <p>or sign up with:</p>

                    <button className="light-blue-text mx-2" onClick={() => this.authWithFacebook()}>
                        <i className="fab fa-facebook-f"/>
                    </button>
                    {/*<button className="light-blue-text mx-2" onClick={() => this.authWithFacebook()}>*/}
                    {/*    <i className="fab fa-google"/>*/}
                    {/*</button>*/}

                    <p>Already a member?
                        <a href="/login"> Login</a>
                    </p>
                    <hr/>

                    <p>By clicking
                        <em> Sign up</em> you agree to
                        <a href="https://nonsa.pl/wiki/Nic" target="_blank"> nothing</a>
                    </p>

                </form>
            </div>

        )
    }
}

export default Register