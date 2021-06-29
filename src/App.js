import React from 'react';
import Detail from './components/body/detailProduct/Detail';
import Product from './components/body/products/Product';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App(props) {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Product} />
        <Route path="/product/:id" exact component={Detail} />
      </div>
    </Router>
  );


}

export default App;
