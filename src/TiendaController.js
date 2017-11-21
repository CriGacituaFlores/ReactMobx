import { extendObservable, computed } from 'mobx';

class TiendaController {
  constructor(){
    extendObservable(this, {
      platillos: [{
        nombre: "primer platillo",
        descripcion: "platillo muy rico",
        precio: 0
      },{
        nombre: "segundo platillo",
        descripcion: "platillo muy rico",
        precio: 0
      },{
        nombre: "tercer platillo",
        descripcion: "platillo muy rico",
        precio: 0
      }]
    });
  }
}

var VarTiendaController = new TiendaController();

export default VarTiendaController;
