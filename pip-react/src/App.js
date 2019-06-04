
import React, { Component } from 'react';
import ManageSurvey from './SurveyList';
import AnswerSurvey from './Survey.js'
import Error from "./Error.js"
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={()=>(<Redirect to='/manage' />)} />
          <Route path="/manage" component={ManageSurvey} />
          <Route path="/answer" component={AnswerSurvey} />
          <Route path="/error" component={Error} />
          <Redirect to='/error' />
        </Switch>
      </Router>
    );
  }
}

export default App;
