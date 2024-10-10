
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../interfaces/IProducto';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url_productos=`/${environment.be_alias}/${environment.dir_productos}`;
  constructor(private http: HttpClient, private mensajeService:MensajeService) { }

  listarProductos()
  { 
    return this.http.get(`${this.url_productos}/products`).pipe(map((res:any)=>{
       return res['data'];
    })
    ,
    catchError(error => {
      console.error('Error al consultar listarProductos():', error);
      if(environment.production===false)
      this.mensajeService.enviarMensaje('Error al consultar los productos');
       return throwError(() => error);
    })
  );
  }

  existeProducto(id:string)
  { 
    return this.http.get(`${this.url_productos}/products/verification/${id}`).pipe(map((res)=>{
      //return true;
      return res;
    }),
    catchError(error => {
      // Manejo de errores
      console.error('Error al consultar existeProducto() con: '+id, error);
      if(environment.production===false)
      this.mensajeService.enviarMensaje('Error al consultar existencia de producto por id');
      return throwError(() => error);;
    })
  );
  }

  crearProducto(producto:Producto)
  {
   
    return this.http.post(`${this.url_productos}/products/`,producto).pipe(map((res)=>{
      return res;
    })
    ,
    catchError(error => {
      // Manejo de errores
      console.error('Error al consumir crearProducto() con: '+producto, error);
      if(environment.production===false)
      this.mensajeService.enviarMensaje('Error al crear producto nuevo');
      return  throwError(() => error);
    }));
  
  }

  editarProducto(producto:Producto)
  {
   
    return this.http.put(`${this.url_productos}/products/${producto.id}`,producto).pipe(map((res)=>{
      return res;
    })
    ,
    catchError(error => {
      // Manejo de errores
      console.error('Error al consumir editarProducto() con: '+producto, error);
      if(environment.production===false)
      this.mensajeService.enviarMensaje('Error al editar producto');
      return  throwError(() => error);
    }));
  
  }
}
