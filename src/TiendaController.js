import { extendObservable, computed } from 'mobx';
import datos from './firebaseController';

class TiendaController {
  constructor(){

    self = this;

    datos.bebidas.once('value').then(function(snapshot){
      //console.log(snapshot);
      snapshot.forEach(function(childSnapshot){
        const key = childSnapshot.key;
        const valor = childSnapshot.val();

        self.bebidas.push(valor);
      });
    });

    datos.alimentos.once('value').then(function(snapshot){
      //console.log(snapshot);
      snapshot.forEach(function(childSnapshot){
        const key = childSnapshot.key;
        const valor = childSnapshot.val();

        self.platillos.push(valor);
      });
    });

    extendObservable(this, {
      platillos: [{
        nombre: "primer platillo",
        descripcion: "platillo muy rico",
        precio: 150,
        cantidad: 0
      },{
        nombre: "segundo platillo",
        descripcion: "platillo muy rico",
        precio: 100,
        cantidad: 0
      },{
        nombre: "tercer platillo",
        descripcion: "platillo muy rico",
        precio: 200,
        cantidad: 0
      }],
      bebidas: [{
        nombre: "primer bebida",
        descripcion: "bibida muy rico",
        precio: 350,
        cantidad: 0
      },{
        nombre: "segundo bebida",
        descripcion: "bibida muy rico",
        precio: 100,
        cantidad: 0
      },{
        nombre: "tercer bebida",
        descripcion: "bibida muy rico",
        precio: 200,
        cantidad: 0
      }]
    });
  }

  ponerEnLaOrden(indicePlatillo, cantidadPlatillo){
    this.platillos.forEach(
      (value,index)=>{
        if(indicePlatillo === index){
          this.platillos[index].cantidad = cantidadPlatillo;
        }
      }
    )
  }

  bebidasEnLaOrden(indiceBebida, cantidadBebida){
    this.bebidas.forEach(
      (value,index)=>{
        if(indiceBebida === index){
          this.bebidas[index].cantidad = cantidadBebida;
        }
      }
    )
  }

}

var VarTiendaController = new TiendaController();

export default VarTiendaController;
