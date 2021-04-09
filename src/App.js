import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import EventF from "./pages/Event/EventF";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/event/:id' component={Event} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
