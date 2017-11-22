import React, { Component } from 'react';
import VarTiendaController from './TiendaController';
import { observer } from 'mobx-react';

class Pedidos extends Component {

  render(){

    let PlatillosPedidos = [];

    const llenar_PlatillosPedidos = VarTiendaController.platillos.forEach(
      (value,index)=>{
        if(value.cantidad != 0){
          PlatillosPedidos.push(
            <div className="list-group-item" key={index}>
              <div className="panel-body">
                <h4>{value.nombre}</h4><br/>
                <div className="APrecioCantidad">
                  <span>Cantidad: {value.cantidad}</span>
                  <span className="PrecioPlatillo">Precio: {value.cantidad * value.precio}</span>
                </div>
              </div>
            </div>
          );
        }
      }
    )

    return(
      <div className="container col-md-6">
        <div>
          <div className="panel panel-primary">
            <div className="list-group PedidosMenu">
              {PlatillosPedidos}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default observer(Pedidos);
