import React from 'react';
import ReactDOM from 'react-dom';
import Survey from './Survey.js'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((<BrowserRouter><Survey  /></BrowserRouter>), (document.getElementById('root')));