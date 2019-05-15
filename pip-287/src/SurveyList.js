import React, { Component } from 'react';
import Survey from './Survey.js';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

import Share from 'react-icons/lib/io/android-share';
import Trash from 'react-icons/lib/io/trash-a';
import Edit from 'react-icons/lib/io/edit';
import ReactTable from 'react-table';
import 'react-table/react-table.css';



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
    

            this.columns = [
            {
                Header: 'Name',
                accessor: 'name'
            }, 
            {
                Header: 'Version',
                accessor: 'version',
            }, 
            {
                Header: 'CreationDate',
                accessor: 'creationDate',
            },
            {
                Header: 'Number of completed surveys',
                accessor: 'numberOfCompletedSyrveys',
            },
            {
                Header: 'Link',
                accessor: 'token',
            },
            {
                Header: '',
                Cell: row => (
                <div>
                    <MDBBtn color="white" style={{ flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Share onClick={() => this.share()} fontSize="20px" color="#000000" />
                    </MDBBtn>
                </div>
                )
            },
            {
                Header: '',
                Cell: row => (
                <div>
                   <MDBBtn color="white" style={{ flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Edit onClick={() => this.share()} fontSize="20px" color="#000000"/>
                    </MDBBtn>
                </div>
                )
            },
            {
                Header: '',
                Cell: row => (
                <div>
                   <MDBBtn color="white" style={{ flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Trash onClick={() => this.share()}  fontSize="20px" color="#000000" />
                    </MDBBtn>
                </div>
                )
            }
            ]
        }

        yourSurveys(direction) {
           
        }
        makeSurvey(direction) {
           
        }
        share(direction){

        }
        
    
        render() {

            const data = [{
                name: 'name',
                version: 'version',
                creationDate: '15-05-2019',
                numberOfCompletedSyrveys: 2,
                token:'ankieta.pl/ankieta',
            }]
        
        return (
            
            <MDBContainer>
                <MDBRow center>
                    <div style={toolbarStyle}>
                    <MDBBtn onClick={this.yourSurveys} color="black">Twoje Ankiety</MDBBtn>
                    <MDBBtn onClick={this.makeSurvey} color="black">Utwórz Ankiete</MDBBtn >
                   
                    </div>
                </MDBRow>

                <MDBContainer>
                
                        <ReactTable
                            data={data}
                            pageSize={10}
                            columns={this.columns}
                        />
                      
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