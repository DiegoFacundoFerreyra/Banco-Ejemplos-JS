class Login {
  constructor(usuario, contraseña) {
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.is_admin = false;
    this.cliente = null;
  }

  getUser() {
    return this.usuario;
  }

  setCliente(cliente) {
    this.cliente = cliente;
  }

  getCliente() {
    return this.cliente;
  }
}
