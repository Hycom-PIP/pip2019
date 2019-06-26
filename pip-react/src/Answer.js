import React from 'react';
import { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';
import { MDBContainer, MDBBtn, MDBCollapse, MDBListGroup, MDBListGroupItem, MDBBadge } from "mdbreact";
import { Bar } from "react-chartjs-2";
import { Redirect } from 'react-router-dom';

class AnswerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            desc: undefined,
            token: props.match.params.token,
            version: props.match.params.version,
            isLoaded: false,
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

    loadAnswers()
    {
        fetch("http://localhost:8080/survey-service/survey/"+this.state.token+"/"+this.state.version+"/questions")
            .then(data =>   data.json())
            .then(json => {
                this.setState({questions: json.questions, name: json.surveyName, desc: json.surveyDesc});
                this.setState({isLoaded: true});
            }).catch(err => this.setState({isLoaded: err}));
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
                    data: [],
                    backgroundColor: [
                        "rgba(255, 134,159,0.4)",
                        "rgba(98,  182, 239,0.4)",
                        "rgba(255, 218, 128,0.4)",
                        "rgba(113, 205, 205,0.4)",
                        "rgba(170, 128, 252,0.4)",
                        "rgba(255, 177, 101,0.4)"
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)",
                        "rgba(98,  182, 239, 1)",
                        "rgba(255, 218, 128, 1)",
                        "rgba(113, 205, 205, 1)",
                        "rgba(170, 128, 252, 1)",
                        "rgba(255, 177, 101, 1)"
                    ]
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
        if(this.state.isLoaded !== true && this.state.isLoaded !== false)
        {
            return(<Redirect to='/error'/>)
        }
        if(!this.state.isLoaded) {
            return (
                <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
                    <h3> Ładowanie </h3>
                </div>
            );
        } else {
            return (
            <div>
                <MDBContainer className="block-example border pt-4">
                    <div><div style={{ marginLeft: "15%" }}>Nazwa: {this.state.name}</div></div>
                    <div><div style={{ marginLeft: "15%" }}>Opis: {this.state.desc}</div></div>
                    <div><div style={{ display: "inline-block", marginLeft: "15%" }}>Token: {this.state.token}</div><div className="summaryInfo">Wersja: {this.state.version}</div></div>
                </MDBContainer>
                <MDBContainer className="block-example border pt-4">
                    {
                        this.state.questions.map((value, index) => {
                            return (
                                <MDBContainer key={"container" + index.toString()} className="block-example border pt-4 container">
                                    <MDBBtn
                                        key={"Button" + index.toString()}
                                        color="grey"
                                        onClick={this.toggleCollapse("collapse" + index.toString())}
                                        style={{ marginBottom: "2.75%" }}
                                    >{value.question}</MDBBtn>
                                    <MDBCollapse id={"collapse" + index.toString()} key={"element" + index.toString()} isOpen={this.state.collapseID}>
                                        {
                                            (value.type === "text") ?
                                                <MDBListGroup key={"elementContainer" + index.toString()} className="container list-group">
                                                {
                                                    value.answers.map((answer, i) => {
                                                        return (
                                                            <MDBListGroupItem key={"elementItem" + index.toString() + i.toString()} className="d-flex justify-content-between align-items-center">
                                                                {answer.answer}{(answer.value > 1) ? <MDBBadge color="primary" pill>{answer.value}</MDBBadge> : null}
                                                            </MDBListGroupItem>
                                                        )
                                                    })
                                                }
                                                </MDBListGroup> : null
                                        }
                                        {
                                            (value.type === "selection") ?
                                                <MDBContainer key={"elementContainer" + index.toString()}>
                                                    <Bar data={this.getData(value.answers)} options={barChartOptions}/>
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

const barChartOptions =  {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        xAxes: [
            {
                barPercentage: 1,
                gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                },
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    }
};

export default AnswerComponent;