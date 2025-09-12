let yaProboSuerte = false;
let creditoTasaCero = false;
let loginActual = null;
const hoy = new Date();

alert("Bienvenidos al Homebanking \n" + hoy.toLocaleString());

if (login()) {
  mostrarMenu();
}

function login() {
  let usuario = prompt("Ingrese el usuario");
  let contraseña = prompt("Ingrese la contraseña");
  if (usuario && contraseña) {
    return checkearCredenciales(usuario, contraseña);
  } else {
    alert("Es obligatorio ingresar usuario y contraseña");
    let nuevoRegistro = new RegustroBit("Error de logueo", "desconocido");
    bitacora.addRegistro(nuevoRegistro);
  }
}

function checkearCredenciales(usuario, contraseña) {
  let login = coleccionLogines.find(
    (l) =>
      l.usuario === usuario &&
      l.contraseña ===
        contraseña /*OJO QUE EL SEGUNDO IGUAL ESTABA CON 2 EN EL EJ. DEL PROFE*/
  );
  if (login) {
    alert("Bienvenido " + login.getCliente().getNombreCompleto());
    loginActual = login;
    bitacora.addRegistro(
      new RegistroBit(
        "Ingresó " + login.getUsuario(),
        login.getUsuario()
      ) /* POR QUE ESTA 2 VECES LO MISMO?*/
    );
    return login;
  } else {
    alert("Credenciales incorrectas");
    bitacora.addRegistro(
      new RegistroBit(
        "Credenciales incorrectas " + usuario + " " + contraseña,
        "desconocido"
      )
    );
    return null;
  }
}
