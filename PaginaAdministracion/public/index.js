var config = {
  apiKey: "AIzaSyC5-XTNDgm-ehTvc_xJ1PVxbFX1NsQPa5w",
  authDomain: "administracion-9090a.firebaseapp.com",
  databaseURL: "https://administracion-9090a.firebaseio.com",
  projectId: "administracion-9090a",
  storageBucket: "administracion-9090a.appspot.com",
  messagingSenderId: "452171096444"
};
firebase.initializeApp(config);

//autenticacion

var ingresar = function(){
  var email = document.getElementById("correo").value;
  var password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(){
    console.log("Ingresaste correctamente");
    window.location = "agregarPlatillo.html";
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  })
}

//observador de autenticacion

firebase.auth().onAuthStateChanged(function(user){
  if (user){
    console.log('estas auterizado');

  } else {
    console.log('no estas autorizado');
    if(window.location.pathname !== "/index.html"){
        window.location = "index.html";
    }
  }
});

var salir = function(){
  firebase.auth().signOut().then(function(){
    console.log('sesion terminada');
  }, function(error){
    console.log("errrrrror: " + error);
  });
}

//

var database = firebase.database();

var escribirPlatillo = function(pNombre, pDescripcion, pPrecio, pDireccion){
  database.ref('alimentos/').push({
    nombre: pNombre,
    descripcion: pDescripcion,
    precio: pPrecio,
    direccion: pDireccion
  }).then(function(){
    alert("se agrego correctamente el platillo");
    window.location = "platillos.html";
  }).catch(function(error){
    alert("el platillo no se agrego porque: " + error);
  });
}

//Leer nuestros platillos
var imprimirPlatillos = function(){
  var query = database.ref('alimentos/');
  query.on('value', function(snapshot){
    //console.log(snapshot.val());
    var ul = document.getElementById("lista");
    snapshot.forEach(function(childSnapshot){
      console.log(childSnapshot.key);
      console.log(childSnapshot.val());

      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      var li = document.createElement("li");
      var div = document.createElement("div");
      var img = document.createElement("img");
      var br = document.createElement("br");
      var button = document.createElement("button");

      button.setAttribute('id', childKey);
      button.setAttribute("onclick", "eliminarPlatillos(this.id)");
      button.appendChild(document.createTextNode("Eliminar platillo"));

      img.src = childData.direccion;
      img.height = 60;
      img.alt = "Imagen del platillo";

      div.appendChild(img);
      li.appendChild(div);
      li.appendChild(document.createTextNode("Nombre: " + childData.nombre));
      li.appendChild(br);
      li.appendChild(document.createTextNode("Descripcion: " + childData.descripcion));
      li.appendChild(br);
      li.appendChild(document.createTextNode("Precio: " + childData.precio));
      li.appendChild(br);
      li.appendChild(button);

      ul.appendChild(li);
    });
  });
}

//Eliminar platillos

var eliminarPlatillos = function(id){
  database.ref('alimentos/' + id).remove().then(function(){
    console.log('se elimino');
  }).catch(function(error){
    console.log("fallo: " + error);
  });
}


function funcionDeLaForma(event){
  event.preventDefault();
  var nombre = document.getElementById("nombre").value;
  var descripcion = document.getElementById("descripcion").value;
  var precio = document.getElementById("precio").value;
  var direccion = document.getElementById("imgDir").value;

  try{
    escribirPlatillo(nombre,descripcion,precio,direccion);
  }catch(error){
    console.log("no se agrego: " + error);
  }

  return false;
}

var storage = firebase.storage();

var storageRef = storage.ref();

function visualizarArchivo(){
  var preview = document.querySelector('img');
  var archivo = document.querySelector('input[type=file]').files[0];
  var lector = new FileReader();

  lector.onloadend = function(){
    preview.src = lector.result;
  }

  if(archivo){
    lector.readAsDataURL(archivo);

    var subirImagen = storageRef.child('platillos/' + archivo.name).put(archivo);
    subirImagen.on('state_changed', function(snapshot){
      //Los cambios en la carga del archivo
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
  }
    }, function(error){
      console.log("error es: " + error);
    }, function(){
      console.log(subirImagen.snapshot.downloadURL);
      document.getElementById("imgDir").value = subirImagen.snapshot.downloadURL;
    });
  } else {
    preview.src="";
  }

}


//


function visualizarArchivoBebidas(){
  var preview = document.querySelector('img');
  var archivo = document.querySelector('input[type=file]').files[0];
  var lector = new FileReader();

  lector.onloadend = function(){
    preview.src = lector.result;
  }

  if(archivo){
    lector.readAsDataURL(archivo);

    var subirImagen = storageRef.child('bebidas/' + archivo.name).put(archivo);
    subirImagen.on('state_changed', function(snapshot){
      //Los cambios en la carga del archivo
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
  }
    }, function(error){
      console.log("error es: " + error);
    }, function(){
      console.log(subirImagen.snapshot.downloadURL);
      document.getElementById("imgDir").value = subirImagen.snapshot.downloadURL;
    });
  } else {
    preview.src="";
  }

}

function funcionDeLaFormaBebidas(event){
  event.preventDefault();
  var nombre = document.getElementById("nombre").value;
  var descripcion = document.getElementById("descripcion").value;
  var precio = document.getElementById("precio").value;
  var direccion = document.getElementById("imgDir").value;

  try{
    escribirPlatilloBebida(nombre,descripcion,precio,direccion);
  }catch(error){
    console.log("no se agrego: " + error);
  }

  return false;
}

var escribirPlatilloBebida = function(pNombre, pDescripcion, pPrecio, pDireccion){
  database.ref('bebidas/').push({
    nombre: pNombre,
    descripcion: pDescripcion,
    precio: pPrecio,
    direccion: pDireccion
  }).then(function(){
    alert("se agrego correctamente la bebida");
    window.location = "agregarBebida.html";
  }).catch(function(error){
    alert("la bebida no se agrego porque: " + error);
  });
}


var imprimirBebidas = function(){
  var query = database.ref('bebidas/');
  query.on('value', function(snapshot){
    //console.log(snapshot.val());
    var ul = document.getElementById("lista");
    snapshot.forEach(function(childSnapshot){
      console.log(childSnapshot.key);
      console.log(childSnapshot.val());

      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      var li = document.createElement("li");
      var div = document.createElement("div");
      var img = document.createElement("img");
      var br = document.createElement("br");
      var button = document.createElement("button");

      button.setAttribute('id', childKey);
      button.setAttribute("onclick", "eliminarBebidas(this.id)");
      button.appendChild(document.createTextNode("Eliminar bebida"));

      img.src = childData.direccion;
      img.height = 60;
      img.alt = "Imagen de bebida";

      div.appendChild(img);
      li.appendChild(div);
      li.appendChild(document.createTextNode("Nombre: " + childData.nombre));
      li.appendChild(br);
      li.appendChild(document.createTextNode("Descripcion: " + childData.descripcion));
      li.appendChild(br);
      li.appendChild(document.createTextNode("Precio: " + childData.precio));
      li.appendChild(br);
      li.appendChild(button);

      ul.appendChild(li);
    });
  });
}

var eliminarBebidas = function(id){
  database.ref('bebidas/' + id).remove().then(function(){
    console.log('se elimino');
  }).catch(function(error){
    console.log("fallo: " + error);
  });
}
