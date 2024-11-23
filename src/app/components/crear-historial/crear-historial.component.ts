import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-historial',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-historial.component.html',
  styleUrl: './crear-historial.component.css'
})
export class CrearHistorialComponent {
  historialForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.historialForm = this.fb.group({
      dni: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      domicilio: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.historialForm.valid) {
      console.log(this.historialForm.value);
      // proxima implementacion
    }
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
