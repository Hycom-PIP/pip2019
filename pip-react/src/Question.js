import React, { Component } from 'react';
import { MDBIcon, MDBBtn, MDBInput, MDBCard, MDBRow, MDBContainer, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup'
// import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

class SingleAnswer extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.formChanged = this.formChanged.bind(this);
        console.log("CONSTR", this.props)
    }
    handleChange(index, event) {
        let textChange = event.target.value;
        let AllAnwsers = this.props.answers;
        AllAnwsers[index] = { answer: textChange };
        this.props.func(AllAnwsers, this.props.index, "multiQuestions")
        this.forceUpdate();
    }
    formChanged(e) {
        console.log("SHORT", this.props.pageindex, this.props.questionindex);
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
                                    <Form.Check value={values.answer} onChange={this.formChanged.bind(this)} type='radio' id={`Radio-${this.props.parentKey + '.' + index}`} name={"Radio"+this.props.parentKey} label={``} />
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

        this.AddNewQuestion = this.AddNewQuestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.DeleteMultiQuestion = this.DeleteMultiQuestion.bind(this);
    }
    DeleteMultiQuestion(e) {
        this.props.multiDltfunc(this.props.index, e)
        this.forceUpdate();
    }
    AddNewQuestion() {
        let old = this.props.answers
        if (old === undefined) {
            old = []
        }
        old.push({ answer: "" })
        this.props.func(old, this.props.index, "multiQuestions")
        this.forceUpdate();
    }
    handleChange(index, event) {
        let textChange = event.target.value;
        let AllAnwsers = this.props.answers;
        AllAnwsers[index] = { answer: textChange };
        this.props.func(AllAnwsers, this.props.index, "multiQuestions")
        this.forceUpdate();
    }
    formChanged(e) {
        console.log("BUTTON", e.target.value);
        this.props.func(e.target.value, this.props.pageindex, this.props.questionindex, "checkbox")
    }


    render() {
        return (
            <MDBContainer fluid id="MultiChoice" >
                <Form.Group onChange={this.formChanged.bind(this)}>
                    {(this.props.answers || []).map((values, index) =>
                        (
                            <React.Fragment key={this.props.parentKey + '.' + index}>
                                <MDBRow className="pt-0">
                                    <MDBCol size="auto" className="pr-0">
                                        <Form.Check value={values.answer} onChange={this.formChanged.bind(this)} type='checkbox' id={`CheckBox-${this.props.parentKey + '.' + index}`} name={"CheckBox"+this.props.parentKey} label={``} />
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

        this.questionTextChange = this.questionTextChange.bind(this);
        this.questionDescriptionChange = this.questionDescriptionChange.bind(this);
        this.isRequieredChange = this.isRequieredChange.bind(this);
        this.questionTypeChange = this.questionTypeChange.bind(this);
        this.addAnswers = this.addAnswers.bind(this);
        this.DeleteAnswer = this.DeleteAnswer.bind(this);
        this.DltMultiAndUpadte = this.DltMultiAndUpadte.bind(this);
        this.GetQuestionRender = this.GetQuestionRender.bind(this);
        this.MapQuestionType = this.MapQuestionType.bind(this);
    }
    MapQuestionType(questionType) {
        if (questionType === "shortText")
            return "Short"
        if (questionType === "longText")
            return "Long"
        if (questionType === "multipleOptions")
            return "Checkbox"
        if (questionType === "singleOption")
            return "Radio"
    }
    questionTextChange(e) {
        this.props.func(e.target.value, this.props.pageIndex, this.props.questionIndex, "Text")
    }
    questionDescriptionChange(e) {
        this.props.func(e.target.value, this.props.index, "questionDescription");
    }
    isRequieredChange(e) {
        this.props.func(!this.props.data.isRequiered, this.props.index, "isRequiered");
    }
    DeleteAnswer() {
        this.props.dltFunc(this.props.index);
    }
    addAnswers(e) {
        this.props.func(e, this.props.index, "multiQuestions");
    }
    questionTypeChange(e) {
        this.props.func(e, this.props.index, "questionType");
        this.props.func(null, this.props.index, "multiQuestions");
    }
    DltMultiAndUpadte(parentIndex, childIndex) {
        this.props.multiDltfunc(parentIndex, childIndex)
        this.forceUpdate();
    }
    GetQuestionRender() {
        if (this.props.data.questionType === "longText" || this.props.data.questionType === "shortText") {
            return (
                <MDBContainer>
                    <MDBInput label="Przykładowa odpowiedź" className="p-0" onChange={this.questionTextChange} type="text" rows="1" />
                </MDBContainer>)
        }
        else {
            if(this.props.data.questionType === "multipleOptions")
                return (<MultipleAnswer key={this.props.parentKey + '.' + this.props.index} pageindex={this.props.pageIndex} questionindex={this.props.questionIndex} parentKey={this.props.parentKey} index={this.props.index} func={this.props.func} answers={this.props.data.answers} multiDltfunc={this.DltMultiAndUpadte} />)
            else
                return (<SingleAnswer key={this.props.parentKey + '.' + this.props.index} pageindex={this.props.pageIndex} questionindex={this.props.questionIndex} parentKey={this.props.parentKey} index={this.props.index} func={this.props.func} answers={this.props.data.answers} multiDltfunc={this.DltMultiAndUpadte} />)
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
                        <MDBContainer id="AnswerHolder" className="block-example border pt-4">
                            {
                                this.GetQuestionRender()
                            }
                        </MDBContainer>
                        <div className="d-flex flex-row-reverse mt-3">
                            <div className="custom-control custom-checkbox ">
                                <Form>
                                    <Form.Check
                                        onChange={this.isRequieredChange}
                                        checked={this.props.data.isRequiered}
                                        custom
                                        type='checkbox'
                                        id={`CheckBox-${this.props.index}`}
                                        label={`Wymagane`}
                                    />
                                </Form>
                            </div>
                        </div>
                    </div>
            </MDBContainer>
                )

    }
}

export default QuestionCard;