class Cliente {
  constructor(numeroCliente, nombre, apellido) {
    this.numeroCliente = numeroCliente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cuentaPesos = null;
    this.cuentaDolares = null;
  }
  getCuentaPesos() {
    return this.cuentaPesos;
  }
  getCuentaDolares() {
    return this.cuentaDolares;
  }
  setCuentaPesos(nuevaCuenta) {
    this.cuentaPesos = nuevaCuenta;
  }
  setCuentaDolares(nuevaCuenta) {
    this.cuentaDolares = nuevaCuenta;
  }
  getDatos() {
    return this.numeroCliente + " - " + this.nombre + " - " + this.apellido;
  }
  getNombreCompleto() {
    return this.nombre + " " + this.apellido;
  }
}
