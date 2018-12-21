import { Usuario } from './usuario';

export class UsuariosLista{
	private lista:Usuario[] = [];
	constructor(){}

	public agregar(usuario:Usuario){
		this.lista.push(usuario);
		console.log("[UsuarioLista|agregar] Usuario agregado");
		console.log("[UsuarioLista|agregar] Nueva Lista de Usuarios=>",this.lista);

	}
	public getLista(){
		let listaTemporal = this.lista.filter((usuario)=>{
			if(usuario.nombre !== 'sin-nombre'){
				return usuario;
			}
		});
		return listaTemporal;
	}

	public actualizarNombre(id:string, nombre:string){
		for(let usuario of this.lista){
			if(usuario.id === id){
				console.log("[UsuarioLista|actualizar] modificando de: ", usuario.nombre);
				usuario.nombre = nombre;
				console.log("[UsuarioLista|actualizar] a: ", usuario.nombre);
				break;
			}
		}
		console.log("[UsuarioLista|actualizarNombre] Nueva Lista de Usuarios: =>", this.lista);
	}

	public getUsuario(id:string){
		for(let usuario of this.lista){
			if(usuario.id===id){
				return usuario;
			}
		}
		console.log("[UsuarioLista|getUsuario] No se encontró al usuario con ID: =>", id);
	}

	public borrarUsuario(id:string){
		this.lista = this.lista.filter((usuario)=>{
			if(usuario.id !== id){
				return usuario;
			}
		});
		console.log("[UsuarioLista|borrarUsuario] Usuario borrado");
		console.log("[UsuarioLista|borrarUsuario] Nueva Lista de Usuarios=>",this.lista);
	}
}
