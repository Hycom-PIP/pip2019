import React, { Component } from 'react';
import { MDBIcon, MDBBtn, MDBInput, MDBCard, MDBRow, MDBContainer, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
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
    if (old == undefined) {
      old = []
    }
    old.push({ answer: "" })
    this.props.func(old, this.props.index, "Multi")
    this.forceUpdate();
  }
  handleChange(index, event) {
    let textChange = event.target.value;
    let AllAnwsers = this.props.answers;
    AllAnwsers[index] = { answer: textChange };
    this.props.func(AllAnwsers, this.props.index, "Multi")
    this.forceUpdate();
  }

  render() {
    return (
      <MDBContainer fluid id="MultiChoice" >
        {(this.props.answers || []).map((values, index) =>
          (
            <React.Fragment key={this.props.parentKey + '.' + index}>
              <MDBRow className="pt-0">
                <MDBCol size="auto" className="pr-0">
                  <Form>
                    <Form.Check custom type='checkbox' id={`CheckBox-${this.props.parentKey + '.' + index}`} label={``} />
                  </Form>
                </MDBCol>
                <MDBCol size="6" className="m-0 p-0" >
                  <MDBInput onChange={(event) => (this.handleChange(index, event))} hint="Przykładowe pytanie" value={values.answer} className="m-0 p-0 MinusMarginTop" />
                </MDBCol>
                <MDBCol size="auto" >
                  <MDBIcon className="PointerMouse" icon="trash-alt" onClick={() => this.DeleteMultiQuestion(index)} />
                </MDBCol>
              </MDBRow>
              <br />
            </React.Fragment>
          ))}
        <MDBBtn onClick={this.AddNewQuestion} color="primary">Dodaj nową odpowiedź</MDBBtn>
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
    this.MoveUp = this.MoveUp.bind(this);
    this.MoveDown = this.MoveDown.bind(this);
    this.DeleteAnswer = this.DeleteAnswer.bind(this);
    this.DltMultiAndUpadte = this.DltMultiAndUpadte.bind(this);
    this.GetQuestionRender = this.GetQuestionRender.bind(this);
  }

  MoveUp() {
    this.props.moveFunc(this.props.index, "up");
  }
  MoveDown() {
    this.props.moveFunc(this.props.index, "down");
  }
  questionTextChange(e) {
    this.props.func(e.target.value, this.props.index, "questionText")
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
    this.setState((PrevState) => ({ answers: e }), this.props.func(e, this.props.index, "Multi"))
  }
  questionTypeChange(e) {
    this.props.func(e, this.props.index, "questionType")
    this.props.func(null, this.props.index, "Multi")
  }
  DltMultiAndUpadte(parentIndex, childIndex) {
    this.props.multiDltfunc(parentIndex, childIndex)
    this.forceUpdate();
  }
  GetQuestionRender() {
    if (this.props.data.questionType === "Long" || this.props.data.questionType === "Short") {
      return (
        <MDBContainer>
          <MDBInput value="Przykładowa odpowiedź" className="p-0" type="textarea" rows="1" />
        </MDBContainer>)
    }
    else {
      return (<MultipleAnswer key={this.props.parentKey + '.' + this.props.index} parentKey={this.props.parentKey} index={this.props.index} func={this.props.func} answers={this.props.data.answers} multiDltfunc={this.DltMultiAndUpadte} />)
    }
  }
  render() {

    return (
      <div >
        <div className="row">
          <div className="col-2 align-self-center">
            <MDBCard className="text-center " >
              <MDBListGroup className="h-100 PointerMouse">
                <MDBListGroupItem onClick={this.MoveUp}>
                  <MDBIcon icon="angle-up " />
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <MDBIcon icon="ellipsis-h" />
                </MDBListGroupItem>
                <MDBListGroupItem onClick={this.DeleteAnswer}>
                  <MDBIcon icon="trash-alt" />
                </MDBListGroupItem>
                <MDBListGroupItem onClick={this.MoveDown} >
                  <MDBIcon icon="angle-down" />
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCard>
          </div>
          <div className="col">
            <MDBInput type="textarea" value={this.props.data.questionText} onChange={this.questionTextChange} label="Pytanie" rows="2" />
            <div>
              <MDBInput type="textarea" value={this.props.data.questionDescription} onChange={this.questionDescriptionChange} label="Opis pytania" rows="2" />
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-between align-items-end">
          <p className="d-flex " style={{ color: "#757575" }}>Odpowiedź</p>
          <div className="d-flex align-items-end">
            <DropdownButton id="dropdown-basic-button" onSelect={this.questionTypeChange} title="Typ odpowiedzi">
              <Dropdown.Item eventKey='Short'>Short</Dropdown.Item>
              <Dropdown.Item eventKey='Long'>Long</Dropdown.Item>
              <Dropdown.Item eventKey='Radio'>Radio</Dropdown.Item>
              <Dropdown.Item eventKey='Check'>Check</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <MDBContainer id="AnswerHolder" className="block-example border pt-4">
          {
            this.GetQuestionRender()
          }
        </MDBContainer>
        <div className="d-flex flex-row-reverse mt-3">
          <div className="custom-control custom-checkbox ">
            {/* <input checked={this.state.isRequiered} onChange={this.isRequieredChange} type="checkbox" class="custom-control-input" id="IsRequiredCheckbox" />
            <label class="custom-control-label" style={{ color: "#757575" }} for="IsRequiredCheckbox">Wymagane</label> */}
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
    );
  }
}

export default QuestionCard;