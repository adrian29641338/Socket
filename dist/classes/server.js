"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importando libreria express
const express_1 = __importDefault(require("express"));
const environment_1 = require("../globals/environment");
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
//creando a variable del servidor express
class Server {
    //constructor del Server
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        //configurando el nuevo servidor web a través de http
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    //función para escuchar las conexiones
    escucharSockets() {
        console.log("Listo para recibir conexiones o sockets o clientes");
        //el servidor escuchaa el evento connect y recibe al cliente conectado
        this.io.on('connect', cliente => {
            console.log("Nuevo cliente conectado");
            //el cliente que se ha conectado previamente, escucha su desconexion
            cliente.on('disconnect', () => {
                console.log("el cliente se ha desconectado");
            });
            //el cliente que se ha conectado previamente, escucha un vento de nombre: 'mensaje'
            cliente.on('mensaje', (contenido) => {
                console.log("entrada", contenido);
                this.io.emit('mensaje-nuevo', contenido);
            });
        });
    }
    //funcion para iniciar el servidor
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
