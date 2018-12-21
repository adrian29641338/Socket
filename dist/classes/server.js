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
const usuario_lista_1 = require("./usuario-lista");
const usuario_1 = require("./usuario");
//creando a variable del servidor express
class Server {
    //constructor del Server
    constructor() {
        this.usuariosConectados = new usuario_lista_1.UsuariosLista();
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        //configurando el nuevo servidor web a través de http
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    static get instance() {
        if (this._instance) {
            return this._instance;
        }
        else {
            this._instance = new this();
            return this._instance;
        }
    }
    //función para escuchar las conexiones
    escucharSockets() {
        console.log("Listo para recibir conexiones o sockets o clientes");
        //el servidor escuchaa el evento connect y recibe al cliente conectado
        this.io.on('connect', cliente => {
            console.log("Nuevo cliente conectado", cliente.id);
            const usuario = new usuario_1.Usuario(cliente.id);
            this.usuariosConectados.agregar(usuario);
            //el cliente que se ha conectado previamente, escucha su desconexion
            cliente.on('disconnect', () => {
                console.log("el cliente se ha desconectado");
                this.usuariosConectados.borrarUsuario(cliente.id);
                this.io.emit('usuarios-activos', this.usuariosConectados.getLista());
            });
            //el cliente que se ha conectado previamente, escucha un vento de nombre: 'mensaje'
            cliente.on('mensaje', (contenido) => {
                console.log("entrada", contenido);
                this.io.emit('mensaje-nuevo', contenido);
            });
            cliente.on('configurar-usuario', (payload, callback) => {
                this.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
                this.io.emit('usuarios-activos', this.usuariosConectados.getLista());
                callback({
                    ok: true,
                    mensaje: `Usuario ${payload.nombre} configurado`
                });
            });
            cliente.on('obtener-usuarios', () => {
                this.io.in(cliente.id).emit('usuarios-activos', this.usuariosConectados.getLista());
            });
        });
    }
    //funcion para iniciar el servidor
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
