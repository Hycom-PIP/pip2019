import React from 'react';
import { Component } from 'react';
import Question from './Question.js';
import Finish from './Finish';
import Error from './Error';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MDBBtn, MDBContainer, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import { BrowserRouter as Router, Route, withRouter, Switch, Redirect } from "react-router-dom"
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';
class SurveyComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            tempToken: "",
            currentPage: 1,
            surveyjson: undefined,
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
            },
            answers: {
                token: "",
                version: "",
                pages: []
            }
        };
        if (props.surveyJson !== undefined) {
            this.state.survey = JSON.parse(props.surveyJson);
        }
        if (props.token !== undefined) {
            this.state.token = props.token;
        }

        this.changePage = this.changePage.bind(this);
        this.generateJson = this.generateJson.bind(this);
        this.answerDataChange = this.answerDataChange.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setUrl = this.setUrl.bind(this);
    }
    componentDidMount() {
        let surveyID = this.props.match.params.id;
        fetch("http://localhost:8280/survey-service/ankieta/" + surveyID)
            .then(response => response.json())
            .then(data => this.setState({ surveyjson: data, answers: { token: surveyID, pages: [] } }));
    }
    setUrl(url,isGlobal) {
        if(isGlobal)
        {
            this.props.history.push(url);
        }
        else
        {
            this.props.history.push(this.props.match.path+url);

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
        this.setState((prevState) => {
            let old = prevState.answers;
            switch (type) {
                case "Text":
                case "radio":
                    this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers[0] = e;
                    break;
                case "checkbox":
                    if (!this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.includes(e)) {
                        this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.push(e);
                    } else
                        if (this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.includes(e)) {
                            var ind = this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.indexOf(e);
                            this.state.answers.pages[pageIndex - 1].questionList[questionIndex].answers.splice(ind, 1);
                        }

                    break;
                default:
                    break;
            }
            return { answers: { version: this.state.surveyjson.version, pages: old.pages, token: old.token } }
        }
        )
    }
    //
    generateJson() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8280/survey-service/ankieta", true);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    toast.success("OKAY, YOU GOT IT");
                    this.setUrl(this.props.redirectSucces, true);
                } else {
                    toast.error("Some answers might be wrong or there is problem with survey server\nTry again :)\nError code [" + xhttp.status + "]")
                }
            }
        };
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(this.state.answers));
    }

    changePage(index) {
        this.setState({ currentPage: index })
    }
    render() {
        if (this.state.surveyjson !== undefined) {
            if (this.state.answers.pages.length === 0) {
                let pageIndex = 0;
                if (this.state.surveyjson.pageList === null) {
                    return (
                        <Redirect to={this.props.redirectError} />
                    )
                }
                this.state.surveyjson.pageList.forEach((element) => {
                    let page = { pageId: pageIndex, questionList: [] }; //TODO: Ustawic PageID - zrobione
                    pageIndex++;
                    let questionIndex = 0;
                    element.questionList.forEach((elem2) => {
                        page.questionList.push(
                            {
                                questionId: questionIndex, //TODO: ustawic QuestionID - zrobione
                                questionText: elem2.questionText,
                                questionType: elem2.questionType,
                                answers: []
                            }
                        );
                        questionIndex++;
                    });
                    this.state.answers.pages.push(page)
                });
            }
            return (
                <MDBContainer className="block-example border pt-4">
                    <ToastContainer position={toast.POSITION.TOP_CENTER}
                        autoClose={4000}
                    />
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
                                                <Question parentKey={this.state.currentPage + '.' + value}
                                                    data={question}
                                                    pageIndex={this.state.currentPage}
                                                    questionIndex={value}
                                                    func={this.answerDataChange}
                                                    answered={this.state.answers.pages[this.state.currentPage - 1].questionList[value]}
                                                />
                                            </div>
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
        }
        else {
            return (
                null
            )
        }

    }
}
const SurveyComponentWithRouter = withRouter(SurveyComponent);

class RoutingAnswer extends Component {
    render() {
        const path =this.props.match.path;
        return (<Router>
            <Switch>
                <Route exact path={path+"/survey/:id"} component={()=>(<SurveyComponentWithRouter redirectError={path+"/error"} redirectSucces={path+"/finish"} />)} />
                <Route path={path+"/finish"} component={Finish} />
                <Route path={path+"/error"} component={()=>(<Error redirectError={path+"/error"}/>)} />
                <Redirect to={path+"/error"} />
            </Switch>
        </Router>);
    }

}
export default withRouter(RoutingAnswer);