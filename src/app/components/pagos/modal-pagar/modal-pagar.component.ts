import { Component, Input, OnInit } from '@angular/core';
import { IOrdenDePagoResponse } from '../../../model/orden-de-pago-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IOrdenDePagoRequest } from '../../../model/orden-de-pago-request';
import { OrdeDePagoService } from '../../../services/orde-de-pago.service';
import { concatMap, forkJoin } from 'rxjs';

@Component({
  selector: 'modal-pagar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-pagar.component.html',
  styleUrl: './modal-pagar.component.css',
})
export class ModalPagarComponent implements OnInit {
  @Input()
  ordenSeleccionada?: IOrdenDePagoResponse;

  showSuccessMessage: boolean = false;

  // Metodo de pago
  metodoPagoSeleccionado: number = 1;

  // Tarjeta de credito o debito
  selectedCardType: string | null = null;
  isScanning = false;
  readerStatus = 'Lector en espera...';
  cardData = '';

  // Billetera digital
  selectedBilletera: string | null = null;
  qrCodeGenerated = false; // Bandera para mostrar QR
  qrImage = ''; // Imagen del QR

  constructor(private ordenDePagoService: OrdeDePagoService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const tabMenu = document.getElementById('tabMenu');

    if (tabMenu) {
      tabMenu.addEventListener('shown.bs.tab', (event: any) => {
        const selectedId = event.target.id; // ID del tab seleccionado

        if (selectedId === 'option1-tab') {
          this.metodoPagoSeleccionado = 1; // Tarjeta crédito/débito
        } else if (selectedId === 'option2-tab') {
          this.metodoPagoSeleccionado = 2; // Billetera digital
        } else if (selectedId === 'option3-tab') {
          this.metodoPagoSeleccionado = 4; // Efectivo
        }
      });
    }
  }

  simulateCardScan(): void {
    if (!this.selectedCardType) return;

    // Inicia la simulación
    this.isScanning = true;
    this.readerStatus = 'Leyendo tarjeta...';

    setTimeout(() => {
      // Se completa la simulación
      this.isScanning = false;
      this.readerStatus = 'Lectura completada';

      this.cardData =
        this.selectedCardType === 'Visa'
          ? 'Visa: **** **** **** 1234'
          : 'Mastercard: **** **** **** 5678';
    }, 4000);
  }

  generarQR() {
    if (this.selectedBilletera) {
      setTimeout(() => {
        this.qrImage = 'assets/qr.png';
        this.qrCodeGenerated = true;
      }, 1000);
    }
  }

  confirmarPago() {
    const idComprobanteDePago =
      this.ordenSeleccionada?.comprobanteDePago === 'Boleta' ? 1 : 2;

    // Mostrar el mensaje de éxito
    this.showSuccessMessage = true;

    // Iniciar las peticiones de forma secuencial
    this.ordenDePagoService
      .updateComprobanteDePago(
        this.ordenSeleccionada?.idOrdenDePago!,
        idComprobanteDePago
      )
      .pipe(
        concatMap(() => {
          return this.ordenDePagoService.updateMetodoDePago(
            this.ordenSeleccionada?.idOrdenDePago!,
            this.metodoPagoSeleccionado
          );
        }),
        concatMap(() => {
          return this.ordenDePagoService.updateEstadoDePago(
            this.ordenSeleccionada?.idOrdenDePago!
          );
        })
      )
      .subscribe({
        next: () => {
          // Si todas las peticiones son exitosas, recargar la página
          setTimeout(() => {
            this.showSuccessMessage = false;
            window.location.reload();
          }, 2000);
        },
        error: (err) => {
          console.error('Error al procesar las solicitudes', err);
          this.showSuccessMessage = false;
        },
      });
  }
}
