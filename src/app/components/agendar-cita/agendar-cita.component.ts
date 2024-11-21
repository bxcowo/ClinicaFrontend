import { Component } from '@angular/core';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [],
  templateUrl: './agendar-cita.component.html',
  styleUrl: './agendar-cita.component.css'
})
export class AgendarCitaComponent {
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
