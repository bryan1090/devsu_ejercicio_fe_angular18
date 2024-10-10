import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { map } from 'rxjs';

export function productoExistsValidator(productoService: ProductoService):AsyncValidatorFn  {
    return (control: AbstractControl) => {
        return productoService.existeProducto(control.value)
            .pipe(
                map(p => p==true ? {idProducto:true} : null)
            );
    }
}