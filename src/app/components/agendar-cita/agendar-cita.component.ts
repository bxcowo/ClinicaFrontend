import { Component } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { HorarioService } from '../../services/horario.service';
import { PacienteService } from '../../services/paciente.service';
import { OrdeDePagoService } from '../../services/orde-de-pago.service';
import { ICitaRequest } from '../../model/cita-request';
import { ICitaResponse } from '../../model/cita-response';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { IPaciente } from '../../model/paciente';
import { IHorarioResponse } from '../../model/horario-response';
import { IOrdenDePagoRequest } from '../../model/orden-de-pago-request';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})

export class AgendarCitaComponent {
  title = 'Agendar Cita';
  page: number = 1;
  buscarPacienteForm: FormGroup;
  agendarCitaForm: FormGroup;
  paciente: IPaciente = {} as IPaciente;
  horariosArray: IHorarioResponse[] = [];
  citaRequest: ICitaRequest = {} as ICitaRequest;
  horarioSeleccionado: IHorarioResponse | null = null;

  isLoadingPaciente: boolean = false;
  isLoadingHorarios: boolean = false;
  isLoadingCita: boolean = false;
  isLoadingPago: boolean = false;
  especialidades: string[] = ["Psicologia Clinica", "Psicologia Cognitiva", "Psicologia Educativa", "Psicologia Social", "Psicologia de la Personalidad"];


  constructor(
    private citaService: CitaService,
    private horarioService: HorarioService,
    private pacienteService: PacienteService,
    private ordenDePagoService: OrdeDePagoService,
    ) {

    this.buscarPacienteForm = new FormGroup({
      dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')])
    });

    this.agendarCitaForm = new FormGroup({
      fecha: new FormControl('', [Validators.required, this.fechaValida]),
      especialidad: new FormControl('', [Validators.required]),
    });
  }

  buscarPaciente(): void {
    if (this.buscarPacienteForm.valid) {
      this.isLoadingPaciente = true;
      const dni = this.buscarPacienteForm.value.dni
      this.pacienteService.getPacienteByDni(dni).subscribe(
        (data: IPaciente) => {
          this.paciente = data;
          this.isLoadingPaciente = false;
        },
        (error) => {
          console.error('Error al buscar paciente:', error);
          this.paciente = {} as IPaciente;
          this.isLoadingPaciente = false;
        }
      );
    }
  }

  fechaValida(control: FormControl): { [key: string]: any } | null {
    const hoy = new Date();
    const fechaSeleccionada = new Date(control.value);
    hoy.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(0, 0, 0, 0);
    if (fechaSeleccionada < hoy) {
      return { 'fechaPasada': true };
    }
    return null;
  }

  buscarHorarios(): void {
    if (this.paciente && this.agendarCitaForm.get('fecha')?.valid && this.agendarCitaForm.get('especialidad')?.valid) {
      this.isLoadingHorarios = true;
      const fecha = formatDate(this.agendarCitaForm.value.fecha, 'yyyy-MM-dd', 'en-US');
      const especialidad = this.agendarCitaForm.value.especialidad;
      this.horarioService.getHorariosByFechaAndEspecialidad(fecha, especialidad).subscribe(
        (data: IHorarioResponse[]) => {
          this.horariosArray = data;
          this.isLoadingHorarios = false;
        },
        (error) =>{
          console.error('Error al obtener horarios disponibles:', error);
          this.horariosArray = [];
          this.isLoadingHorarios = false;
        }
      );
    }
  }

  seleccionarHorario(horario: IHorarioResponse): void {
    if (this.horarioSeleccionado && this.horarioSeleccionado.idHorarios === horario.idHorarios) {
      // Si el horario ya está seleccionado, lo deselecciona
      this.horarioSeleccionado = null;
      console.log('Horario deseleccionado:', horario);
    } else {
      // Selecciona el nuevo horario
      this.horarioSeleccionado = horario;
      console.log('Horario seleccionado:', horario);
    }
  }

  agendarCita(): void {
    if (this.paciente && this.horarioSeleccionado && this.agendarCitaForm.valid) {
      this.isLoadingCita = true;
      const nuevaCita: ICitaRequest = {
        idCita: null,
        dni: this.paciente.dni,
        idHorarios: this.horarioSeleccionado.idHorarios,
        fecha: this.agendarCitaForm.value.fecha,
        horaInicio: this.horarioSeleccionado.horaInicio,
        horaFin: this.horarioSeleccionado.horaFin,
        estado: 'Pendiente'
      };

      this.citaService.insertCita(nuevaCita).subscribe(
        (citaResponse: ICitaResponse) => {
          console.log('Cita creada exitosamente:', citaResponse);

          this.crearOrdenPago(citaResponse.idCita, new Date(this.agendarCitaForm.value.fecha));

          this.agendarCitaForm.reset();
          this.horariosArray = [];
          this.horarioSeleccionado = null;
          this.isLoadingCita = false;
        },
        (error) => {
          console.error('Error al crear la cita:', error);
          this.isLoadingCita = false;
        }
      );
    } else {
      console.error('Error al crear la cita: Datos inválidos');
    }
  }

  crearOrdenPago(citaId: string, n_fecha: Date): void {
    this.isLoadingPago = true;
    const ordenPago: IOrdenDePagoRequest = {
      idOrdenDePago: null,
      idCita: citaId,
      idComprobanteDePago: null,
      idMetodoDePago: null,
      fecha: n_fecha,
      monto: null,
      estado: null,
    };

    this.ordenDePagoService.insertOrdenDePago(ordenPago).subscribe(
      (respuestaPago) => {
        console.log('Orden de pago creada exitosamente:', respuestaPago);
        this.isLoadingPago = false;
      },
      (error) => {
        console.error('Error al crear la orden de pago:', error);
        this.isLoadingPago = false;
      }
    );
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
