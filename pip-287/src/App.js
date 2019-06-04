
import React, { Component } from 'react';
import SurveyList from './SurveyList';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SurveyList />
      </BrowserRouter>
    );
  }
}

export default App;