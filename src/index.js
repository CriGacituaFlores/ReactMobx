import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Counter from './Counter';
import App from './App';
import Lienzo from './Lienzo'
import Platillos from './Platillos';
import Bebidas from './Bebidas';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const direcciones = (
  <BrowserRouter>
    <div>
      <Lienzo>
        <Route exact={true} path="/" component={Platillos} />
        <Route path="/bebidas" component={Bebidas} />
      </Lienzo>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  direcciones,
  document.getElementById('root')
);
