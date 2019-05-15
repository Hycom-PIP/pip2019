import React from 'react';
import { Component } from 'react';
import QuestionCard from './QuestionCard.js';
import Question from './Question.js';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { MDBBtn, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';

class SurveyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            surveyjson: {},
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

            }

        };
        if (props.surveyJson != undefined) {
            this.state.survey = JSON.parse(props.surveyJson);
        }
        if (props.token != undefined) {
            this.state.oldVersionToken = props.token;
        }
        // this.addQuestionCard = this.addQuestionCard.bind(this);
        // this.changePage = this.changePage.bind(this);
        // this.addPage = this.addPage.bind(this);
        // this.generateJson = this.generateJson.bind(this);
        // this.surveyTitleChange = this.surveyTitleChange.bind(this);
        // this.surveyDescritpionChange = this.surveyDescritpionChange.bind(this);
        // this.questionDataChange = this.questionDataChange.bind(this);
        // this.deleteQuestion = this.deleteQuestion.bind(this);
        // this.moveQuestion = this.moveQuestion.bind(this);
        // this.deleteMultiQuestion = this.deleteMultiQuestion.bind(this);
        // this.pageDescriptionChange = this.pageDescriptionChange.bind(this);
        // this.setPage = this.setPage.bind(this);
        // this.OnDragEnd = this.OnDragEnd.bind(this);
    }
    componentDidMount() {


    }

    // setPage(direction) {
    //     this.setState((prevState) => {
    //         switch (direction) {
    //             case "Previous":
    //                 if (prevState.currentPage > 1) {
    //                     return { currentPage: prevState.currentPage - 1 }
    //                 }
    //                 break;
    //             case "Next":
    //                 if (prevState.survey.pageList.length > prevState.currentPage) {
    //                     return { currentPage: prevState.currentPage + 1 }
    //                 }
    //                 break;
    //         }
    //
    //     })
    //
    // }
    // pageDescriptionChange(event) {
    //     let old = this.state.survey;
    //     old.pageList[this.state.currentPage - 1].pageDescription = event.target.value;
    //     this.setState({ survey: old });
    //     this.forceUpdate();
    // }
    // questionDataChange(e, index, type) {
    //     this.setState((prevState) => {
    //             let old = prevState.survey;
    //             let question = old.pageList[this.state.currentPage - 1].questionList[index];
    //             switch (type) {
    //                 case "questionText":
    //                     question.questionText = e;
    //                     break;
    //                 case "questionDescription":
    //                     question.questionDescription = e;
    //                     break;
    //                 case "isRequiered":
    //                     question.isRequiered = e;
    //                     break;
    //                 case "questionType":
    //                     question.questionType = e;
    //                     break;
    //                 case "multiQuestions":
    //                     question.answers = [];
    //                     if (e != null) {
    //                         e.forEach(function (element) {
    //                             question.answers.push({ answer: element.answer })
    //                         })
    //                     }
    //                     break;
    //             }
    //             old.pageList[this.state.currentPage - 1].questionList[index] = question;
    //             return { questionList: old }
    //         }
    //     )
    // }
    //
    // generateJson() {
    //     // console.log(JSON.stringify(this.state.survey))
    //     var xhttp = new XMLHttpRequest()
    //     xhttp.open("POST", "http://localhost:8083/", true)
    //     xhttp.onreadystatechange = () => {
    //         if (xhttp.readyState == 4) {
    //             if (xhttp.status == 200) {
    //                 console.log("Serwis przyjął dane, kod http: " + xhttp.status);
    //             }
    //             else {
    //                 console.log("Serwis zwrócił kod błędu http: " + xhttp.status);
    //             }
    //         }
    //     }
    //     xhttp.setRequestHeader("Content-type", "application/json")
    //     xhttp.send(JSON.stringify(this.state.survey))
    //
    // }
    // surveyTitleChange(e) {
    //     let textChange = e.target.value
    //     this.setState((preState) => {
    //         let old = preState.survey;
    //         old.surveyName = textChange;
    //         return { survey: old }
    //     });
    // }
    // surveyDescritpionChange(e) {
    //     let textChange = e.target.value
    //     this.setState((preState) => {
    //         let old = this.state.survey;
    //         old.surveyDescription = textChange;
    //         return { survey: old }
    //     });
    // }
    // addQuestionCard() {
    //     this.setState((prevState) => {
    //             let old = prevState.survey;
    //             old.pageList[this.state.currentPage - 1].questionList.push({
    //                 questionText: "",
    //                 questionDescription: "",
    //                 isRequiered: false,
    //                 questionType: "shortText",
    //                 answers: []
    //
    //             });
    //             return { survey: old }
    //         }
    //     );
    // }
    // addPage() {
    //     this.setState((prevState) => {
    //             let old = prevState.survey;
    //             old.pageList.push({
    //                 pageDescription: "",
    //                 questionList: [
    //                     {
    //                         questionText: "",
    //                         questionDescription: "",
    //                         isRequiered: false,
    //                         questionType: "shortText",
    //                         answers: []
    //                     }
    //                 ]
    //             });
    //             return { survey: old }
    //         }
    //     );
    // }
    // changePage(index) {
    //     this.setState((prevState) => {
    //         return { currentPage: index }
    //     });
    // }
    // moveQuestion(index, direction) {
    //     if (direction == "up" && index > 0) {
    //
    //         this.setState((prevState) => {
    //             let old = prevState.survey;
    //             let up = prevState.survey.pageList[this.state.currentPage - 1].questionList;
    //             let tempSwitch = up[index - 1];
    //             up[index - 1] = up[index];
    //             up[index] = tempSwitch;
    //             old.pageList[this.state.currentPage - 1].questionList = up;
    //             return { survey: old }
    //         })
    //
    //     }
    //     if (direction == "down" && this.state.survey.pageList[this.state.currentPage - 1].questionList.length - 1 > index) {
    //         this.setState((prevState) => {
    //             let old = prevState.survey;
    //             let up = prevState.survey.pageList[this.state.currentPage - 1].questionList;
    //             let tempSwitch = up[index + 1];
    //             up[index + 1] = up[index];
    //             up[index] = tempSwitch;
    //             old.pageList[this.state.currentPage - 1].questionList = up;
    //             return { survey: old }
    //         })
    //     }
    // }
    // deleteQuestion(index) {
    //     this.setState((prevState) => {
    //         let old = prevState.survey
    //         let newState = old.pageList[this.state.currentPage - 1].questionList;
    //         newState.splice(index, 1);
    //         old.pageList[this.state.currentPage - 1].questionList = newState;
    //         return { survey: old }
    //     })
    // }
    // deleteMultiQuestion(parentIndex, childIndex) {
    //     this.setState((prevState) => {
    //         let old = prevState.survey
    //         let newState = old.pageList[this.state.currentPage - 1].questionList[parentIndex].answers;
    //         newState.splice(childIndex, 1);
    //         old.pageList[this.state.currentPage - 1].questionList[parentIndex].answers = newState;
    //         return { survey: old }
    //     });
    //     this.forceUpdate();
    // }
    // OnDragEnd(result) {
    //     if(!result.destination)
    //     {return;}
    //
    //     if(result.destination.droppableId === result.source.droppableId && result.index === result.source.index)
    //     {return;}
    //
    //     this.setState((prevState)=>
    //     {
    //         var oldQuestion=prevState.survey.pageList[prevState.currentPage-1].questionList[result.source.index];
    //         prevState.survey.pageList[prevState.currentPage-1].questionList.splice(result.source.index,1);
    //         prevState.survey.pageList[prevState.currentPage-1].questionList.splice(result.destination.index,0,oldQuestion);
    //         return {state: prevState}
    //
    //     })
    // }
    render() {
        fetch("http://localhost:8080/survey-service/ankieta/5cdbd3c8925aaa0e7d32f37e")
            .then(response => response.json())
            .then(data => (this.setState( { surveyjson: data } )));
        console.log(this.state.surveyjson);
        console.log(this.state.survey);
        return (
            <MDBContainer>
                    <MDBInput value={this.state.survey.surveyName} type="textarea" label="Nazwa ankiety" rows="2" />
                    <MDBInput value={this.state.survey.surveyDescription} type="textarea" label="Opis ankiety" rows="2" />
                    <br />
                <MDBRow center>
                    <MDBPagination className="d-flex justify-content-center" size="lg">
                        <MDBPageItem onClick={() => (this.setPage("Previous"))} disabled={this.state.survey.pageList.length > 1}>
                            <MDBPageNav aria-label="Previous">
                                <span aria-hidden="false">Previous</span>
                            </MDBPageNav>
                        </MDBPageItem>
                            {
                                (this.state.surveyjson.pageList).map((value, index) =>
                                    (<MDBPageItem active={this.state.currentPage - 1 == index}
                                                  onClick={() => (this.changePage(index + 1))} key={index + 1}>
                                        <MDBPageNav>
                                            {index + 1}
                                        </MDBPageNav>
                                    </MDBPageItem>))
                            }
                        <MDBPageItem onClick={() => (this.setPage("Next"))} disabled={this.state.survey.pageList.length <= 1}>
                            <MDBPageNav aria-label="Next">
                                <span aria-hidden="true">Previous</span>
                            </MDBPageNav>
                        </MDBPageItem>
                    </MDBPagination>
                </MDBRow>
                <MDBContainer id="QuestionList">
                    <MDBRow>
                        <MDBCol>
                                {(this.surveyjson.pageList[this.state.currentPage - 1].questionList || []).map(
                                    (question, value) => (
                                        <React.Fragment key={this.state.currentPage + '.' + value}>
                                            <div >
                                                <Question parentKey={this.state.currentPage + '.' + value} data={question} index={value} />
                                            </div>
                                            <div className="pb-0 pt-0 mt-2 border-bottom-5 border-top-0 rounded list-group-item" />
                                        </React.Fragment>
                                    )
                                )}
                            <MDBInput value={"OPIS"} type={"textarea"} label={"Opis strony"} rows={1}/>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        </MDBContainer>)
    }
}

export default SurveyComponent;