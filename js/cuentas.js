//CLASE CUNETA MODELA LA ENTIDAD "CUENTA BANCARIA"
class Cuenta {
  /**
   * Constructor
   * @param {*} cbu que identifica unibocamente a la cuenta
   * @param {*} clase CC CA en $ en US$
   */
  constructor(cbu, clase) {
    this.cbu = cbu;
    this.clase = clase;
    this.saldo = 0;
  }
  /**
   * @returns
   */
  getSaldo() {
    return this.saldo;
  }
  getClase() {
    return this.clase;
  }
  debitar(monto) {
    this.saldo = this.saldo - monto;
  }
  acreditar(monto) {
    this.saldo = this.saldo + monto;
  }
  getDescripcion() {
    return this.cbu + " - " + this.clase + " - " + this.saldo;
  }
  tieneSaldo(monto) {
    return this.saldo >= monto;
  }
}
