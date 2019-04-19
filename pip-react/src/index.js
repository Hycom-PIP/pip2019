import React from 'react';
import ReactDOM from 'react-dom';
import QuestionCard from './QuestionCard.js';
import { MDBBtn, MDBIcon, MDBContainer, MDBInput, MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/style.css';

ReactDOM.render(
        <MDBContainer>
                <MDBInput type="textarea" label="Tytuł" rows="2" />
                <MDBInput type="textarea" label="Opis" rows="2" />
                <br />
                <MDBPagination className="d-flex justify-content-center" size="lg">
                        <MDBPageItem disabled>
                                <MDBPageNav aria-label="Previous">
                                        <span aria-hidden="true">Previous</span>
                                </MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem active>
                                <MDBPageNav>
                                        1
                                </MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem>
                                <MDBPageNav>2</MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem>
                                <MDBPageNav>3</MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem disabled>
                                <MDBPageNav aria-label="Previous">
                                        <span aria-hidden="true">Next</span>
                                </MDBPageNav>
                        </MDBPageItem>
                </MDBPagination>
                <QuestionCard />
                <br />
                <MDBBtn color="primary">Dodaj nowe pytanie</MDBBtn>               
                <MDBPagination className="d-flex justify-content-center" size="lg">
                        <MDBPageItem disabled>
                                <MDBPageNav aria-label="Previous">
                                        <span aria-hidden="true">Previous</span>
                                </MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem active>
                                <MDBPageNav>
                                        1
                                </MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem>
                                <MDBPageNav>2</MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem>
                                <MDBPageNav>3</MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem disabled>
                                <MDBPageNav aria-label="Previous">
                                        <span aria-hidden="true">Next</span>
                                </MDBPageNav>
                        </MDBPageItem>
                </MDBPagination>
                <div id="DivForButtons" class="CenterThenEnd">
                        <div>Empty object</div>
                        <div> <button id="AddPageButton" type="button" class="btn btn-primary">Dodaj stronę</button>
                        </div>
                        <div> <button id="FinishButton" type="button" class="btn btn-primary">Zakończ</button>
                        </div>
                </div>
        </MDBContainer>
        , document.getElementById('root'));