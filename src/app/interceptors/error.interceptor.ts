import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { pipe, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MensajeService } from '../services/mensaje.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const mensajeService = inject(MensajeService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (environment.production == true) {
        mensajeService.enviarMensaje("Ocurrió un error, consulte al administrador");

      } else {
        switch (error.status) {
          case 400:
            mensajeService.enviarMensaje(error.status + " Petición incorrecta");
            break;
          case 401 || 403:
            mensajeService.enviarMensaje(error.status + " Sin permisos");
            break;
          case 404:
            mensajeService.enviarMensaje(error.status + " Recurso no encontrado");
            break;
          case 500:
            mensajeService.enviarMensaje(error.status + " Error en servidor");
            break;
          default:
            mensajeService.enviarMensaje("Ocurrió un error, consulte al administrador");
            break;
        }

      }

      return throwError(() => error);
    })
  );
  //return next(req);
};
