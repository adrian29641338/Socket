//importando libreria express
import express from 'express';
import { SERVER_PORT } from '../globals/environment';
//creando a variable del servidor express
export default class Server{

	public app:express.Application;
	public port:Number;

	//constructor del Server
	constructor(){
		this.app = express();
		this.port = SERVER_PORT;
	}
	//funcion para iniciar el servidor
	public start(callback:Function){
		this.app.listen(this.port,callback);
	}
}