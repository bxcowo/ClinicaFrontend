import { Component } from '@angular/core';

@Component({
  selector: 'app-verificar-historial',
  standalone: true,
  imports: [],
  templateUrl: './verificar-historial.component.html',
  styleUrl: './verificar-historial.component.css'
})
export class VerificarHistorialComponent {
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
