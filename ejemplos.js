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
