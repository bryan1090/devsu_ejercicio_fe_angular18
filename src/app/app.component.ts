import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MensajeComponent } from './components/mensaje/mensaje.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule,MensajeComponent,NgOptimizedImage],
  template: `
    <main>
      <header class="brand-name">
        <div class="logo" >
          <a routerLink="/listar">
        <img class="brand-logo" ngSrc="/assets/logo_banco.png" alt="logo" aria-hidden="true" width="100" height="40"/>
        </a>
        </div>
        <div class=mensaje>
          
        <app-mensaje [simbolo]="simbolo" ></app-mensaje>
        </div>

        
      </header>
      <section class="content">
        <router-outlet></router-outlet>
        
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Banco';
  simbolo='**';
  // num:number=0
  // mostrarTotalMsj(num:number)
  // {
  //   this.num=num;
  // }
}
