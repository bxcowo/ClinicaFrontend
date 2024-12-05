import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HistorialclinicoService } from '../../services/historialclinico.service';
import { PacienteService } from '../../services/paciente.service';
import { IPaciente } from '../../model/paciente';
import { IHistorialclinicoRequest } from '../../model/historialclinico-request';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear-historial',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-historial.component.html',
  styleUrl: './crear-historial.component.css'
})
export class CrearHistorialComponent {
  historialForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private historialclinicoService: HistorialclinicoService,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.initializeForm();
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

  initializeForm(): void {
    this.historialForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      domicilio: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.historialForm.invalid){
      alert('Por favor, complete todos los campos debidamente.');
      return;
    }
 
    const paciente: IPaciente = {
      dni: this.historialForm.value.dni,
      nombres: this.historialForm.value.nombres,
      apellidos: this.historialForm.value.apellidos,
      fechaDeNacimiento: this.historialForm.value.fechaNacimiento,
      correoElectronico: this.historialForm.value.correo,
      numeroCelular: this.historialForm.value.celular,
      domicilio: this.historialForm.value.domicilio,
    };

    const historialClinico: IHistorialclinicoRequest = {
      idHistorialClinico: null,
      dni: this.historialForm.value.dni,
      fecha: null,
      observaciones: null,
      diagnosticos: null
    };

    this.pacienteService.insertPaciente(paciente).subscribe({
      next: (response) => {
        console.log('Paciente creado exitosamente',response);
        
        //creamos el historial clinico
        this.historialclinicoService.insertHistorialClinico(historialClinico).subscribe({
          next: (response) => {
            alert('Historial Clinico creado exitosamente')
            console.log('Historial Clinico: ',response)
            this.historialForm.reset();
          },
          error: (err) => {
            alert('Error al intentar crear un historial clinico');
            console.error(err);
          }
        });
      },
      error: (err) => {
        alert('Error al crear el paciente');
        console.error(err);
      }
    });
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
