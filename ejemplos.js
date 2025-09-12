/*  function iniciarSesion() {
      const usuario = document.getElementById('usuario').value;
      const contrasena = document.getElementById('contrasena').value;
      const mensaje = document.getElementById('mensaje');

      // Usuario y contraseña simulados
      const usuarioValido = 'admin';
      const contrasenaValida = '1234';

      if (usuario === usuarioValido && contrasena === contrasenaValida) {
        mensaje.style.color = 'green';
        mensaje.textContent = 'Inicio de sesión exitoso';
        // Aquí puedes redirigir o mostrar otra vista
        // window.location.href = 'dashboard.html';
      } else {
        mensaje.style.color = 'red';
        mensaje.textContent = 'Usuario o contraseña incorrectos';
      }
    } */
/**
 * Clase cuenta que modela la entidad cuenta bancaria
 

// Carrito de compras (estructura básica)
class Carrito {
  constructor() {
    this.items = [];
  }

  // Agregar un producto al carrito
  agregarProducto(producto) {
    const existente = this.items.find(item => item.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.items.push({ ...producto, cantidad: 1 });
    }
  }

  // Eliminar un producto completamente del carrito
  eliminarProducto(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  // Disminuir la cantidad de un producto
  disminuirCantidad(id) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.cantidad -= 1;
      if (item.cantidad <= 0) {
        this.eliminarProducto(id);
      }
    }
  }

  // Calcular el total a pagar
  calcularTotal() {
    return this.items.reduce((total, item) => {
      return total + item.precio * item.cantidad;
    }, 0);
  }

  // Mostrar contenido del carrito
  mostrarCarrito() {
    if (this.items.length === 0) {
      console.log("El carrito está vacío.");
    } else {
      console.log("Contenido del carrito:");
      this.items.forEach(item => {
        console.log(`- ${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}`);
      });
      console.log(`Total: $${this.calcularTotal()}`);
    }
  }

  // Vaciar el carrito
  vaciarCarrito() {
    this.items = [];
  }
}


// Ejemplo de uso

const carrito = new Carrito();

// Productos de ejemplo
const producto1 = { id: 1, nombre: "Camiseta", precio: 20 };
const producto2 = { id: 2, nombre: "Pantalón", precio: 40 };

carrito.agregarProducto(producto1);
carrito.agregarProducto(producto2);
carrito.agregarProducto(producto1); // Agregamos otro igual

carrito.mostrarCarrito();

carrito.disminuirCantidad(1); // Quitamos una camiseta

carrito.mostrarCarrito();

carrito.vaciarCarrito();

carrito.mostrarCarrito();
/*
*/

let ya_probo_suerte = false;
let credito_tasa_cero = false;
let login_actual = null;
const hoy = new Date();

alert("Bienveni@s al homebanking \n" + hoy.toLocaleString());

if (login()) {
  mostrar_menu();
}

function login() {
  let user = prompt("Ingrese su usuario");
  let pass = prompt("Ingrese su contraseña");

  if (user && pass) {
    return checkearCredenciales(user, pass);
  } else {
    alert("Es necesario ingresar y contraseña");
    let nuevo_registro = new RegistroBit(
      "intento fallido de logueo",
      "desconocido"
    );
    bitacora.addRegistro(nuevo_registro);
  }
}

function checkearCredenciales(user, pass) {
  let login = colleccion_logines.find((l) => l.user === user && l.pass == pass);
  if (login) {
    alert("Bienvenid@ " + login.getCliente().getNombreCompleto());
    login_actual = login;
    bitacora.addRegistro(
      new RegistroBit("se logueo " + login.getUser(), login.getUser())
    );

    return login;
  } else {
    alert("credenciles incorrectas");
    bitacora.addRegistro(
      new RegistroBit(
        "credenciales incorrectas " + user + " " + pass,
        "desconocido"
      )
    );

    return null;
  }
}

function mostrar_menu() {
  let flag = true;
  while (flag) {
    let mensaje = "Indique lo que desea hacer: ";
    mensaje += "\n1) Transferencia ";
    mensaje += "\n2) Calcular tu credito ";
    mensaje += "\n3) Hoy tengo suerte? ";
    mensaje += "\n4) Ver Bitacora ";
    mensaje += "\n5) Salir ";

    let resp = prompt(mensaje);

    switch (resp) {
      case "1":
        transferencia();
        break;
      case "2":
        calcular_credito();
        break;
      case "3":
        numero_random();
        break;
      case "4":
        ver_bitacora();
        break;
      case "5":
        alert("Gracias por utilizar nuestra pagina :) ");
        flag = false;
        break;
      case null:
        alert("Gracias por utilizar nuestra pagina :) ");
        flag = false;
        break;
      default:
        alert("No ingreso una opcion valida");
    }
  }
}

