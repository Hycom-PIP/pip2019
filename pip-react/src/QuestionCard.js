import React, { Component } from 'react';
import { MDBIcon, MDBBtn, MDBInput, MDBCard, MDBRow, MDBContainer, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

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

  render() {
    return (
      <MDBContainer fluid id="MultiChoice" >
        {(this.props.answers || []).map((values, index) =>
          (
            <React.Fragment key={this.props.parentKey + '.' + index}>
              <MDBRow className="pt-0">
                <MDBCol size="auto" className="pr-0">
                  <Form>
                    <Form.Check custom type={(this.props.typeOfCheckBox === "multipleOptions") ? "checkbox" : "radio"} id={`CheckBox-${this.props.parentKey + '.' + index}`} label={``} />
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
        <MDBBtn className="mb-3" onClick={this.AddNewQuestion} color="primary">Dodaj nową odpowiedź</MDBBtn>
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
    this.props.func(e, this.props.index, "multiQuestions");
  }
  questionTypeChange(e) {
    this.props.func(e, this.props.index, "questionType");
    this.props.func([""], this.props.index, "multiQuestions");
  }
  DltMultiAndUpadte(parentIndex, childIndex) {
    this.props.multiDltfunc(parentIndex, childIndex)
    this.forceUpdate();
  }
  GetQuestionRender() {
    if (this.props.data.questionType === "longText") {
      return (<Form.Control as="textarea" rows="5" />)
    }
    else if (this.props.data.questionType === "shortText") {
      return (<Form.Control as="textarea" rows="2" />);
    }
    else {
      return (
        <MDBContainer id="AnswerHolder" className="block-example border pt-4">
          <MultipleAnswer typeOfCheckBox={(this.props.data.questionType)} key={this.props.parentKey + '.' + this.props.index} parentKey={this.props.parentKey} index={this.props.index} func={this.props.func} answers={this.props.data.answers} multiDltfunc={this.DltMultiAndUpadte} />
        </MDBContainer>
      )

    }
  }
  render() {

    return (
      <Draggable draggableId={this.props.parentKey + 1} index={this.props.index}>
        {(provided) => (
          <div ref={provided.innerRef}
            {...provided.draggableProps}>
            <MDBContainer className="block-example border pt-4 pb-2 mt-2 ml-0 mr-0">
              <div className="row">
                <div className="col-2 align-self-center ">
                  <MDBCard className="text-center " >
                    <MDBListGroup className="h-100 PointerMouse noscroll">
                      <MDBListGroupItem onClick={this.MoveUp}>
                        <MDBIcon icon="angle-up " />
                      </MDBListGroupItem>
                      <MDBListGroupItem  {...provided.dragHandleProps}>
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
                  <DropdownButton id="dropdown-basic-button" onSelect={this.questionTypeChange} title={this.MapQuestionType(this.props.data.questionType)}  >
                    <Dropdown.Item eventKey='shortText'>Short</Dropdown.Item>
                    <Dropdown.Item eventKey='longText'>Long</Dropdown.Item>
                    <Dropdown.Item eventKey='singleOption'>Radio</Dropdown.Item>
                    <Dropdown.Item eventKey='multipleOptions'>Check</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
              {
                this.GetQuestionRender()
              }
              <MDBRow end className="mb-2">
                <MDBCol size="auto">
                
                  </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        )}
      </Draggable>

    );
  }
}

export default QuestionCard;