class Bitacora {
  constructor() {
    this.fecha = new Date();
    this.regitros = new Array();
  }
  addRegistro(registro) {
    this.registros.push(registro);
    guardarEnLocalStorage();
  }
  mostrarBitacora() {
    let registros = "";
    this.registros.forEach((r) => {
      registros +=
        r.mensaje +
        " - " +
        r.usuario +
        " - " +
        r.fechaHora.toLocaleString() +
        "\n";
    });
    alert(registros);
  }
}
