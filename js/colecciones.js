//Cliente
// 1 Una opcion para acreditar
let cliente1 = new Cliente(1, "Diego", "Ferreyra");
cliente1.setCuentaPesos(new Cuenta(111111, "$"));
cliente1.setCuentaDolares(new Cuenta(888888, "US$"));
let cuenta_pesos = cliente1.getCuentaPesos();
cuenta_pesos.acreditar(100000);

//Cliente 2
//Otra forma de acreditar
let cliente2 = new Cliente(2, "Victoria", "Balzarini");
cliente2.setCuentaPesos(new Cuenta(222222, "$"));
cliente2.setCuentaDolares(new Cuenta(100000, "US$"));
cliente2.getCuentaDolares().acreditar(400);

//Cliente 3
//Sin acreditaciones
let cliente3 = new Cliente(3, "Santiago", "Facundo");
cliente2.setCuentaPesos(new Cuenta(121212, "$"));
cliente2.setCuentaDolares(new Cuenta(210825));

let coleccionClientes = new Array();
coleccionClientes.push(cliente1);
coleccionClientes.push(cliente2);
coleccionClientes.push(cliente3);

//Lo mismo pero con los LOGIN

let login1 = new Login("Dferreyra", "Peugeot207");
login1.setCliente(cliente1);

let login2 = new Login("Vbalzarini", "Santi2025");
login2.setCliente(cliente2);

let login3 = new Login("Sferreyra", "Lunita2024");
login3.setCliente(cliente3);

let coleccionLogines = new Array();
coleccionLogines.push(login1);
coleccionLogines.push(login2);
coleccionLogines.push(login3);

let bitacora = new Bitacora();
