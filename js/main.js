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
    mensaje += "\n3) Probar suerte ";
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
        numeroAleatorio();
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

function tranferi(monto, cuentaOrigen, cuentaDestino) {
  if (cuentaOrigen && cuentaDestino) {
    if (cuentaOrigen.getClase() === cuentaDestino.getClase()) {
      if (cuentaOrigen.tieneSaldo(monto)) {
        cuentaOrigen.debitar(monto);

        cuentaDestino.acreditar(monto);

        alert("Transferencia exitosa");

        bitacora.addRegistro(
          new RegistroBit(
            "Transferencia exitosa" +
              cuentaOrigen.getDescripcion() +
              " a " +
              cuentaDestino.getDescripcion(),
            loginActual
          )
        );
      } else {
        alert("Saldo insuficiente.");
      }
    } else {
      alert("Las cuentas no son de la misma clase");
    }
  } else {
    alert("No se encontro cuenta de origen y/o destino ");
  }
}

function plazoFijo() {
  let monto = parseFloat(prompt("Ingrese monto"));
  let cantidadDias = parseInt(prompt("Ingrese cantidad de dias"));

  if (isNaN(monto) || isNaN(cantidadDias)) {
    aletr("No corresponde monto y/o dias");
    bitacora.addRegistro(new RegistroBit("Credito abortado", loginActual));
  } else {
    if (!creditoTasaCero) {
      let tasaAnual = 70 / 100;
      let tasaDiaria = (tasaAnual / 365) * monto;
      let interes = Math.ceil(tasaDiaria * cantidadDias);
      let montoTotal = monto + interes;
      alert(
        "Monto solicitado: " + monto + "\n" + "Monto a devolver: " + montoTotal
      );
      bitacora.addRegistro(
        new RegistroBit(
          "Simulacin credito: monto total " + montoTotal,
          loginActual
        )
      );
    } else {
      alert(
        "Tenes un credito a tasa cero \n Monto solicitado: " +
          monto +
          "\n" +
          "Monto a devolver " +
          monto
      );
    }
  }
}
function numeroAleatorio() {
  if (yaProboSuerte) {
    alert("Ya probaste tu suerte de hoy");
  } else {
    yaProboSuerte = true;
    let numero = Math.ceil(Math.aleatorio() * 10);
    console.log("Salio " + numero);
    if (numero % 2 == 0) {
      creditoTasaCero = true;
      alert("Hoy tu credito es a tasa 0!!");
    } else {
      alert("Hoy no tuviste suerte!!");
    }
  }
}

function verBitacora() {
  let bit = JSON.parse(localStorage.getItem(loginActual.getUsuario()));
  if (bitacora != null) {
    let bitacora = new Bitacora();
    bitacora.registros = bit.registros;
    bitacora.fecha = bit.fecha;
    bitacora.mostrarBitacora();
  }
}

function guardarEnLocalStorage() {
  localStorage.setItem(loginActual.getUsuario(), JSON.stringify(bitacora));
}

function getCliente() {
  let numeroDeCliente = prompt("Ingrese numero de cliente");
  if (numeroDeCliente) {
    let clienteEncontrado = coleccionCliente.find(
      (c) => c.numeroDeCliente == numeroDeCliente
    );
    return clienteEncontrado;
  }
  return null;
}