function transferencia() {
  let cliente1_cuenta = getCuentaCliente(true, login_actual.getCliente());

  if (cliente1_cuenta) {
    let cliente2 = getCliente();

    if (cliente2) {
      let cliente2_cuenta = getCuentaCliente(false, cliente2);

      if (cliente2_cuenta) {
        let monto = parseFloat(prompt("Ingrese el monto a transferir"));

        if (monto) {
          transferir(monto, cliente1_cuenta, cliente2_cuenta);
        }
      }
    }
  } else {
    alert("No se indico cuenta origen");

    bitacora.addRegistro(
      new RegistroBit("No se indico cuenta origen", login_actual)
    );
  }
}

function getCuentaCliente(origen, cliente) {
  let mensaje = "Indique cuenta";

  if (origen) {
    mensaje += " origen:";
  } else {
    mensaje += " destino:";
  }

  mensaje += "\n 1) " + cliente.getCuentaPesos().getDescripcion();
  mensaje += "\n 2) " + cliente.getCuentaDolares().getDescripcion();

  let resp = prompt(mensaje);
  if (resp == 1) {
    return cliente.getCuentaPesos();
  }

  if (resp == 2) {
    return cliente.getCuentaDolares();
  }

  return false;
}

function transferir(monto, cuenta_origen, cuenta_destino) {
  if (cuenta_origen && cuenta_destino) {
    if (cuenta_origen.getTipo() === cuenta_destino.getTipo()) {
      if (cuenta_origen.tieneSaldo(monto)) {
        cuenta_origen.debitar(monto);

        cuenta_destino.acreditar(monto);

        alert("Tranferencia exitosa");

        bitacora.addRegistro(
          new RegistroBit(
            "tranferencia exitosa" +
              cuenta_origen.getDescripcion() +
              " a " +
              cuenta_destino.getDescripcion(),
            login_actual
          )
        );
      } else {
        alert("No es posible tranferir. Saldo insuficiente.");
      }
    } else {
      alert("las cuentas no son del mismo tipo");
    }
  } else {
    alert("No se encontro cuenta origen y/o destino ");
  }
}

function calcular_credito() {
  let monto = parseFloat(prompt("Ingrese monto a solicitar"));
  let cantidad_dias = parseInt(prompt("Ingrese cant de dias"));

  if (isNaN(monto) || isNaN(cantidad_dias)) {
    alert("No ingreso numeros");
    bitacora.addRegistro(new RegistroBit("credito abortado", login_actual));
  } else {
    if (!credito_tasa_cero) {
      let taza_anual = 70 / 100;

      let taza_diario = (taza_anual / 365) * monto;

      let interes = Math.ceil(taza_diario * cantidad_dias);

      let montototal = monto + interes;
      alert(
        "Monto solicitado: " + monto + "\n" + "Monto a devolver: " + montototal
      );

      bitacora.addRegistro(
        new RegistroBit(
          "simulacion credito: monto total " + montototal,
          login_actual
        )
      );
    } else {
      alert(
        "Tenes un credito a taza cero \n Monto solicitado: " +
          monto +
          "\n" +
          "Monto a devolver: " +
          monto
      );
    }
  }
}

function numero_random() {
  if (ya_probo_suerte) {
    alert("Ya probaste tu suerte hoy");
  } else {
    ya_probo_suerte = true;

    let numero = Math.ceil(Math.random() * 10);

    console.log("salio " + numero);

    if (numero % 2 == 0) {
      credito_tasa_cero = true;
      alert("HOY TUS CREDITOS SON A TAZA 0");
    } else {
      alert("Hoy no tuviste suerte :( !!");
    }
  }
}

function ver_bitacora() {
  //debugger;
  let bit = JSON.parse(localStorage.getItem(login_actual.getUser()));
  if (bitacora != null) {
    let bitacora = new Bitacora();
    bitacora.registros = bit.registros;
    bitacora.fecha = bit.fecha;

    bitacora.mostrarBitacora();
  }
  // bitacora.mostrarBitacora();
}

function guardarEnLocalStorage() {
  localStorage.setItem(login_actual.getUser(), JSON.stringify(bitacora));
}

function getCliente() {
  let nro_cliente = prompt("Indique nro de cliente");

  if (nro_cliente) {
    let cliente_encontrado = coleccion_clientes.find(
      (c) => c.nro_cliente == nro_cliente
    );

    return cliente_encontrado;
  }
  return null;
}
