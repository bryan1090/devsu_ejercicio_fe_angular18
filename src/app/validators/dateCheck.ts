import { AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms';

export const dateCheckValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    //valida que la fecha de revisión sea exacto un año posterior a a fecha de lanzamiento

    //se obtiene cada dato de fecha y se lo conviete en numero
    //se asigna a las 3 variables correspondientes
    const [dia1, mes1, anio1] = control.value.date_release.split('/').map(Number);
    const [dia2, mes2, anio2] = control.value.date_check.split('/').map(Number);

    if (dia1 === dia2 && mes1 === mes2 && anio2 === anio1 + 1)
        return null;
    else
        return { dateCheck: true };
};