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

function mostrarMenu() {
  let flag = true;
  while (flag) {
    let mensaje = "Elija una opcion: ";
    mensaje += "\n1) Transferencia ";
    mensaje += "\n2) Plazo fijo ";
    mensaje += "\n3) Ver Saldo ";
    mensaje += "\n4) Ver Bitacora ";
    mensaje += "\n5) Salir ";

    let respuesta = prompt(mensaje);
    switch (respuesta) {
      case "1":
        transferencia();
        break;
      case "2":
        plazoFijo();
        break;
      case "3":
        VerSaldo();
        break;
      case "4":
        verBitacora();
        break;
      case "5":
        alert("Gracias por elegirnos  ");
        flag = false;
        break;
      case null:
        alert("Gracias por elegirnos  ");
        flag = false;
        break;
      default:
        alert("Opcion inexistente");
    }
  }
}

function getCuentaCliente(origen, cliente) {
  let mensaje = "Indique cuenta";
  if (origen) {
    mensaje += " origen:";
  } else {
    mensaje += " destino:";
  }

  mensaje += "\n 1) " + cliente.getcCuentaPesos().getDescripcion();
  mensaje += "\n 2) " + cliente.getCuentaDolares().getDescripcion();

  let respuesta = prompt(mensaje);
  if (respuesta == 1) {
    return cliente.getCuentaPesos();
  }
  if (respuesta == 2) {
    return cliente.getCuentaDolares();
  }
  return false;
}
