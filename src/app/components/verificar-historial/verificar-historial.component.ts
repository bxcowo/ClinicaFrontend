import { Component } from '@angular/core';
import { VerificarHistorialService } from '../../services/verificar-historial.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verificar-historial',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verificar-historial.component.html',
  styleUrl: './verificar-historial.component.css'
})

export class VerificarHistorialComponent {
  id: string = '';
  isLoading: boolean = false;
  isValid: boolean | null = null;

  constructor(private verificarHistorialService: VerificarHistorialService, private router: Router) { }
  
  onSubmit() {
    this.isLoading = true;
    this.verificarHistorialService.search(this.id).subscribe(isValid => {
      this.isLoading = false;
      this.isValid = isValid;
    });
  }

  onRetry(){
    this.isValid = null;
    this.id = '';
  }

  onNavigate(route: string){
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
