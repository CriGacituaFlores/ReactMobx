
var config = {
  apiKey: "AIzaSyC5-XTNDgm-ehTvc_xJ1PVxbFX1NsQPa5w",
  authDomain: "administracion-9090a.firebaseapp.com",
  databaseURL: "https://administracion-9090a.firebaseio.com",
  projectId: "administracion-9090a",
  storageBucket: "administracion-9090a.appspot.com",
  messagingSenderId: "452171096444"
};
firebase.initializeApp(config);

var database = firebase.database();

var escribirPlatillo = function(pNombre, pDescripcion, pPrecio, pDireccion){
  database.ref('alimentos/').push({
    nombre: pNombre,
    descripcion: pDescripcion,
    precio: pPrecio,
    direccion: pDireccion
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

      ul.appendChild(li);
    });
  });
}

//


function funcionDeLaForma(){
  var nombre = document.getElementById("nombre").value;
  var descripcion = document.getElementById("descripcion").value;
  var precio = document.getElementById("precio").value;
  var direccion = document.getElementById("imgDir").value;

  escribirPlatillo(nombre,descripcion,precio,direccion);
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
