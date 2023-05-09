import React from 'react';
import './App.css';
import CoinsTable from './components/CoinsTable.jsx';
import CoinDetail from './components/CoinDetail.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CoinsTable} />
        <Route path="/coin/:id" component={CoinDetail} />
      </Switch>
    </Router>
  );
}

export default App;
