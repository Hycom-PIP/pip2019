import React, { Component } from 'react';
import { MDBIcon, MDBInput,MDBCardGroup, MDBCard, MDBRow, MDBContainer, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class QuestionCard extends Component {
  render() {
    return (
      <div >
        <div class="row">
          <div class="col-2 align-self-center">
   

            <MDBCard  className="text-center " >
              <MDBListGroup className="h-100  " >
                <MDBListGroupItem  >
                  <MDBIcon icon="angle-up " />
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <MDBIcon icon="ellipsis-h" />
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <MDBIcon icon="trash-alt" />
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <MDBIcon icon="angle-down" />
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCard>
    
          </div>
          <div class="col">
            <MDBInput type="textarea" label="Pytanie" rows="2" />
            <div>
              <MDBInput type="textarea" label="Opis pytania" rows="2" />
            </div>
          </div>
        </div>
        <br />
        <div class="d-flex justify-content-between align-items-end">
          <p class="d-flex " style={{ color: "#757575" }}>Odpowiedź</p>
          <div class="d-flex align-items-end">
            <DropdownButton id="dropdown-basic-button" title="Typ odpowiedzi">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>;
          </div>
        </div>
        <MDBContainer id="AnswerHolder" className="block-example border">
          {/* Short and long text answers */}
          <MDBContainer>
            <MDBInput hint="Przykładowa odpowiedź" className="p-0" type="textarea" rows="1" />
          </MDBContainer>
          <MDBContainer fluid id="MultiChoice" class>
            <MDBRow>
              <MDBCol size="auto" className="pr-0">
                <div class="custom-control custom-checkbox ">
                  <input type="checkbox" class="custom-control-input" id="IsRequiredCheckbox" />
                  <label class="custom-control-label" style={{ color: "#757575" }} for="IsRequiredCheckbox"></label>
                </div>
              </MDBCol>
              <MDBCol size="6" className="m-0 p-0" >
                <MDBInput id="AnswerTextInput" hint="Przykładowa odpowiedź" className="m-0 p-0 zero-top-margin" />
              </MDBCol>
              <MDBCol size="auto" > <MDBIcon icon="trash-alt" /></MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol size="auto" className="pr-0">
                <div class="custom-control custom-checkbox ">
                  <input type="checkbox" class="custom-control-input" id="IsRequiredCheckbox" />
                  <label class="custom-control-label" style={{ color: "#757575" }} for="IsRequiredCheckbox"></label>
                </div>
              </MDBCol>
              <MDBCol size="6" className="m-0 p-0" >
                <MDBInput id="AnswerTextInput" hint="Przykładowa odpowiedź" className="m-0 p-0 zero-top-margin" />
              </MDBCol>
              <MDBCol size="auto" > <MDBIcon icon="trash-alt" /></MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol size="auto" className="pr-0">
                <div class="custom-control custom-checkbox ">
                  <input type="checkbox" class="custom-control-input" id="IsRequiredCheckbox" />
                  <label class="custom-control-label" style={{ color: "#757575" }} for="IsRequiredCheckbox"></label>
                </div>
              </MDBCol>
              <MDBCol size="6" className="m-0 p-0" >
                <MDBInput id="AnswerTextInput" hint="Przykładowa odpowiedź" className="m-0 p-0 zero-top-margin" />
              </MDBCol>
              <MDBCol size="auto" > <MDBIcon icon="trash-alt" /></MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>

        <div class="d-flex flex-row-reverse mt-3">
          <div class="custom-control custom-checkbox ">
            <input type="checkbox" class="custom-control-input" id="IsRequiredCheckbox" />
            <label class="custom-control-label" style={{ color: "#757575" }} for="IsRequiredCheckbox">Wymagane</label>
          </div>
        </div>
      </div>
    );
  }

}

export default QuestionCard;