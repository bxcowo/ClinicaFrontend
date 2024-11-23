import { Component } from '@angular/core';
import { OrdeDePagoService } from '../../services/orde-de-pago.service';
import { IOrdenDePagoResponse } from '../../model/orden-de-pago-response';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOrdenDePagoRequest } from '../../model/orden-de-pago-request';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {
  title = 'Pagar Orden de Pago';
  ordenDePagoArray: IOrdenDePagoResponse[] = [];
  page: number = 1;
  buscarOrdenDePagoForm: FormGroup;
  ordenDePagoRequest: IOrdenDePagoRequest = {} as IOrdenDePagoRequest;

  constructor(private ordenDePagoService: OrdeDePagoService){
    this.buscarOrdenDePagoForm = new FormGroup({
      idOrdenDePago: new FormControl(''),
    });
  }

  ngOnInit(): void{
    this.getOrdenesDePago();
  }

  getOrdenesDePago(): void{
    this.ordenDePagoService.getOrdenesDePago().subscribe((result: any)=>{
      //console.log('Result',result);
      this.ordenDePagoArray = result;
      //console.log(this.ordenDePagoArray);
    })
  }

  getOrdenDePagoById(): void{

    //const idOrdenDePago = this.buscarOrdenDePagoForm.get('inputIdOrdenDePago')?.value;
    //this.ordenDePagoService.getOrdenDePagoById(idOrdenDePago);
  }

  ngAfterViewInit() {
    let arrows = document.querySelectorAll(".arrow");
    arrows.forEach(arrow => {
      arrow.addEventListener("click", (e) => {
        let arrowParent = (e.target as HTMLElement).parentElement?.parentElement;
        arrowParent?.classList.toggle("showMenu");
      });
    });

    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".bx-menu");
    console.log(sidebarBtn);
    sidebarBtn?.addEventListener("click", () => {
      sidebar?.classList.toggle("close");
    });
  }
}