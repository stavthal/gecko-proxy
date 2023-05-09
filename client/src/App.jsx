import React from 'react';
import './App.css';
import CoinsTable from './components/CoinsTable.jsx';
import CoinInfo from './components/CoinInfo.jsx';
import HomePage from './components/Home';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/coins" component={CoinsTable} />
        <Route exact path="/coin/:id" component={withRouter(CoinInfo)} />
      </Switch>
    </Router>
  );
}

export default App;
