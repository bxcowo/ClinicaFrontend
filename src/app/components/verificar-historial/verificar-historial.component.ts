import { Component, OnInit } from '@angular/core';
import { IHistorialclinicoResponse } from '../../model/historialclinico-response';
import { HistorialclinicoService } from '../../service/historialclinico.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verificar-historial',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './verificar-historial.component.html',
  styleUrls: ['./verificar-historial.component.css']
})
export class VerificarHistorialComponent implements OnInit {
  dni: number = 0;
  historialClinico: IHistorialclinicoResponse | null = null;
  errorMessage: string = '';

  constructor(private historialclinicoService: HistorialclinicoService) {}

  ngOnInit(): void {

  }

  findHistorialByDniPaciente(): void {
    if (!this.dni || this.dni <= 0) {
      this.errorMessage = 'Por favor ingrese un DNI válido.';
      return;
    }

    this.errorMessage = ''; 
    this.historialclinicoService.findHistorialClinicoByPacienteDni(this.dni).subscribe({
      next: (response) => {
        this.historialClinico = response; 
      },
      error: (error) => {
        if (error.status == 500) {
          this.errorMessage = 'Ocurrio un error inesperado.';
        } else {
          this.errorMessage = 'No existe el Historial Clinico.';
        }
        this.historialClinico = null;
      }
    });
  }
}
