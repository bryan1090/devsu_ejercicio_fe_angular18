import { describe } from "node:test";
import { ProductoService } from "./producto.service";
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { Producto } from "../interfaces/IProducto";
import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";
import { firstValueFrom, take } from "rxjs";
import { ProductoDto } from "../interfaces/IProductoDto";

describe("ProductoService", () => {
  let productoService: ProductoService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    productoService = TestBed.inject(ProductoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("creates service products", () => {
    expect(productoService).toBeTruthy();
  });

  describe("listarProductos", () => {
    it("debe retornar una lista de productos", () => {
      let mockRes = { data: [] }; //respuesta mocked
      let productos: Producto[] | undefined;
      productoService
        .listarProductos()
        .pipe(take(1))
        .subscribe((res) => {
          productos = res;
        });
      const req = httpTestingController.expectOne("/api/bp/products");
      req.flush(mockRes); //enviamos la respuesta mocked
      expect(productos).toEqual(mockRes.data);
      //todo:configurar con ang env dev
    });
    it("lanza error", () => {
      let error: HttpErrorResponse | undefined;
      productoService.listarProductos().subscribe(
        () => {
          fail("no debe llamarse");
        },
        (err) => {
          error = err;
        }
      );
      const req = httpTestingController.expectOne("/api/bp/products");
      req.flush("ServerError", { status: 500, statusText: "Error inesperado" });
      if (!error) {
        throw new Error("Se debe definir un error");
      }
      expect(error.status).toBe(500);
      expect(error.statusText).toBe("Error inesperado");
    });
  });

  describe("existeProducto", () => {
    it("debe regresar un booleano que indica si eiste el producto", () => {
      let id_param = "uno";
      let mockResponse: boolean = false;
      let response: boolean = false;

      productoService
        .existeProducto(id_param)
        .pipe(take(1))
        .subscribe((res) => {
          res = res;
        });
      const req = httpTestingController.expectOne(
        "/api/bp/products/verification/" + id_param
      );
      req.flush(mockResponse);
      expect(response).toBe(false);
    });
  });

  describe("crearProducto", () => {
    it("debe crear un producto", () => {
      let prod_param: Producto = {
        date_release: new Date(2024, 8, 1),
        date_revision: new Date(2025, 8, 1),
        description: "una prueba ",
        id: "dos",
        logo: "logo",
        name: "prueba123 ",
      };
      let mockRespuesta: any = {
        message: "Product added successfully",
        data: {
          date_release: "2024-09-01",
          date_revision: "2024-09-02",
          description: "una prueba ",
          id: "dos",
          logo: "asda",
          name: "prueba123 ",
        },
      };
      let respuesta = null;
      productoService.crearProducto(prod_param).subscribe((res) => {
        respuesta = res;
      });
      const req = httpTestingController.expectOne("/api/bp/products/");
      req.flush(mockRespuesta);
      expect(respuesta).toBe(mockRespuesta);
    });
  });

  describe("editar Producto", () => {
    it("debe actualizar datos del producto", () => {
      let prod_param: Producto = {
        date_release: new Date(2024, 12, 10),
        date_revision: new Date(2025, 12, 10),
        description: "unoooooooo ",
        id: "uno",
        logo: "urlLogoActualizada",
        name: "unoooooo ",
      };

      let mockRespuesta = {
        message: "Product updated successfully",
        data: {
          date_release: "2024-12-10T05:00:00.000Z",
          description: "unoooooooo",
          id: "uno",
          logo: "urlLogoActualizada",
          name: "unoooooo",
          date_revision: "2025-12-10T05:00:00.000Z",
        },
      };
      let respuesta :any= null;
      productoService.editarProducto(prod_param).subscribe(res=>respuesta=res);
      const req=httpTestingController.expectOne('/api/bp/products/uno')
      req.flush(mockRespuesta);
      expect(respuesta).toBe(mockRespuesta);
      expect(respuesta['data']['logo']).toBe('urlLogoActualizada');
    });
    
  });
});
