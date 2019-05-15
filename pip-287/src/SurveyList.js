import React, { Component } from 'react';
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
            surveys: {
             pages: []
            }
            
    };
     this.getSurveysJson()

        if (props.surveyJson != undefined) {
            this.state.surveyList = JSON.parse(props.surveyJson);
        }
        this.yourSurveys = this.yourSurveys.bind(this);
        this.makeSurvey = this.makeSurvey.bind(this);
        this.share = this.share.bind(this);
        this.edit = this.edit.bind(this);
        this.trash = this.trash.bind(this);

        {/*Survey list table structure*/}
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
                        <Share onClick={() => this.share(this)} fontSize="20px" color="#000000" />
                    </MDBBtn>
                </div>
                )
            },
            {
                Header: '',
                Cell: row => (
                <div>
                   <MDBBtn color="white" style={{ flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Edit onClick={() => this.edit()} fontSize="20px" color="#000000"/>
                    </MDBBtn>
                </div>
                )
            },
            {
                Header: '',
                Cell: row => (
                <div>
                   <MDBBtn color="white" style={{ flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Trash onClick={() => this.trash(this) }  fontSize="20px" color="#000000" />
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
            this.copyToClipboard(direction.data.token);
        }
        edit(direction){

        }
        trash(token){
            var contacts = [...this.state.surveyList.pages.surveys];
            contacts.splice(token, 1);
            this.setState({contacts});
        }

        getSurveysJson() {
            var xhttp = new XMLHttpRequest();
            var obj;
            xhttp.open("GET", "http://localhost:8080/survey-service/getSurveys/0", true)
            xhttp.send();
            xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4) {
                        if (xhttp.status == 200) {
                            obj = JSON.parse(xhttp.responseText);
                            this.setState({surveys : obj});
                        }
                        else {
                            console.log("Serwis zwrócił kod błędu http: " + xhttp.status);
                        }
                    }
            }
            return obj;
        }
    
        copyToClipboard(str){
            const el = document.createElement('textarea');
            el.value = str;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
          };

        render() {

            const data = [];
            for (let survey of this.state.surveys.pages) {
                data.push({
                    name:survey.name,
                    version:survey.version,
                    creationDate: survey.creationDate,
                    numberOfCompletedSyrveys: survey.numberOfCompletedSurveys,
                    token: survey.token
                })
            }
        
        return (
            
            <MDBContainer>
                <MDBRow center>
                    <div style={toolbarStyle}>
                    <MDBBtn onClick={this.yourSurveys} color="black">Twoje Ankiety</MDBBtn>
                    <MDBBtn onClick={this.makeSurvey} color="black">Utwórz Ankiete</MDBBtn>
                   
                    </div>
                </MDBRow>

                <MDBContainer>
                
                        <ReactTable
                            data={data}
                            pageSize={10}
                            columns={this.columns}
                            showPageSizeOptions={false}
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