import React, { Component } from 'react';
import { MDBIcon, MDBBtn, MDBInput, MDBCardGroup, MDBCard, MDBRow, MDBContainer, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class MultipleAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
    this.AddNewQuestion = this.AddNewQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  AddNewQuestion() {
    let answwweeers = this.state.answers;
    answwweeers.push("");
    this.setState(
      (prevState) => ({ answers: answwweeers })
      , this.props.func(this.state.answers));
    // this.props.func(this.answers);

  }
  handleChange(event) {
    let index = event.target.id.replace('AnswerTextInput', '');
    let AllAnwsers = this.state.answers;
    AllAnwsers[index] = event.target.value;
    this.setState((prevState) => ({ answers: AllAnwsers }), this.props.func(this.state.answers))
  }
  render() {
    return (
      <MDBContainer fluid id="MultiChoice" class>
        {(this.state.answers || []).map((values, index) =>
          (
            <MDBRow className="pt-0">
              <MDBCol size="auto" className="pr-0">
                <div class="custom-control custom-checkbox ">
                  <input type="checkbox" class="custom-control-input" id={"IsRequiredCheckbox" + index} />
                  <label class="custom-control-label" style={{ color: "#757575" }} for={"IsRequiredCheckbox" + index}></label>
                </div>
              </MDBCol>
              <MDBCol size="6" className="m-0 p-0" >
                <MDBInput key={index} id={"AnswerTextInput" + index} onChange={this.handleChange} hint="Przykładowa odpowiedź" value={values} className="m-0 p-0 MinusMarginTop" />
              </MDBCol>
              <MDBCol size="auto" > <MDBIcon icon="trash-alt" /></MDBCol>
            </MDBRow>
          ))}
        <MDBBtn onClick={this.AddNewQuestion} color="primary">Dodaj nową odpowiedź</MDBBtn>
      </MDBContainer>
    )
  }
}

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: props.data.questionText,
      isRequiered: props.data.isRequiered,
      questionType: "Short",
      answers: [],
      questionComponent: (
        <MDBContainer>
          <MDBInput hint="Przykładowa odpowiedź" className="p-0" type="textarea" rows="1" />
        </MDBContainer>
      )
    }
    this.questionTextChange = this.questionTextChange.bind(this);
    this.questionDescriptionChange = this.questionDescriptionChange.bind(this);
    this.isRequieredChange = this.isRequieredChange.bind(this);
    this.questionTypeChange = this.questionTypeChange.bind(this);
    this.addAnswers = this.addAnswers.bind(this);
    this.MoveUp = this.MoveUp.bind(this);
    this.MoveDown = this.MoveDown.bind(this);
    this.DeleteAnswer= this.DeleteAnswer.bind(this);
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
    this.props.func(!this.state.isRequiered, this.props.index, "isRequiered");
    this.setState((prevStats) => ({ isRequiered: !prevStats.isRequiered }))
  }
  DeleteAnswer()
  {
    this.props.dltFunc(this.props.index);
  }
  addAnswers(e) {
    this.setState((PrevState) => ({ answers: e }), this.props.func(e, this.props.index, "Multi"))
  }
  questionTypeChange(e) {
    this.props.func(e, this.props.index, "questionType");
    this.setState({ questionTypeChange: e, answers: [] });
    if (e === "Short" || e === "Long") {
      this.setState({
        questionComponent: (
          <MDBContainer>
            <MDBInput hint="Przykładowa odpowiedź" className="p-0" type="textarea" rows="1" />
          </MDBContainer>
        )
      });

    }
    else if (e === "Radio" || e === "Check") {
      this.setState({ questionComponent: <MultipleAnswer func={this.addAnswers} /> })
    }
    else {
      this.setState({ questionComponent: null });
    }

  }

  render() {
    return (

      <div >
        <div class="row">
          <div class="col-2 align-self-center">
            <MDBCard className="text-center " >
              <MDBListGroup className="h-100  " >
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
          <div class="col">
            <MDBInput type="textarea" valueDefault={this.state.questionText} onChange={this.questionTextChange} label="Pytanie" rows="2" />
            <div>
              <MDBInput type="textarea" valueDefault={this.props.data.questionDescription} onChange={this.questionDescriptionChange} label="Opis pytania" rows="2" />
            </div>
          </div>
        </div>
        <br />
        <div class="d-flex justify-content-between align-items-end">
          <p class="d-flex " style={{ color: "#757575" }}>Odpowiedź</p>
          <div class="d-flex align-items-end">
            <DropdownButton id="dropdown-basic-button" onSelect={this.questionTypeChange} title="Typ odpowiedzi">
              <Dropdown.Item eventKey='Short' >Short</Dropdown.Item>
              <Dropdown.Item eventKey='Long'>Long</Dropdown.Item>
              <Dropdown.Item eventKey='Radio'>Radio</Dropdown.Item>
              <Dropdown.Item eventKey='Check'>Check</Dropdown.Item>
            </DropdownButton>;
          </div>
        </div>
        <MDBContainer id="AnswerHolder" className="block-example border">
          {
            this.state.questionComponent
          }
        </MDBContainer>
        <div class="d-flex flex-row-reverse mt-3">
          <div class="custom-control custom-checkbox ">
            <input checked={this.state.isRequiered} onChange={this.isRequieredChange} type="checkbox" class="custom-control-input" id="IsRequiredCheckbox" />
            <label class="custom-control-label" style={{ color: "#757575" }} for="IsRequiredCheckbox">Wymagane</label>
          </div>
        </div>
      </div>
    );
  }

}

export default QuestionCard;