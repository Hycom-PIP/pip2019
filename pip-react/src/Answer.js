import React from 'react';
import { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';
import { MDBContainer, MDBBtn, MDBCollapse, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { Bar } from "react-chartjs-2";

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
                        "Answer 1",
                        "Answer 2",
                        "Answer 3"
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
                        {answer: "Answer 6", value: 1}
                    ]
                }
            ]
        };

    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    loadAnswers(url)
    {
        //fetch(url + "/questions/");


    }

    componentDidMount() {
        //var url = "http://localhost:8280/" + this.state.token + "/" + this.state.version;
        this.setState({isLoaded: true});
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
                <div>
                    <MDBContainer className="block-example border pt-4">
                        <div className="spinner-border fast answerSpinner" role="status"/>
                    </MDBContainer>
                </div>
            );
        } else {
            return (
            <div>
                <MDBContainer className="block-example border pt-4">
                    {
                        this.state.questions.map((value, index) => {
                            return (
                                <MDBContainer className="block-example border pt-4 container">
                                    <MDBBtn
                                        key={index}
                                        color="grey"
                                        onClick={this.toggleCollapse("collapse" + index.toString())}
                                        style={{ marginBottom: "1rem" }}
                                    >{value.question}</MDBBtn>
                                    <MDBCollapse id={"collapse" + index.toString()} key={index} isOpen={this.state.collapseID}>
                                        {
                                            (value.type === "text") ?
                                                <MDBListGroup className="container list-group">
                                                {
                                                    value.answers.map((answer, i) => {
                                                        return (
                                                            <MDBListGroupItem key={i}>
                                                                {answer}
                                                            </MDBListGroupItem>
                                                        )
                                                    })
                                                }
                                                </MDBListGroup> : null
                                        }
                                        {
                                            (value.type === "selection") ?
                                                <MDBContainer>
                                                    <Bar data={this.getData(value.answers)}/>
                                                </MDBContainer> : null
                                        }
                                    </MDBCollapse>
                                </MDBContainer>
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