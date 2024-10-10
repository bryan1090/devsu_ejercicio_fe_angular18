import { FormControl, FormGroup } from "@angular/forms"
import { dateCheckValidator } from "./dateCheck"

describe('dateCheck', () => {
    it('debe funcionar la validación', () => {
        const formGroup = new FormGroup({
            date_release: new FormControl('1/9/2024'),
            date_check: new FormControl('1/9/2025'),
        }, { validators: dateCheckValidator });
        expect(formGroup.valid).toBe(true);
    });
    it('debe fallar la validación', () => {
        const formGroup = new FormGroup({
            date_release: new FormControl('1/9/2024'),
            date_check: new FormControl('1/9/2026'),
        }, { validators: dateCheckValidator });
        expect(formGroup.valid).toBe(false);
        expect(formGroup.errors).toBeTruthy();
        expect(formGroup.hasError('dateCheck','')).toBe(true);
    })
})