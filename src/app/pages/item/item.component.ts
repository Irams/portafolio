import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  year: number = new Date().getFullYear();
  id: string;
  cargando: boolean;

  producto: ProductoDescripcion;

  constructor( private route:ActivatedRoute,
               public productoService: ProductosService,
               public infoPagina: InfoPaginaService) { }

  ngOnInit() {
    this.route.params
        .subscribe( parametros => {
          // console.log(parametros['id']);
          this.productoService.getProducto(parametros['id'])
                .subscribe((producto:ProductoDescripcion) => {
                  this.id = parametros['id'];
                  this.producto = producto;
                  // console.log(producto);
                });
        });
  }

}
