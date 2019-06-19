import React from 'react';
import { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';
import MainView from "./SurveyList";
import { MDBContainer, MDBBtn, MDBCollapse, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { Bar } from "react-chartjs-2";
import {Link} from "react-router-dom";
import {app} from "./config";

class AnswerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            version: undefined,
            isLoaded: false,
            currentPage: 0,
            collapseID: "",
            questions: [
                {
                    question: "Question?",
                    type: "text",
                    answers: [
                        {answer: "Answer 1", value: 1},
                        {answer: "Answer 2", value: 1},
                        {answer: "Answer 3", value: 1}
                    ]
                },
                {
                    question: "Question graph?",
                    type: "selection",
                    answers: [
                        {answer: "Answer 1", value: 10},
                        {answer: "Answer 2", value: 15},
                        {answer: "Answer 3", value: 150},
                        {answer: "Answer 4", value: 180},
                        {answer: "Answer 5", value: 30},
                        {answer: "Answer 6", value: 5}
                    ]
                }
            ]
        };
        this.loadAnswers = this.loadAnswers.bind(this);
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    };

    loadAnswers(url)
    {
        fetch("http://localhost:8080/survey-service/survey/52934054-9af0-4325-94c3-12d7171be712/1/questions")
            .then(data => data.json())
            .then(json =>
            {
                if(json !== null)
                {
                    this.setState({questions: json.questions});
                    this.setState({isLoaded: true});
                } else {
                    this.setState({isLoaded: true});
                }
            });
    }

    componentDidMount() {
        this.loadAnswers();
    }

    getData(collection) {
        var coll = {
            labels: [],
            datasets: [
                {
                    label: "Ilość odpowiedzi",
                    data: []
                }
            ]
        };
        collection.map((value) => {
            coll.labels.push(value.answer);
            coll.datasets[0].data.push(value.value);
        });
        return coll;
    }

    render() {
        if(!this.state.isLoaded) {
            return (
                <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
                    <h3> Loading </h3>
                </div>
            );
        } else {
            //<div className="spinner-border fast answerSpinner" role="status"/>
            //console.log(this.state.questions);
            return (
            <div>
                <MDBContainer className="block-example border pt-4">
                    {
                        this.state.questions.map((value, index) => {
                            return (
                                <div>
                                    <MainView />
                                    <MDBContainer key={"container" + index.toString()} className="block-example border pt-4 container">
                                        <MDBBtn
                                            key={"Button" + index.toString()}
                                            color="grey"
                                            onClick={this.toggleCollapse("collapse" + index.toString())}
                                            style={{ marginBottom: "1rem" }}
                                        >{value.question}</MDBBtn>
                                        <MDBCollapse id={"collapse" + index.toString()} key={"element" + index.toString()} isOpen={this.state.collapseID}>
                                            {
                                                (value.type === "text") ?
                                                    <MDBListGroup key={"elementContainer" + index.toString()} className="container list-group">
                                                    {
                                                        value.answers.map((answer, i) => {
                                                            return (
                                                                <MDBListGroupItem key={"elementItem" + index.toString() + i.toString()}>
                                                                    {answer.answer}
                                                                </MDBListGroupItem>
                                                            )
                                                        })
                                                    }
                                                    </MDBListGroup> : null
                                            }
                                            {
                                                (value.type === "selection") ?
                                                    <MDBContainer key={"elementContainer" + index.toString()}>
                                                        <Bar data={this.getData(value.answers)}/>
                                                    </MDBContainer> : null
                                            }
                                        </MDBCollapse>
                                    </MDBContainer>
                                </div>
                            );
                        })
                    }
                </MDBContainer>
            </div>
            );
        }
    }
}

export default AnswerComponent;