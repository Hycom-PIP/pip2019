import React, { Component } from 'react';
import Survey from './Survey.js';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

import Share from 'react-icons/lib/io/android-share';
import Trash from 'react-icons/lib/io/trash-a';
import Edit from 'react-icons/lib/io/edit';



import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Toolbar from '@material-ui/core/Toolbar';
import './css/style.css';

class SurveyList extends Component{
  
    constructor(props){ 
        super(props);
        this.state = {
            currentPage: 1,
            stats: {
                statistics:[
                    {
                        surveyAmount: null,
                        pagesAmount: null
                    }
                ]

            },
            surveyList:{
                pages:[
                    {
                        currentPage: 1,
                        surveys:[
                            {
                                name:'test name',
                                version: 'vesrion1',
                                creationDate: '14-05-2019',
                                numberOfCompletedSyrveys: '20',
                                token: 'string'
                            }
                        ]
                    }
                ]

            }

        };
    }

        yourSurveys(direction) {
           
        }
        makeSurvey(direction) {
           
        }
        share(direction){

        }
        
    
        render() {
        
        return (
            <MDBContainer>
                <MDBRow center>
                    <div style={toolbarStyle}>
                    <MDBBtn onClick={this.yourSurveys} color="black">Twoje Ankiety</MDBBtn>
                    <MDBBtn onClick={this.makeSurvey} color="black">Utwórz Ankiete</MDBBtn >
                    <MDBBtn color="black">
                        <Share onClick={() => this.share()} fontSize="30px" color="#ffffff" />
                    </MDBBtn>
                    <MDBBtn color="black">
                        <Edit onClick={() => this.share()} fontSize="30px" color="#ffffff" />
                    </MDBBtn>
                    <MDBBtn color="black">
                        <Trash onClick={() => this.share()} fontSize="30px" color="#ffffff" />
                    </MDBBtn>
                   
                    </div>
                </MDBRow>

                <MDBContainer>
                    <MDBRow>
                        
                    </MDBRow>
                </MDBContainer>

            </MDBContainer>
        )
    }
}

const toolbarStyle = {
    display: 'flex',
    width: '1900px',
    backgroundColor: '#000000',
    padding: '6px 8px'
  };
  

export default SurveyList;