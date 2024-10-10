import { describe } from "node:test";
import { MensajeService } from "./mensaje.service";
import {TestBed} from "@angular/core/testing"


describe('MensajeService',()=>{
    let mensajeService:MensajeService
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers:[MensajeService],
        });
        mensajeService =TestBed.inject(MensajeService);
    });

    it('creates a service',()=>{
        expect(mensajeService).toBeTruthy();
    })
    //--
    describe('enviarMensaje',()=>{
        it('envia mensajes',()=>{
            const mensaje=['1','2'];
            mensajeService.enviarMensaje(mensaje[0]);
            mensajeService.enviarMensaje(mensaje[1]);
            expect(mensajeService.mensajesSub.getValue()).toEqual(['1','2'])
         
        })
    })
}
);