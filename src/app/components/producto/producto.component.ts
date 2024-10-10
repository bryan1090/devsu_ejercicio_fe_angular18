import { Component, inject } from '@angular/core';
import { ProductoListarComponent } from './producto-listar/producto-listar.component';
import { ProductoAgregarComponent } from './producto-agregar/producto-agregar.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [ProductoListarComponent],
  template: `
    
    <section class="results">
      <app-producto-listar></app-producto-listar>
    </section>
  `,
  styles: ``
})
export class ProductoComponent {
  
}
