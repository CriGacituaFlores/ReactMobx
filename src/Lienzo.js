import React, { Component } from 'react';
import Platillos from './Platillos';
import Pedidos from './Pedidos';
import Bebidas from './Bebidas';

class Lienzo extends Component {
  render(){
    return(
      <div className="container">
        <div className="jumbotron">
          <h2>Nombre de la tienda</h2>
        </div>
        <Platillos/>
        <Bebidas/>
        <Pedidos/>
      </div>
    )
  }
}

export default Lienzo;
