import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Notes from './components/Notes/Notes';
import Drafts from './components/Drafts/Drafts';
import './index.css';

const routes = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact={true} path='/' component={Notes} />
        <Route path='/drafts' component={Drafts} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));
