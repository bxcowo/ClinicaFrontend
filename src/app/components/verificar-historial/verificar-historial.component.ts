import { Component } from '@angular/core';
import { HistorialclinicoService } from '../../service/historialclinico.service'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verificar-historial',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verificar-historial.component.html',
  styleUrls: ['./verificar-historial.component.css']
})
export class VerificarHistorialComponent {
  dni: number = 0;  
  historialClinico: any = null;  
  isLoading: boolean = false;    
  isValid: boolean | null = null; 
  errorMessage: string = '';
  
  constructor(
    private historialclinicoService: HistorialclinicoService,  
    private router: Router
  ) { }
  
  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';  
    this.historialclinicoService.findHistorialClinicoByPacienteDni(this.dni).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.historialClinico = response;  
        this.isValid = true;  
      },
      error: (error) => {
        this.isLoading = false;
        this.isValid = false;  
        if (error.status === 500) {
          this.errorMessage = 'Ocurrió un error inesperado.';
        } else {
          this.errorMessage = 'No existe el historial clinico.';
        }
        this.historialClinico = null;  
      }
    });
  }

  onRetry() {
    this.errorMessage = '';  
    this.dni = 0; 
    this.historialClinico = null;  
    this.isValid = null; 
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
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
