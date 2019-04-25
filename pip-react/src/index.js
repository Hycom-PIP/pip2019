import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import QuestionCard from './QuestionCard.js';
import { MDBBtn, MDBIcon, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';
let skelet = {
        questionText: "",
        questionDescription: "",
        isRequiered: false,
        questionType: "short",
        answers: []

}
class MainView extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        oldVersionToken: null,
                        surveyName: null,
                        surveyDescription: null,
                        questionList: [{
                                questionText: "",
                                questionDescription: "",
                                isRequiered: false,
                                questionType: "short",
                                answers: []

                        }],
                        CurrentPage: 1,

                };
                this.AddQuestionCard = this.AddQuestionCard.bind(this);
                this.ChangePage = this.ChangePage.bind(this);
                this.AddPage = this.AddPage.bind(this);
                this.generateJson = this.generateJson.bind(this);
                this.HandleSurveyChange = this.HandleSurveyChange.bind(this);
                this.HandleSurveyDescritpionChange = this.HandleSurveyDescritpionChange.bind(this);
                this.FillQuestion = this.FillQuestion.bind(this);
        }
        FillQuestion(e, index, type) {
                this.setState((prevState) => {
                        let old = prevState.questionList;
                        let temp = old[index];
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
                                        temp.answers = e;
                                        break;
                        }
                        old[index] = temp;
                        return { questionList: old }
                }
                )


        }
        generateJson() {
                console.log(JSON.stringify(this.state));
        }
        HandleSurveyChange(e) {
                this.setState({ surveyName: e.target.value });
        }
        HandleSurveyDescritpionChange(e) {
                this.setState({ surveyDescription: e.target.value });
        }
        
        AddQuestionCard() {
                this.setState((prevState) => {
                        let old = prevState.questionList;
                        old.push({
                                questionText: "",
                                questionDescription: "",
                                isRequiered: false,
                                questionType: "short",
                                answers: []

                        });
                        return { questionList: old }
                }
                );
        }
        AddPage() {

        }
        ChangePage(e) {
              
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
                                        {/* {
                                                this.state.Components.map((vaule, index) =>
                                                        (<MDBPageItem onClick={this.ChangePage} key={index + 1} data-id={index + 1} >
                                                                <MDBPageNav>
                                                                        {index + 1}
                                                                </MDBPageNav>
                                                        </MDBPageItem>))
                                        } */}
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
                                                                (this.state.questionList || []).map(
                                                                        (question, value) =>
                                                                                (
                                                                                        <QuestionCard index={value} func={this.FillQuestion} />
                                                                                )
                                                                )
                                                        }
                                                </div>
                                                {/* <div class="col-sm">
                                                        {
                                                                (this.state.Components[this.state.CurrentPage-1] || []).map(
                                                                        (question, value) =>
                                                                                (
                                                                                        <React.Fragment key={value}>{question}</React.Fragment>
                                                                                )
                                                                )
                                                        }
                                                </div> */}
                                        </div>
                                </div>
                                <br />
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