import React, { Component } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import SurveyComponent from './SurveyComponent.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
            currentPage: 0,
            surveys: {
                pages: []
            }

        };
        this.getSurveysJson()

        if (props.surveyJson != undefined) {
            this.state.surveyList = JSON.parse(props.surveyJson);
        }
        this.getSurveysJson = this.getSurveysJson.bind(this);
        this.share = this.share.bind(this);
        this.edit = this.edit.bind(this);
        this.trash = this.trash.bind(this);
        this.GetView = this.GetView.bind(this);
        this.copyTextToClipboard = this.copyTextToClipboard.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
        this.ChangeActiveState = this.ChangeActiveState.bind(this);
        {/*Survey list table structure*/ }
        this.columns = [
            {
                Header: 'Nazwa',
                accessor: 'name',
                sortable: false,
                width: 220,
                height: 400,
            },
            {
                Header: 'Utworzono',
                accessor: 'creationDate',
                sortable: false,
                width: 193,
            },
            {
                Header: 'Wersja',
                accessor: 'version',
                sortable: false,
                width: 70,
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },
            {
                Header: 'Wypełnienia',
                accessor: 'numberOfCompletedSyrveys',
                sortable: false,
                width: 100,
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },
            {
                Header: 'Link',
                accessor: 'token',
                sortable: false,
                width: 200,
            },
            {
                Header: 'Kopiuj',
                sortable: false,
                width: 80,
                resizable: false,
                Cell: row => (
                    <div>
                        <MDBBtn onClick={() => this.share(row)} color="primary" size="sm" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Share fontSize="20px" color="white" />
                        </MDBBtn>
                    </div>
                )
            },
            {
                Header: 'Edytuj',
                sortable: false,
                width: 80,
                resizable: false,
                Cell: row => (
                    <div>
                        <MDBBtn onClick={() => this.edit(row)} color="primary" size="sm" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Edit fontSize="20px" color="white" />
                        </MDBBtn>
                    </div>
                )
            },
            {
                Header: 'Usuń',
                sortable: false,
                width: 80,
                resizable: false,
                Cell: row => (
                    <div>
                        <MDBBtn onClick={() => this.trash(row)} color="primary" size="sm" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Trash fontSize="20px" color="white" />
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
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
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
    share(direction) {
        this.copyTextToClipboard("localhost:3000/ankieta/" + this.state.surveys.pages[direction.index].token);
    }

    edit(direction) {
        var token = this.state.surveys.pages[direction.index].token;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:8080/survey-service/getSurvey/" + token, true)
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    this.setState({
                        json: xhttp.responseText,
                        activeState: "edit"
                    });
                }
                else {
                    console.log("Serwis zwrócił kod błędu http: " + xhttp.status);
                }
            }
        }

    }
    trash(direction) {
        var token = this.state.surveys.pages[direction.index].token;
        this.deleteSurvey(token);

    }

    deleteSurvey(token) {
        var url = "http://localhost:8080/survey-service/" + token;
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.log("Usunięto: " + token);
                this.getSurveysJson();
            } else {
                console.error("Błąd");
            }
        }
        xhr.send(null);
    }


    getSurveysJson() {
        var xhttp = new XMLHttpRequest();
        var obj;
        xhttp.open("GET", "http://localhost:8080/survey-service/getSurveys/" + this.state.currentPage, true)
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
    }
    ChangeActiveState(nameOfState) {
        this.setState({ activeState: nameOfState });
    }
    GetView() {
        if (this.state.activeState === "show") { }
        else if (this.state.activeState === "creation") {
            return <SurveyComponent />
        }
        else if (this.state.activeState === "edit") {
            return <SurveyComponent surveyJson={this.state.json} />

        }
    }
    render() {
        //this.getSurveysJson(); //If front end will be too slow remove this line
        let data = [];
        let CurrentPage = this.state.currentPage;
        for (let survey of this.state.surveys.pages) {
            let dateTime = new Date(survey.creationDate);
            data.push({
                name: survey.name,
                version: survey.version,
                creationDate: dateTime.toDateString() + " " + dateTime.toTimeString(),
                numberOfCompletedSyrveys: survey.numberOfCompletedSurveys,
                token: survey.token
            })
        }
        let pagesAmount = 1;
        if (typeof this.state.surveys.statistics !== "undefined")
            pagesAmount = this.state.surveys.statistics.pagesAmount;
        return (
            <MDBContainer>
                <ReactTable
                    data={data}
                    pageSize={10}
                    columns={this.columns}
                    showPageSizeOptions={false}
                    getTdProps={() => ({
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }
                    })}
                    manual // this would indicate that server side pagination has been enabled 
                    pages={pagesAmount}
                    onPageChange={(pageIndex) => {
                        console.log(pageIndex)
                        this.state.currentPage = pageIndex;
                        this.getSurveysJson()
                    }}
                    nextText="Następna strona"
                    previousText="Poprzednia strona"
                    pageText="Strona"
                    ofText="z"
                    PreviousComponent={pagitationButton}
                    NextComponent={pagitationButton}
                />
            </MDBContainer>)
    }
}

const CustomToolbar = (data) => (<div style={{
    display: 'flex',
    width: '1200px',
    backgroundColor: '#2979FF',
    padding: '6px 8px',
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
}} >
    {data.children}
</div>);

const pagitationButton = props => (
    <MDBBtn {...props} color="primary">
        {props.children}
    </MDBBtn>
)
const ErrorPage = (errorData) =>
    (
        <div className="verticallFill">
            <div className="verticallFillObject">AAAAAA</div>
        </div>
    )
const MainView = (props) => (

    <MDBContainer className="verticallFill">
        <Router>
            <MDBRow>
                <CustomToolbar>
                    <Link to="/">  <MDBBtn color="primary">Twoje Ankiety</MDBBtn> </Link>
                    <Link to="/CreateSurvey"><MDBBtn color="primary"> Utwórz Ankietę</MDBBtn></Link>
                </CustomToolbar>
            </MDBRow>
            <Route exact path="/" component={SurveyList} />
            <Route path="/CreateSurvey" component={SurveyComponent} />
            <Route path="/Error" component={ErrorPage} />

        </Router>
    </MDBContainer>
)
export default MainView;