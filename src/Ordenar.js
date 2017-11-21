import React, { Component } from 'react';

class Ordenar extends Component {

  constructor(props){
    super(props);
    this.actualizarCantidad = this.actualizarCantidad.bind(this);
  }

  actualizarCantidad(e){
    console.log(e);
  }

  render(){
    return(
      <div>
        <br/>
        <label>Cantidad: </label>
        <input onChange={this.actualizarCantidad} type="number" min="0" max="20"/>
        <label className="EspacioPlatillo">Precio: {this.props.precio}</label>
      </div>
    )
  }

}

export default Ordenar;
