
import React, { Component } from 'react';
import ManageSurvey from './SurveyList';
import AnswerSurvey from './Survey.js';
import Login from './Login';
import Logout from './Logout';
import Error from "./Error.js";
import Register from './Register';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';
import { app } from './config.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      userLogin: ""
    }
  }
  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("UZYTKOWNIK", app.auth().currentUser.email);
            this.setState({
              authenticated: true,
              loading: false,
              userLogin: app.auth().currentUser.email

            })
          } else {
            this.setState({
              authenticated: false,
              loading: false,
              userLogin: ""
            })
          }
        }
    )
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    console.log("STATUS", app.auth().currentUser)
    if(this.state.loading === true)
      return (
          <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
            <h3> Loading </h3>
          </div>
      )
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={()=>(<Redirect to='/manage' />)} />
          <Route path="/manage" render={(props) => <ManageSurvey {...props} isAuthed={this.state.authenticated}/>} />
          <Route path="/answer" component={AnswerSurvey} />
          <Route path="/login"  render={(props) => <Login {...props} isAuthed={this.state.authenticated} />} />
          <Route path="/logout"  render={(props) => <Logout {...props} isAuthed={this.state.authenticated} />} />
          <Route path="/register"  render={(props) => <Register {...props} isAuthed={this.state.authenticated} />} />
          <Route path="/error" component={Error} />
          <Redirect to='/error' />
        </Switch>
      </Router>
    );
  }
}

export default App;
