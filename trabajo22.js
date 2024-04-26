const readlineSync = require('readline-sync');
class Vuelo {
    constructor(origen, destino, costoBase) {
        this.origen = origen;  
        this.destino = destino;  
        this.costoBase = costoBase;  
        this.impuesto = 0;  
        this.pasajeros = [];  
        this.vuelosEnPromocion = false; 
    }

    agregarPasajero(pasajero) {
        this.pasajeros.push(pasajero);
    }

    calcularCostoTiquete() {
        let totalRecaudado = 0;
        for (let i = 0; i < this.pasajeros.length; i++) {
            let costo = this.costoBase;
            if (this.vuelosEnPromocion) {
                costo *= 0.9; 
            }
            costo += costo * (this.impuesto / 100); 
            totalRecaudado += costo;
        }
        return totalRecaudado;
    }
}
class Pasajero {
    constructor(edad, llevaMascota) {
        this.edad = edad;  
        this.llevaMascota = llevaMascota;  
    }

    esInfante() {
        return this.edad <= 12;
    }
}
class SistemaReservas {
    constructor() {
        this.vuelos = [];  
    }

    agregarVuelo(vuelo) {
        this.vuelos.push(vuelo);
    }

    calcularIngresosTotales() {
        let total = 0;
        for (let i = 0; i < this.vuelos.length; i++) {
            total += this.vuelos[i].calcularCostoTiquete();
        }
        return total;
    }

    calcularIngresosMascotas() {
        let ingresosMascotas = 0;
        for (let i = 0; i < this.vuelos.length; i++) {
            for (let j = 0; j < this.vuelos[i].pasajeros.length; j++) {
                if (this.vuelos[i].pasajeros[j].llevaMascota) {
                    let costoMascota = this.vuelos[i].costoBase * (this.vuelos[i].impuesto / 100);
                    ingresosMascotas += costoMascota;
                }
            }
        }
        return ingresosMascotas;
    }

    contarInfantes() {
        let contador = 0;
        for (let i = 0; i < this.vuelos.length; i++) {
            for (let j = 0; j < this.vuelos[i].pasajeros.length; j++) {
                if (this.vuelos[i].pasajeros[j].esInfante()) {
                    contador++;
                }
            }
        }
        return contador;
    }
}
const readline = require('readline-sync');
let sistemaReservas = new SistemaReservas();
let costoDulces = 2; 

let continuar = 's';
while (continuar === 's') {
    let origen = readline.question('Origen del vuelo: ');
    let destino = readline.question('Destino del vuelo: ');
    let costoBase = parseFloat(readline.question('Costo base del vuelo: '));
    let impuesto = parseFloat(readline.question(`Impuesto para ${destino} (%): `));

    let vuelo = new Vuelo(origen, destino, costoBase);
    vuelo.impuesto = impuesto;
    vuelo.vuelosEnPromocion = readline.question('¿El vuelo está en promoción? (s/n): ') === 's';

    let agregarPasajeros = 's';
    while (agregarPasajeros === 's') {
        let edad = parseInt(readline.question('Edad del pasajero: '));
        let llevaMascota = readline.question('¿El pasajero lleva mascota? (s/n): ') === 's';
        let pasajero = new Pasajero(edad, llevaMascota);
        vuelo.agregarPasajero(pasajero);
        agregarPasajeros = readline.question('¿Agregar otro pasajero al vuelo? (s/n): ');
    }

    sistemaReservas.agregarVuelo(vuelo);
    continuar = readline.question('¿Agregar otro vuelo? (s/n): ');
}

console.log('Ingresos totales por venta de tiquetes: $' + sistemaReservas.calcularIngresosTotales());
console.log('Dinero recaudado por transporte de mascotas: $' + sistemaReservas.calcularIngresosMascotas());
console.log('Número de infantes que han viajado: ' + sistemaReservas.contarInfantes());
console.log('Costo total de dulces para infantes: $' + (sistemaReservas.contarInfantes() * costoDulces));




