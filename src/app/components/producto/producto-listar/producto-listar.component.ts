import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoAgregarComponent } from '../producto-agregar/producto-agregar.component';
import { Router, RouterModule } from '@angular/router';
import { Producto } from 'src/app/interfaces/IProducto';
import { FormsModule } from '@angular/forms';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-producto-listar',
  standalone: true,
  imports: [CommonModule, ProductoAgregarComponent, FormsModule,PlaceholderDirective,RouterModule],
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./product-listar.component.css']
})

export class ProductoListarComponent {
  public productos: Producto[] = [];
  public productos_filtrados: Producto[] = [];
  public productos_filtro_busqueda: Producto[] = [];
  public productos_filtro_tamanio: Producto[] = [];
  public textoBuscar: string = "";
  public cant_prod_mostrar: number = 0;

  constructor(private productoService: ProductoService, private router: Router,private mensajeService:MensajeService) {

    this.productoService.listarProductos().subscribe(x => {

      this.productos = x;

      this.productos_filtrados = this.productos;
      this.productos_filtro_busqueda = this.productos;
      this.productos_filtro_tamanio = this.productos;
      
    },(error=>{
      // let prueba: Producto = { date_release: new Date(), date_revision: new Date(), description: 'una prueba', id: '1', logo: '', name: 'prueba' };
      // let prueba2: Producto = { date_release: new Date(), date_revision: new Date(), description: 'una prueba2', id: '2', logo: '', name: 'prueba2' };
      // this.productos.push(prueba);
      // this.productos.push(prueba2);
      // this.productos.push(prueba2);
      // this.productos.push(prueba2);
      // this.productos.push(prueba2);
      // this.productos.push(prueba2);
      // this.productos.push(prueba2);

      // this.productos_filtrados = this.productos;
      // this.productos_filtro_busqueda = this.productos;
      // this.productos_filtro_tamanio = this.productos;
      
    }))
  }

  agregar() {
    this.router.navigate(['agregar']);
  }
  filtrar_busqueda() {
    this.productos_filtro_busqueda = this.productos_filtro_tamanio.filter(p => {
       return p.name.toLowerCase().includes(this.textoBuscar) || p.description.toLowerCase().includes(this.textoBuscar) 
      });
      this.productos_filtrados=this.productos_filtro_busqueda;

  }
  filtrar_cantidad() {
    this.productos_filtro_tamanio=this.productos;
    if(this.productos_filtro_tamanio.length>this.cant_prod_mostrar)
      this.productos_filtro_tamanio=this.productos_filtro_tamanio.slice(0,this.cant_prod_mostrar);

    this.productos_filtrados=this.productos_filtro_tamanio;
  }

  get obtener_cant_prod()
  {
    return this.productos_filtrados.length;
  }

}
