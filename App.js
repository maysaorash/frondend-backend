import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from './components/Main'
import CreateCustomer from './components/CreateCustomer';
import UpdateCustomer from './components/UpdateCustomer'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Main}/>
          <Route path='/create' exact component={CreateCustomer}/>
          <Route path='/:id/update' exact component={UpdateCustomer}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
