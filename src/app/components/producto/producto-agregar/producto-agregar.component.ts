import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Producto } from "src/app/interfaces/IProducto";
import { ProductoDto } from "src/app/interfaces/IProductoDto";
import { MensajeService } from "src/app/services/mensaje.service";
import { ProductoService } from "src/app/services/producto.service";
import { dateCheckValidator } from "src/app/validators/dateCheck";
import { dateReleaseValidator } from "src/app/validators/dateRelease";
import { productoExistsValidator } from "src/app/validators/productoExiste";

@Component({
  selector: "app-producto-agregar",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./producto-agregar.component.html",
  styleUrls: ["./producto-agregar.component.css"],
})
export class ProductoAgregarComponent {
  formProducto = new FormGroup(
    {
      //Requerido, mínimo 3 caracteres y máximo 10, validación de ser un Id que no exista mediante el consumo del servicio de verificación.
      id: new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        [productoExistsValidator(this.productoService)]
      ),
      //Requerido, mínimo 5 caracteres y máximo 100
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      //Requerido, mínimo 10 caracteres y máximo 200
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      //Requerido
      logo: new FormControl("", [Validators.required]),
      //Requerido, la Fecha debe ser igual o mayor a la fecha actual
      date_release: new FormControl("", [
        Validators.required,
        dateReleaseValidator(),
      ]),
      //Requerido, la Fecha debe ser exactamente un año posterior a la fecha de liberación
      date_check: new FormControl("", [Validators.required]),
    },
    dateCheckValidator
  );

  id_param: string = "";
  producto_editar: Producto = {
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: new Date(),
    date_revision: new Date(),
  };
  constructor(
    private productoService: ProductoService,
    private mensajeService: MensajeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id_param = params["id"];
      this.productoService.listarProductos().subscribe((p: ProductoDto[]) => {
        let product_encontrado: ProductoDto | undefined = p.find(
          (p: ProductoDto) => p["id"] == this.id_param
        );
        if (product_encontrado) {
          this.producto_editar = {
            id: product_encontrado["id"],
            name: product_encontrado["name"],
            description: product_encontrado["description"],
            logo: product_encontrado["logo"],
            date_release: new Date(product_encontrado["date_release"]),
            date_revision: new Date(product_encontrado["date_revision"]),
          };
          this.actualizarForm();
        }
      });
    });
  }

  get id() {
    return this.formProducto.get("id");
  }
  get name() {
    return this.formProducto.get("name");
  }
  get description() {
    return this.formProducto.get("description");
  }
  get logo() {
    return this.formProducto.get("logo");
  }
  get date_release() {
    return this.formProducto.get("date_release");
  }
  get date_check() {
    return this.formProducto.get("date_check");
  }

  actualizarForm() {
    this.id?.setValue(this.producto_editar?.id);
    this.id?.disable();
    this.name?.setValue(this.producto_editar.name);
    this.description?.setValue(this.producto_editar.description);
    this.logo?.setValue(this.producto_editar.logo);
    const locale = "es-ES";
    const opciones: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    this.date_check?.setValue(
      this.producto_editar.date_revision.toLocaleDateString(locale, opciones)
    );
    this.date_release?.setValue(
      this.producto_editar.date_release.toLocaleDateString(locale, opciones)
    );
  }

  enviar() {
    if (!this.formProducto.valid) {
      //alert("formulario invalido");
      console.error(this.formProducto);
      return;
    }

    const [dia_dr, mes_dr, anio_dr] = this.formProducto.value.date_release
      ? this.formProducto.value.date_release.split("/").map(Number)
      : [0, 0, 0];
    const [dia_dc, mes_dc, anio_dc] = this.formProducto.value.date_check
      ? this.formProducto.value.date_check.split("/").map(Number)
      : [0, 0, 0];

    let date_release: Date = new Date(anio_dr, mes_dr, dia_dr);
    let date_check: Date = new Date(anio_dc, mes_dc, dia_dc);
    let producto: Producto = {
      date_release: date_release,
      description: this.formProducto.value.description
        ? this.formProducto.value.description
        : "",
      id: this.id?.value ? this.id.value : "", //accede al valor disabled unicamente de esta forma
      logo: this.formProducto.value.logo ? this.formProducto.value.logo : "",
      name: this.formProducto.value.name ? this.formProducto.value.name : "",
      date_revision: date_check,
    };

    //editar
    if (this.producto_editar&& this.producto_editar.id) {
      this.productoService.editarProducto(producto).subscribe(() => {
        this.resetearFormulario();
      });
      return;
    }

    //crear
    this.productoService.crearProducto(producto).subscribe(() => {
      this.resetearFormulario();
    });
  }
  resetearFormulario() {
    this.date_check?.markAsPristine();
    this.date_check?.markAsUntouched();
    this.date_check?.setValue("");
    this.formProducto.reset();
  }
}
