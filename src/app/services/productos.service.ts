import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }


  private cargarProductos() {


    return new Promise( ( resolve, reject ) =>{

      this.http.get('https://angular-portafolio-aa8a7-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]): void => {
          // console.log(resp);
          this.productos = resp;
          setTimeout(() => {
            this.cargando = false;
          }, 600);
          resolve();
        });

    });

  }

  getProducto(id:string){
    return this.http.get(`https://angular-portafolio-aa8a7-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino: string ){
    
    if( this.productos.length === 0 ){
      //cargar productos
      this.cargarProductos().then( () =>{
      //Esto se va a ejecutar después de cargar los productos, aplicar filtro
      this.filtrarProductos( termino );
      });
    }else{
      //Aplicar filtro
      this.filtrarProductos( termino );
    }
    
  }

  private filtrarProductos( termino: string ){
    this.productosFiltrado = [];

    // console.log(this.productos);

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod =>{

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf( termino )>= 0 || tituloLower.indexOf( termino )>= 0){
        this.productosFiltrado.push( prod );
      }
    });
    

  }
  
}
