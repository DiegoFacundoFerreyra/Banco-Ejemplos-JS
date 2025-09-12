//CLASE QUE MODELO LO QUE VA A PASAR EN LA WEB

class RegistroBit {
  constructor(mensaje, usuario) {
    this.mensaje = mensaje;
    this.usuario = usuario;
    this.fechaHora = new Date();
  }
  getFechaHoraString() {
    return this.fechaHora;
  }
  getDescription() {
    return (
      this.mensaje + " - " + this.usuario + " - " + this.getFechaHoraString()
    );
  }
}
