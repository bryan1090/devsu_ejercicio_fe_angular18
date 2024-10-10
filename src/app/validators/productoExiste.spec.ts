import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
import { ProductoService } from "../services/producto.service";
import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { productoExistsValidator } from "./productoExiste";
import { take } from "rxjs";

describe('productoExiste', () => {
    let httpTestingController: HttpTestingController;
    let productoService: ProductoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductoService, 
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        })
        productoService = TestBed.inject(ProductoService);
        httpTestingController = TestBed.inject(HttpTestingController);
    })
    afterEach(() => {
        httpTestingController.verify();
    })


    it('debe funcionar la validación', () => {
        let mockResponse=false;
        const control = new FormControl('',[], [productoExistsValidator(productoService)]);

        const req=httpTestingController.expectOne('/api/bp/products/verification/');
        req.flush(mockResponse);
        expect(control.valid).toBe(true);
        
    })

    it('debe fallar la validación', () => {
        let mockResponse=true; //producto ya existe
        const control = new FormControl('',[], [productoExistsValidator(productoService)]);

        const req=httpTestingController.expectOne('/api/bp/products/verification/');
        req.flush(mockResponse);
        expect(control.valid).toBe(false);
        
    })

})