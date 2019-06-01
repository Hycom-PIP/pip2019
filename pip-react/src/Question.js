import React, { Component } from 'react';
import { MDBInput, MDBRow, MDBContainer, MDBCol } from "mdbreact";
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Route, Link, Redirect, Switch ,withRouter} from "react-router-dom";

class SingleAnswer extends Component {
    constructor(props) {
        super(props);
        this.formChanged = this.formChanged.bind(this);
    }
    formChanged(e) {
        this.props.func(e.target.value, this.props.pageindex, this.props.questionindex, "radio")
    }

    render() {
        return (
            <MDBContainer fluid id="SingleChoice" >

                <Form.Group>
                {(this.props.answers || []).map((values, index) =>
                    (
                        <React.Fragment key={this.props.parentKey + '.' + index}>
                            <MDBRow className="pt-0">
                                <MDBCol size="auto" className="pr-0">
                                    <Form.Check value={values.answer}
                                                checked={this.props.answered.answers.includes(values.answer)}
                                                onChange={this.formChanged.bind(this)}
                                                type='radio'
                                                id={`Radio-${this.props.parentKey + '.' + index}`}
                                                name={"Radio"+this.props.parentKey}
                                                label={``}
                                    />
                                </MDBCol>
                                <MDBCol size="6" className="m-0 p-0" >
                                    <p>{values.answer}</p>
                                </MDBCol>
                            </MDBRow>
                            <br />
                        </React.Fragment>
                    ))}
                </Form.Group>
            </MDBContainer>
        )
    }
}

class MultipleAnswer extends Component {
    constructor(props) {
        super(props);

    }
    formChanged(e) {
        this.props.func(e.target.value, this.props.pageindex, this.props.questionindex, "checkbox")
    }


    render() {
        return (
            <MDBContainer fluid id="MultiChoice" >
                <Form.Group>
                    {(this.props.answers || []).map((values, index) =>
                        (
                            <React.Fragment key={this.props.parentKey + '.' + index}>
                                <MDBRow className="pt-0">
                                    <MDBCol size="auto" className="pr-0">
                                        <Form.Check value={values.answer}
                                                    checked={this.props.answered.answers.includes(values.answer)}
                                                    onChange={this.formChanged.bind(this)}
                                                    type='checkbox'
                                                    id={`CheckBox-${this.props.parentKey + '.' + index}`}
                                                    name={"CheckBox"+this.props.parentKey}
                                                    label={``}
                                        />
                                    </MDBCol>
                                    <MDBCol size="6" className="m-0 p-0" >
                                        <p>{values.answer}</p>
                                    </MDBCol>
                                </MDBRow>
                                <br />
                            </React.Fragment>
                        ))}
                </Form.Group>
            </MDBContainer>
        )
    }
}

class QuestionCard extends Component {
    constructor(props) {
        super(props);

        this.answerTextChange = this.answerTextChange.bind(this);
        this.isRequieredChange = this.isRequieredChange.bind(this);
        this.addAnswers = this.addAnswers.bind(this);
        this.GetQuestionRender = this.GetQuestionRender.bind(this);
        this.MapQuestionType = this.MapQuestionType.bind(this);
    }
    MapQuestionType(questionType) {
        if (questionType === "shortText")
            return "Short";
        if (questionType === "longText")
            return "Long";
        if (questionType === "multipleOptions")
            return "Checkbox";
        if (questionType === "singleOption")
            return "Radio"
    }
    answerTextChange(e) {
        this.props.func(e.target.value, this.props.pageIndex, this.props.questionIndex, "Text")
    }
    isRequieredChange(e) {
        this.props.func(!this.props.data.isRequiered, this.props.index, "isRequiered");
    }
    addAnswers(e) {
        this.props.func(e, this.props.index, "multiQuestions");
    }
    GetQuestionRender() {
        if (this.props.data.questionType === "longText" || this.props.data.questionType === "shortText") {
            return (
                <MDBContainer>
                    <MDBInput label="Przykładowa odpowiedź" value={this.props.answered.answers[0]} onChange={this.answerTextChange} type="text" rows="1" />
                </MDBContainer>)
        }
        else {
            if(this.props.data.questionType === "multipleOptions")
                return (
                    <MultipleAnswer key={this.props.parentKey + '.' + this.props.index}
                                    pageindex={this.props.pageIndex}
                                    questionindex={this.props.questionIndex}
                                    parentKey={this.props.parentKey}
                                    index={this.props.index}
                                    func={this.props.func}
                                    answers={this.props.data.answers}
                                    answered={this.props.answered}
                    />);
            else
                return (
                    <SingleAnswer key={this.props.parentKey + '.' + this.props.index}
                                  pageindex={this.props.pageIndex}
                                  questionindex={this.props.questionIndex}
                                  parentKey={this.props.parentKey}
                                  index={this.props.index}
                                  func={this.props.func}
                                  answers={this.props.data.answers}
                                  answered={this.props.answered}
                    />)
        }
    }

    render() {

        return (
            <MDBContainer className="block-example border pt-4">
                    <div>
                        <div className="row">
                            <div className="col">
                                <p>{this.props.data.questionText}</p>
                                <div>
                                    <p>{this.props.data.questionDescription}</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-between align-items-end">
                            <p className="d-flex " style={{ color: "#757575" }}>Odpowiedź</p>

                        </div>
                        <MDBContainer id="AnswerHolder" className="block-example border border-bottom-5 pt-4">
                            {
                                this.GetQuestionRender()
                            }
                        </MDBContainer>
                        <br />
                    </div>
            </MDBContainer>
                )

    }
}

export default QuestionCard;