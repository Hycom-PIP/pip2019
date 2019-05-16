import React from 'react';
import { Component } from 'react';
// import QuestionCard from './QuestionCard.js';
import Question from './Question.js';
// import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';
class SurveyComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempToken: "",
            currentPage: 1,
            surveyjson: undefined,
            survey: {
                oldVersionToken: null,
                surveyName: null,
                surveyDescription: null,
                pageList: [
                    {
                        pageDescription: "",
                        questionList: [
                            {
                                questionText: "",
                                questionDescription: "",
                                isRequiered: false,
                                questionType: "singleOption",
                                answers: [{ answer: "" }]
                            }
                        ]
                    }
                ]
            },
            answers: {
                token: "5cdc5af6925aaa37793c99b0",
                pages: []
            }
        };
        if (props.surveyJson !== undefined) {
            this.state.survey = JSON.parse(props.surveyJson);
        }
        if (props.token !== undefined) {
            this.state.oldVersionToken = props.token;
        }
        //5cdc5af6925aaa37793c99b0


        this.changePage = this.changePage.bind(this);
        this.generateJson = this.generateJson.bind(this);
        this.answerDataChange = this.answerDataChange.bind(this);
        this.setPage = this.setPage.bind(this);
        this.fetchSurvey = this.fetchSurvey.bind(this)
    }
    componentDidMount() {
        if(this.state.surveyjson !== undefined) {
        }
    }

    fetchSurvey({match}) {
        fetch("http://localhost:8080/survey-service/ankieta/" + match.params.surveyID)
            .then(response => response.json())
            .then(data => this.setState({surveyjson: data}));
        // this.setState({temptoken: match.params.surveyID});
        this.state.answers.token = match.params.surveyID;
        return null
    }

    setPage(direction) {
        this.setState((prevState) => {
            switch (direction) {
                case "Previous":
                    if (prevState.currentPage > 1) {
                        return { currentPage: prevState.currentPage - 1 }
                    }
                    break;
                case "Next":
                    if (prevState.currentPage < prevState.surveyjson.pageList.length) {
                        return { currentPage: prevState.currentPage + 1 }
                    }
                    break;
                default:
                    break;
            }

        })

    }
    answerDataChange(e, pageIndex, questionIndex, type) {
        console.log("TEST", this.state.answers, pageIndex);
        this.setState((prevState) => {
                let old = prevState.answers;
                // let question = old.pages[pageIndex - 1].questionList[questionIndex];
                switch (type) {
                    case "Text":
                        this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers[0] = e;
                        break;
                    case "radio":
                        this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers[0] = e;
                        break;
                    case "checkbox":
                        // if (e.target) {
                        //     alert("target");
                        //     if (e.target.checked) {
                        //         if (!this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.includes(e.target.value)) {
                        //             this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.push(e.target.value);
                        //             alert("DODANO");
                        //         }
                        //     } else {
                        //         if (this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.includes(e.target.value)) {
                        //             var ind = this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.indexOf(e.target.value);
                        //             this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.splice(ind, 1);
                        //             alert("USUNIETO");
                        //         }
                        //     }
                        // }
                        // break;
                    default:
                        break;
                }
                // old.pages[pageIndex - 1].questionList[questionIndex] = question;
                console.log("Po zmianie", old);
                return { answers: old }
            }
        )
    }
    //
    generateJson() {
        // console.log(JSON.stringify(this.state.survey))
        // this.setState({this.state.answers.token: "5cdc5af6925aaa37793c99b0"});
        //TODO: HERE
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8080/survey-service/ankieta", true)
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    console.log("Serwis przyjął dane, kod http: " + xhttp.status);
                } else {
                    console.log("Serwis zwrócił kod błędu http: " + xhttp.status);
                }
            }
        }
        xhttp.setRequestHeader("Content-type", "application/json");
        // console.log("WYSYLAM:", this.state.answers);
        xhttp.send(JSON.stringify(this.state.answers));
    }

    changePage(index) {
        this.setState((prevState) => {
            return { currentPage: index }
        });
    }
    render() {
        if(this.state.surveyjson !== undefined) {
            console.log("ROZMIAR", this.state.surveyjson.pageList.length);
            if(this.state.answers.pages.length === 0) {
                this.state.surveyjson.pageList.forEach((element) => {
                    let page = {pageId: 0, questionList: []}; //TODO: Ustawic PageID
                    element.questionList.forEach((elem2) => {
                        page.questionList.push(
                            {questionId: 0, //TODO: ustawic QuestionID
                                answers: []}
                        )
                    });
                    this.state.answers.pages.push(page)
                });
                console.log("TAK", this.state);
            }
            return (
                <MDBContainer className="block-example border pt-4">
                    <p>{this.state.surveyjson.surveyName}</p>
                    <p>{this.state.surveyjson.surveyDescription}</p>
                    <br />
                    <MDBRow center>
                        <MDBPagination className="d-flex justify-content-center" size="lg">
                            <MDBPageItem onClick={() => (this.setPage("Previous"))} disabled={this.state.currentPage === 1}>
                                <MDBPageNav aria-label="Previous">
                                    <span aria-hidden="false">Previous</span>
                                </MDBPageNav>
                            </MDBPageItem>
                            {
                                (this.state.surveyjson.pageList).map((value, index) =>
                                    (<MDBPageItem active={this.state.currentPage - 1 === index}
                                                  onClick={() => (this.changePage(index + 1))} key={index + 1}>
                                        <MDBPageNav>
                                            {index + 1}
                                        </MDBPageNav>
                                    </MDBPageItem>))
                            }
                            <MDBPageItem onClick={() => (this.setPage("Next"))} disabled={this.state.surveyjson.pageList.length === this.state.currentPage}>
                                <MDBPageNav aria-label="Next">
                                    <span aria-hidden="true">Next</span>
                                </MDBPageNav>
                            </MDBPageItem>
                        </MDBPagination>
                    </MDBRow>
                    <MDBContainer id="QuestionList">
                        <MDBRow>
                            <MDBCol>
                                {(this.state.surveyjson.pageList[this.state.currentPage - 1].questionList || []).map(
                                    (question, value) => (
                                        <React.Fragment key={this.state.currentPage + '.' + value}>
                                            <div >
                                                <Question parentKey={this.state.currentPage + '.' + value} data={question} pageIndex={this.state.currentPage} questionIndex={value} func={this.answerDataChange} />
                                            </div>
                                            <div className="pb-0 pt-0 mt-2 border-bottom-5 border-top-0 rounded list-group-item" />
                                        </React.Fragment>
                                    )
                                )}
                                <p>{this.state.surveyjson.pageDescription}</p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <MDBRow center>
                        <MDBPagination className="d-flex justify-content-center" size="lg">
                            <MDBPageItem onClick={() => (this.setPage("Previous"))} disabled={this.state.currentPage === 1}>
                                <MDBPageNav aria-label="Previous">
                                    <span aria-hidden="false">Previous</span>
                                </MDBPageNav>
                            </MDBPageItem>
                            {
                                (this.state.surveyjson.pageList).map((value, index) =>
                                    (<MDBPageItem active={this.state.currentPage - 1 === index}
                                                  onClick={() => (this.changePage(index + 1))} key={index + 1}>
                                        <MDBPageNav>
                                            {index + 1}
                                        </MDBPageNav>
                                    </MDBPageItem>))
                            }
                            <MDBPageItem onClick={() => (this.setPage("Next"))} disabled={this.state.surveyjson.pageList.length === this.state.currentPage}>
                                <MDBPageNav aria-label="Next">
                                    <span aria-hidden="true">Next</span>
                                </MDBPageNav>
                            </MDBPageItem>
                        </MDBPagination>
                    </MDBRow>
                    <MDBRow center>
                        <MDBBtn color="primary" onClick={this.generateJson}>Zakoncz</MDBBtn>
                    </MDBRow>
                </MDBContainer>)
        } else
        {
            return (
                <Router>
                    <div className="container">
                        <Route path="/ankieta/:surveyID" component={this.fetchSurvey} />
                    </div>
                </Router>);
        }

    }
}

export default SurveyComponent;