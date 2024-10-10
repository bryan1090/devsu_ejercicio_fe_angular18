import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(mensajes&&mensajes.length>0)
      {
        <div class="mensaje">
          @for(mensaje of mensajes;track mensaje){
            <div>
            {{simbolo}}{{mensaje|uppercase}}
            </div>
          }
    </div>
      }
  `,
  styleUrls: ['./mensaje.component.css']

})
export class MensajeComponent {
  mensajes: string[]=[];
   @Input() simbolo = '';

  constructor(private mensajeService:MensajeService){}

  ngOnInit() {
    this.mensajeService.mensajeObs.subscribe((msj:string[]) => {
      this.mensajes=msj;
      //console.warn(this.mensajes);
      
    });

  }

}
