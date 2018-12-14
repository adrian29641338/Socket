"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importando libreria express
const express_1 = __importDefault(require("express"));
const environment_1 = require("../globals/environment");
//creando a variable del servidor express
class Server {
    //constructor del Server
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
    }
    //funcion para iniciar el servidor
    start(callback) {
        this.app.listen(this.port, callback);
    }
}
exports.default = Server;
