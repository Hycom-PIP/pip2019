import React from 'react';
import { Component } from 'react';
import QuestionCard from './QuestionCard.js';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';

toast.configure();
class SurveyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            survey: {
                token: null,
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

            }

        };
        if (props.surveyJson != undefined && props.surveyJson != null) {
            this.state.survey = JSON.parse(props.surveyJson);
        }
        if (props.token != undefined && props.token != null) {
            this.state.token = props.token;
        }
        this.addQuestionCard = this.addQuestionCard.bind(this);
        this.changePage = this.changePage.bind(this);
        this.addPage = this.addPage.bind(this);
        this.generateJson = this.generateJson.bind(this);
        this.surveyTitleChange = this.surveyTitleChange.bind(this);
        this.surveyDescritpionChange = this.surveyDescritpionChange.bind(this);
        this.questionDataChange = this.questionDataChange.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.moveQuestion = this.moveQuestion.bind(this);
        this.deleteMultiQuestion = this.deleteMultiQuestion.bind(this);
        this.pageDescriptionChange = this.pageDescriptionChange.bind(this);
        this.setPage = this.setPage.bind(this);
        this.OnDragEnd = this.OnDragEnd.bind(this);
        this.deletePage = this.deletePage.bind(this);
    }
    deletePage() {
        if (this.state.survey.pageList.length > 1) {
            this.setState((prevState) => {
                prevState.survey.pageList.splice(prevState.currentPage - 1, 1);
                if (prevState.currentPage !== 1) {
                    prevState.currentPage = prevState.currentPage - 1;
                }
                return {
                    survey: prevState.survey,
                    currentPage: prevState.currentPage
                };
            });
        }
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
                    if (prevState.survey.pageList.length > prevState.currentPage) {
                        return { currentPage: prevState.currentPage + 1 }
                    }
                    break;
            }

        })

    }
    pageDescriptionChange(event) {
        let old = this.state.survey;
        old.pageList[this.state.currentPage - 1].pageDescription = event.target.value;
        this.setState({ survey: old });
        this.forceUpdate();
    }
    questionDataChange(e, index, type) {
        this.setState((prevState) => {
            let old = prevState.survey;
            let question = old.pageList[this.state.currentPage - 1].questionList[index];
            switch (type) {
                case "questionText":
                    question.questionText = e;
                    break;
                case "questionDescription":
                    question.questionDescription = e;
                    break;
                case "isRequiered":
                    question.isRequiered = e;
                    break;
                case "questionType":
                    question.questionType = e;
                    break;
                case "multiQuestions":
                    question.answers = [];
                    if (e != null) {
                        e.forEach(function (element) {
                            question.answers.push({ answer: element.answer })
                        })
                    }
                    break;
            }
            old.pageList[this.state.currentPage - 1].questionList[index] = question;
            return { survey: old }
        }
        )
    }

    generateJson() {

        //console.log(JSON.stringify(this.state.survey));
        var xhttp = new XMLHttpRequest();
        if (this.state.survey.token == null) {
            xhttp.open("POST", "http://localhost:8080/survey-service/", true);
        }
        else {
            xhttp.open("PUT", "http://localhost:8080/survey-service/addNewVersion", true);
        }
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    console.log("Serwis przyjął dane, kod http: " + xhttp.status);
                    this.setState({redirected: true});
                }
                else {
                    console.log("Serwis zwrócił kod błędu http: " + xhttp.status);
                    toast.error("HTTP STATUS " + xhttp.status);
                }
            }
        }
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(this.state.survey));
    }
    surveyTitleChange(e) {
        let textChange = e.target.value
        this.setState((preState) => {
            let old = preState.survey;
            old.surveyName = textChange;
            return { survey: old }
        });
    }
    surveyDescritpionChange(e) {
        let textChange = e.target.value
        this.setState((preState) => {
            let old = this.state.survey;
            old.surveyDescription = textChange;
            return { survey: old }
        });
    }
    addQuestionCard() {
        this.setState((prevState) => {
            let old = prevState.survey;
            old.pageList[this.state.currentPage - 1].questionList.push({
                questionText: "",
                questionDescription: "",
                isRequiered: false,
                questionType: "shortText",
                answers: []

            });
            return { survey: old }
        }
        );
    }
    addPage() {
        this.setState((prevState) => {
            let old = prevState.survey;
            old.pageList.push({
                pageDescription: "",
                questionList: [
                    {
                        questionText: "",
                        questionDescription: "",
                        isRequiered: false,
                        questionType: "shortText",
                        answers: []
                    }
                ]
            });
            return {
                survey: old, currentPage: old.pageList.length
            }
        }
        );
    }
    changePage(index) {
        this.setState((prevState) => {
            return { currentPage: index }
        });
    }
    moveQuestion(index, direction) {
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
    deleteQuestion(index) {
        this.setState((prevState) => {
            let old = prevState.survey
            let newState = old.pageList[this.state.currentPage - 1].questionList;
            newState.splice(index, 1);
            old.pageList[this.state.currentPage - 1].questionList = newState;
            return { survey: old }
        })
    }
    deleteMultiQuestion(parentIndex, childIndex) {
        this.setState((prevState) => {
            let old = prevState.survey
            let newState = old.pageList[this.state.currentPage - 1].questionList[parentIndex].answers;
            newState.splice(childIndex, 1);
            old.pageList[this.state.currentPage - 1].questionList[parentIndex].answers = newState;
            return { survey: old }
        });
        this.forceUpdate();
    }
    OnDragEnd(result) {
        if (!result.destination) { return; }

        if (result.destination.droppableId === result.source.droppableId && result.index === result.source.index) { return; }

        this.setState((prevState) => {
            var oldQuestion = prevState.survey.pageList[prevState.currentPage - 1].questionList[result.source.index];
            prevState.survey.pageList[prevState.currentPage - 1].questionList.splice(result.source.index, 1);
            prevState.survey.pageList[prevState.currentPage - 1].questionList.splice(result.destination.index, 0, oldQuestion);
            return { state: prevState }

        })
    }
    render() {
        if(this.state.redirected)
        {
            return <Redirect push to={"/"} />;
        }
        else return (

            <MDBContainer>
                <MDBInput onChange={this.surveyTitleChange} value={this.state.survey.surveyName} type="textarea" label="Tytuł" rows="2" />
                <MDBInput onChange={this.surveyDescritpionChange} value={this.state.survey.surveyDescription} type="textarea" label="Opis" rows="2" />
                <br />
                <MDBRow center>
                    <MDBPagination className="d-flex justify-content-center" size="lg">
                        <MDBPageItem onClick={() => (this.setPage("Previous"))} disabled={this.state.survey.pageList.length <= 1}>
                            <MDBPageNav aria-label="Previous">
                                <span aria-hidden="false">Previous</span>
                            </MDBPageNav>
                        </MDBPageItem>
                        {
                            (this.state.survey.pageList || []).map((vaule, index) =>
                                (<MDBPageItem active={this.state.currentPage - 1 == index} onClick={() => (this.changePage(index + 1))} key={index + 1}>
                                    <MDBPageNav>
                                        {index + 1}
                                    </MDBPageNav>
                                </MDBPageItem>))
                        }
                        <MDBPageItem onClick={() => (this.setPage("Next"))} disabled={this.state.survey.pageList.length <= 1}>
                            <MDBPageNav aria-label="Next">
                                <span aria-hidden="true">Next</span>
                            </MDBPageNav>
                        </MDBPageItem>
                    </MDBPagination>
                </MDBRow>
                <MDBContainer id="QuestionList">
                    <MDBRow>
                        <MDBCol className="pl-0 pr-0">
                            <DragDropContext onDragEnd={this.OnDragEnd} >
                                <Droppable droppableId={"LOTR>GOT"} >
                                    {(provided) =>
                                        (
                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                {(this.state.survey.pageList[this.state.currentPage - 1].questionList || []).map(
                                                    (question, value) => (
                                                        <React.Fragment key={this.state.currentPage + '.' + value}>
                                                            {/* <MDBContainer className="block-example border pt-4 pb-2 mt-2"> */}
                                                            <QuestionCard parentKey={this.state.currentPage + '.' + value} data={question} index={value} func={this.questionDataChange} dltFunc={this.deleteQuestion} multiDltfunc={this.deleteMultiQuestion} moveFunc={this.moveQuestion} />
                                                            {/* </MDBContainer> */}
                                                            {/* <div className="pb-0 pt-0 mt-2 border-bottom-5 border-top-0 rounded list-group-item" /> */}
                                                        </React.Fragment>
                                                    )
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                </Droppable>
                            </DragDropContext>
                            <MDBInput value={this.state.survey.pageList[this.state.currentPage - 1].pageDescription} onChange={this.pageDescriptionChange} type="textarea" label="Opis strony" rows="2" />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <br />
                <MDBRow center>
                    <MDBPagination className="d-flex justify-content-center" size="lg">
                        <MDBPageItem onClick={() => (this.setPage("Previous"))} disabled={this.state.survey.pageList.length <= 1}>
                            <MDBPageNav aria-label="Previous">
                                <span aria-hidden="true">Previous</span>
                            </MDBPageNav>
                        </MDBPageItem>
                        {
                            (this.state.survey.pageList || []).map((vaule, index) =>
                                (<MDBPageItem active={this.state.currentPage - 1 == index} onClick={() => (this.changePage(index + 1))} key={index + 1}>
                                    <MDBPageNav>
                                        {index + 1}
                                    </MDBPageNav>
                                </MDBPageItem>))
                        }
                        <MDBPageItem onClick={() => (this.setPage("Next"))} disabled={this.state.survey.pageList.length <= 1}>
                            <MDBPageNav aria-label="Next">
                                <span aria-hidden="true">Next</span>
                            </MDBPageNav>
                        </MDBPageItem>
                    </MDBPagination>
                </MDBRow>
                <MDBBtn onClick={this.addQuestionCard} color="primary">Dodaj nowe pytanie</MDBBtn>
                <MDBRow end>
                    <MDBCol>
                        <MDBBtn onClick={this.deletePage} color="primary">Usuń stronę</MDBBtn>
                    </MDBCol>
                    <MDBCol className="text-center">
                        <MDBBtn onClick={this.addPage} color="primary">Dodaj stronę</MDBBtn>
                    </MDBCol>
                    <MDBCol className="text-right">
                        <MDBBtn onClick={this.generateJson} color="primary">Zakończ</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>)
    }
}

export default SurveyComponent;