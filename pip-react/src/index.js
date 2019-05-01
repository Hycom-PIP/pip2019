import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import QuestionCard from './QuestionCard.js';
import { MDBBtn, MDBIcon, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';

class MainView extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        currentPage: 1,
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
                                                                questionType: "Radio",
                                                                answers: [{ answer: "" }]
                                                        }
                                                ]
                                        }

                                ]

                        }

                };
                this.AddQuestionCard = this.AddQuestionCard.bind(this);
                this.ChangePage = this.ChangePage.bind(this);
                this.AddPage = this.AddPage.bind(this);
                this.generateJson = this.generateJson.bind(this);
                this.HandleSurveyChange = this.HandleSurveyChange.bind(this);
                this.HandleSurveyDescritpionChange = this.HandleSurveyDescritpionChange.bind(this);
                this.DataChange = this.DataChange.bind(this);
                this.DeleteQuestion = this.DeleteQuestion.bind(this);
                this.MoveQuestion = this.MoveQuestion.bind(this);
        }
        DataChange(e, index, type) {
                this.setState((prevState) => {
                        let old = prevState.survey;
                        let temp = old.pageList[this.state.currentPage - 1].questionList[index];
                        switch (type) {
                                case "questionText":
                                        temp.questionText = e;
                                        break;
                                case "questionDescription":
                                        temp.questionDescription = e;
                                        break;
                                case "isRequiered":
                                        temp.isRequiered = e;
                                        break;
                                case "questionType":
                                        temp.questionType = e;
                                        break;
                                case "Multi":
                                        temp.answers = [];
                                        if (e != null) {
                                                e.forEach(function (element) {
                                                        temp.answers.push({ answer: element.answer })
                                                })
                                        }
                                        break;
                        }
                        old.pageList[this.state.currentPage - 1].questionList[index] = temp;
                        return { questionList: old }
                }
                )
        }

        generateJson() {
                //console.log(JSON.stringify(this.state.survey))
                var xhttp = new XMLHttpRequest()
                xhttp.open("POST", "http://localhost:8083/", true)
                xhttp.onreadystatechange =()=>{
                        if(xhttp.readyState==4)
                        {
                                if(xhttp.status==200)
                                {
                                        alert("Serwis przyjął dane, kod http: "+xhttp.status);
                                }
                                else
                                {
                                        alert("Serwis zwrócił kod błędu http: "+xhttp.status);
                                }
                        }
                }
                xhttp.setRequestHeader("Content-type", "application/json")
                xhttp.send(JSON.stringify(this.state.survey))

        }
        HandleSurveyChange(e) {
                let textChange = e.target.value
                this.setState((preState) => {
                        let old = preState.survey;
                        old.surveyName = textChange;
                        return { survey: old }
                });
        }
        HandleSurveyDescritpionChange(e) {
                let textChange = e.target.value
                this.setState((preState) => {
                        let old = this.state.survey;
                        old.surveyDescription = textChange;
                        return { survey: old }
                });
        }

        AddQuestionCard() {
                this.setState((prevState) => {
                        let old = prevState.survey;
                        old.pageList[this.state.currentPage - 1].questionList.push({
                                questionText: "",
                                questionDescription: "",
                                isRequiered: false,
                                questionType: "Short",
                                answers: []

                        });
                        return { survey: old }
                }
                );
        }
        AddPage() {
                this.setState((prevState) => {
                        let old = prevState.survey;
                        old.pageList.push({
                                pageDescription: "",
                                questionList: [
                                        {
                                                questionText: "",
                                                questionDescription: "",
                                                isRequiered: false,
                                                questionType: "Short",
                                                answers: []
                                        }
                                ]
                        });
                        return { survey: old }
                }
                );
        }
        ChangePage(e) {
                let toChange = e.target.firstChild.data;
                this.setState((prevState) => {
                        return { currentPage: toChange }
                });
        }
        MoveQuestion(index, direction) {
                if (direction == "up" && index > 0) {

                        this.setState((prevState) => {
                                let old = prevState.survey;
                                let up = prevState.survey.pageList[this.state.currentPage - 1].questionList;
                                let tempSwitch = up[index - 1];
                                up[index - 1] = up[index];
                                up[index] = tempSwitch;
                                old.pageList[this.state.currentPage - 1].questionList = up;
                                return { survey: old }
                        })

                }
                if (direction == "down" && this.state.survey.pageList[this.state.currentPage - 1].questionList.length - 1 > index) {
                        this.setState((prevState) => {
                                let old = prevState.survey;
                                let up = prevState.survey.pageList[this.state.currentPage - 1].questionList;
                                let tempSwitch = up[index + 1];
                                up[index + 1] = up[index];
                                up[index] = tempSwitch;
                                old.pageList[this.state.currentPage - 1].questionList = up;
                                return { survey: old }
                        })
                }
        }
        DeleteQuestion(index) {
                this.setState((prevState) => {
                        let old = prevState.survey
                        let newState = old.pageList[this.state.currentPage - 1].questionList;
                        newState.splice(index, 1);
                        old.pageList[this.state.currentPage - 1].questionList = newState;
                        return { survey: old }
                })
        }
        render() {
                return (
                        <MDBContainer>
                                <MDBInput onChange={this.HandleSurveyChange} type="textarea" label="Tytuł" rows="2" />
                                <MDBInput onChange={this.HandleSurveyDescritpionChange} type="textarea" label="Opis" rows="2" />
                                <br />
                                <MDBPagination className="d-flex justify-content-center" size="lg">
                                        <MDBPageItem disabled>
                                                <MDBPageNav aria-label="Previous">
                                                        <span aria-hidden="true">Previous</span>
                                                </MDBPageNav>
                                        </MDBPageItem>
                                        {
                                                (this.state.survey.pageList || []).map((vaule, index) =>
                                                        (<MDBPageItem active={this.state.currentPage - 1 == index} onClick={this.ChangePage} key={index + 1} data-id={index + 1} >
                                                                <MDBPageNav>
                                                                        {index + 1}
                                                                </MDBPageNav>
                                                        </MDBPageItem>))
                                        }
                                        <MDBPageItem disabled>
                                                <MDBPageNav aria-label="Previous">
                                                        <span aria-hidden="true">Next</span>
                                                </MDBPageNav>
                                        </MDBPageItem>
                                </MDBPagination>

                                <div class="container">
                                        <div class="row">
                                                <div class="col-sm">
                                                        {
                                                                (this.state.survey.pageList[this.state.currentPage - 1].questionList || []).map(
                                                                        (question, value) =>
                                                                                (
                                                                                        <QuestionCard key={'' + this.state.currentPage + '.' + value} parentKey={'' + this.state.currentPage + '.' + value} data={question} index={value} func={this.DataChange} dltFunc={this.DeleteQuestion} moveFunc={this.MoveQuestion} />
                                                                                )
                                                                )
                                                        }
                                                </div>
                                        </div>
                                </div>
                                <br />
                                <MDBPagination className="d-flex justify-content-center" size="lg">
                                        <MDBPageItem disabled>
                                                <MDBPageNav aria-label="Previous">
                                                        <span aria-hidden="true">Previous</span>
                                                </MDBPageNav>
                                        </MDBPageItem>
                                        {
                                                (this.state.survey.pageList || []).map((vaule, index) =>
                                                        (<MDBPageItem active={this.state.currentPage - 1 == index} onClick={this.ChangePage} key={index + 1} data-id={index + 1} >
                                                                <MDBPageNav >
                                                                        {index + 1}
                                                                </MDBPageNav>
                                                        </MDBPageItem>))
                                        }
                                        <MDBPageItem disabled>
                                                <MDBPageNav aria-label="Previous">
                                                        <span aria-hidden="true">Next</span>
                                                </MDBPageNav>
                                        </MDBPageItem>
                                </MDBPagination>

                                <MDBBtn onClick={this.AddQuestionCard} color="primary">Dodaj nowe pytanie</MDBBtn>
                                <div id="DivForButtons" class="CenterThenEnd">
                                        <div>Empty object</div>
                                        <MDBBtn onClick={this.AddPage} color="primary">Dodaj stronę</MDBBtn>

                                        <MDBBtn onClick={this.generateJson} color="primary">Zakończ</MDBBtn>

                                </div>
                        </MDBContainer>)

        }
}
ReactDOM.render(

        <MainView />, document.getElementById('root'));