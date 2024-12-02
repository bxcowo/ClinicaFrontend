import { Component } from '@angular/core';
import { OrdeDePagoService } from '../../services/orde-de-pago.service';
import { IOrdenDePagoResponse } from '../../model/orden-de-pago-response';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOrdenDePagoRequest } from '../../model/orden-de-pago-request';
import { ModalPagarComponent } from './modal-pagar/modal-pagar.component';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ModalPagarComponent,
  ],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css',
})
export class PagosComponent {
  title = 'Pagar Orden de Pago';
  page: number = 1;
  mostrarAlerta: boolean = false;

  public ordenDePagoArray: IOrdenDePagoResponse[];
  public ordenSeleccionada?: IOrdenDePagoResponse;
  public idOrdenDePago: FormControl<string | null>;
  public formControls: FormControl<string | null>[] = [];

  constructor(private ordenDePagoService: OrdeDePagoService) {
    this.idOrdenDePago = new FormControl('');
    this.ordenDePagoArray = [];
    this.ordenSeleccionada = undefined;
  }

  ngOnInit(): void {
    this.getOrdenesDePago();
  }

  getOrdenesDePago(): void {
    this.ordenDePagoService
      .getOrdenesDePago()
      .subscribe((result: IOrdenDePagoResponse[]) => {
        this.ordenDePagoArray = [...result];

        // Inicializa los formControls para cada orden de pago
        this.ordenDePagoArray.forEach((orden, index) => {
          this.formControls[index] = new FormControl(orden.comprobanteDePago);
          // if (orden.estado === 'pagado') {
          //   this.formControls[index].disabled;
          // }
        });
      });
  }

  getOrdenDePagoById(): void {
    if (this.idOrdenDePago.value !== '') {
      this.ordenDePagoArray = [];
      this.ordenDePagoService
        .getOrdenDePagoById(this.idOrdenDePago.value!)
        .subscribe((value) => {
          this.ordenDePagoArray = [value];

          // Recalcula los formControls
          this.formControls = this.ordenDePagoArray.map(
            (orden) => new FormControl(orden.comprobanteDePago)
          );
        });
    } else {
      this.getOrdenesDePago();
    }
  }

  actualizarOrdenSeleccionada(index: number, event: Event): void {
    const tipoComprobante = this.formControls[index].value;

    if (tipoComprobante !== '') {
      this.ordenSeleccionada = this.ordenDePagoArray[index];
      this.ordenSeleccionada.comprobanteDePago = tipoComprobante!;
    } else {
      event.preventDefault();
      this.mostrarAlerta = true;
    }
  }

  isTipoComprobanteValido(index: number): boolean {
    return this.formControls[index].value !== '';
  }

  cerrarAlerta(): void {
    this.mostrarAlerta = false;
  }

  ngAfterViewInit() {
    let arrows = document.querySelectorAll('.arrow');
    arrows.forEach((arrow) => {
      arrow.addEventListener('click', (e) => {
        let arrowParent = (e.target as HTMLElement).parentElement
          ?.parentElement;
        arrowParent?.classList.toggle('showMenu');
      });
    });

    let sidebar = document.querySelector('.sidebar');
    let sidebarBtn = document.querySelector('.bx-menu');
    sidebarBtn?.addEventListener('click', () => {
      sidebar?.classList.toggle('close');
    });
  }

  refrescar() {
    window.location.reload();
  }
}
