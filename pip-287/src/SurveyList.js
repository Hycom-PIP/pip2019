import React, { Component } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import SurveyComponent from './SurveyComponent.js'

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



class SurveyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeState: "show",
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
        this.GetView= this.GetView.bind(this);
        this.copyTextToClipboard = this.copyTextToClipboard.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
        this.ChangeActiveState = this.ChangeActiveState.bind(this);
        {/*Survey list table structure*/ }
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
                        <MDBBtn onClick={() => this.share(row)} color="white" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Share fontSize="20px" color="#000000" />
                        </MDBBtn>
                    </div>
                )
            },
            {
                Header: '',
                Cell: row => (
                    <div>
                        <MDBBtn onClick={() => this.edit(row)} color="white" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Edit fontSize="20px" color="#000000" />
                        </MDBBtn>
                    </div>
                )
            },
            {
                Header: '',
                Cell: row => (
                    <div>
                        <MDBBtn onClick={() => this.trash(row)} color="white" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Trash fontSize="20px" color="#000000" />
                        </MDBBtn>
                    </div>
                )
            }
        ]
    }

    copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
      
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
      
        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';
      
        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;
      
        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
      
        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';
      
      
        textArea.value = text;
      
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Copying text command was ' + msg);
        } catch (err) {
          console.log('Oops, unable to copy');
        }
      
        document.body.removeChild(textArea);
      }
    yourSurveys(direction) {
    }
    makeSurvey(direction) {

    }
    share(direction){
        this.copyTextToClipboard("localhost:3001/ankieta/" + this.state.surveys.pages[direction.index].token);
    }

    edit(direction) {
        var token = this.state.surveys.pages[direction.index].token;
console.log(token);
    }
    trash(direction){
        var token = this.state.surveys.pages[direction.index].token;
        this.deleteSurvey(token);

    }

    deleteSurvey(token) {
        var url = "http://localhost:8080/survey-service/" + token;
        var xhr = new XMLHttpRequest();
        var component = this;
        xhr.open("DELETE", url, true);
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.log("Usunięto: " + token);
                component.getSurveysJson();
            } else {
                console.error("Błąd");
            }
        }
        xhr.send(null);
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
                    this.setState({ surveys: obj });
                }
                else {
                    console.log("Serwis zwrócił kod błędu http: " + xhttp.status);
                }
            }
        }
        return obj;
    }
    ChangeActiveState(nameOfState)
    {
        this.setState({activeState: nameOfState});
    }
    GetView () {
        if (this.state.activeState === "show") {
            let data = [];
            for (let survey of this.state.surveys.pages) {
                data.push({
                    name: survey.name,
                    version: survey.version,
                    creationDate: survey.creationDate,
                    numberOfCompletedSyrveys: survey.numberOfCompletedSurveys,
                    token: survey.token
                })
            }
            return (
                <MDBContainer>
                    <ReactTable 
                        data={data}
                        pageSize={10}
                        columns={this.columns}
                        showPageSizeOptions={false}
                    />
                </MDBContainer>)
        }
        else if(this.state.activeState ==="creation")
        {
            return <SurveyComponent />
        }



    }
    render() {



        return (

            <MDBContainer>
                <MDBRow center>
                    <div style={toolbarStyle}>
                        <MDBBtn onClick={()=>(this.ChangeActiveState("show"))}  color="black">Twoje Ankiety</MDBBtn>
                        <MDBBtn onClick={()=>(this.ChangeActiveState("creation"))} color="black">Utwórz Ankiete</MDBBtn>

                    </div>
                </MDBRow>

                {this.GetView()}
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