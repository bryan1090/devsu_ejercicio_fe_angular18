import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
//valida que la fecha sea igual o superior a la fecha actual
export function dateReleaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const fechaControl = control.value;

        const partesFecha = fechaControl.split('/');
        const dia = parseInt(partesFecha[0]);
        const mes = parseInt(partesFecha[1]) - 1; // Los meses empiezan en 0
        const anio = parseInt(partesFecha[2]);
        const fechaIngresada = new Date(anio, mes, dia);

        const fechaActual = new Date();

        if (fechaIngresada >= fechaActual) {
            return null; 
        } else {
            return { dateRelease: true }; // La fecha es inválida
        }
    }
}