import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  mensajesSub = new BehaviorSubject<string[]>([]);
  mensajeObs = this.mensajesSub.asObservable();   
  duracion: number = 4000; // Duración por defecto en milisegundos


  enviarMensaje(mensaje: string) {
    const mensajes = this.mensajesSub.getValue();
    mensajes.push(mensaje);
    this.mensajesSub.next(mensajes);
    console.log('Mensaje enviado: '+mensaje);
    
    setTimeout(() => {
      this.mensajesSub.next([])
    }, this.duracion);
  }

}
