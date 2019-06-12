import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { app } from './config.js'

class Logout extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }
    componentWillMount() {
        app.auth().signOut().then((user) => {
            this.setState({redirect: true})
        })
    }

    render() {
        if ( this.state.redirect === true ) {
            return <Redirect to="/login" />
        }
        console.log("THIS SHIT HAPPENS");
        return (
            <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
                <h3> Logging out </h3>
            </div>
        )
    }
}

export default Logout