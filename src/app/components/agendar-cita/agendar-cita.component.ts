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
// import { ToastrModule, ToastrService } from 'ngx-toastr';  
import { IOrdenDePagoRequest } from '../../model/orden-de-pago-request';


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
  especialidades: string[] = ["PCli", "PCog", "PEdu", "PSoc", "PPer"];


  constructor(
    private citaService: CitaService,
    private horarioService: HorarioService,
    private pacienteService: PacienteService,
    private ordenDePagoService: OrdeDePagoService,
//    private toastr: ToastrService
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
//          this.toastr.success('Paciente encontrado exitosamente.', 'Éxito');
          this.isLoadingPaciente = false;
        },
        (error) => {
          console.error('Error al buscar paciente:', error);
//          this.toastr.error('No se encontró un paciente con ese DNI.', 'Error');
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
      const fecha = this.agendarCitaForm.value.fecha;
      const especialidad = this.agendarCitaForm.value.especialidad;
      this.horarioService.getHorariosByFechaAndEspecialidad(fecha, especialidad).subscribe(
        (data: IHorarioResponse[]) => {
          this.horariosArray = data;
          this.isLoadingHorarios = false;
        },
        (error) =>{
          console.error('Error al obtener horarios disponibles:', error);
          this.horariosArray = [];
//          this.toastr.error('Error al obtener horarios disponibles.', 'Error');
          this.isLoadingHorarios = false;
        }
      );
    }
  }

  seleccionarHorario(horario: IHorarioResponse): void {
    this.horarioSeleccionado = horario;
//    this.toastr.info(`Horario seleccionado: ${this.horarioSeleccionado.horaInicio} - ${this.horarioSeleccionado.horaFin} || ${this.horarioSeleccionado.nombresMedico} ${this.horarioSeleccionado.apellidosMedico}`, 'Horario Seleccionado');
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
//          this.toastr.success('Cita agendada exitosamente.', 'Éxito');

          this.crearOrdenPago(citaResponse.idCita, this.agendarCitaForm.value.fecha);

          this.agendarCitaForm.reset();
          this.horariosArray = [];
          this.horarioSeleccionado = null;
          this.isLoadingCita = false;
        },
        (error) => {
          console.error('Error al crear la cita:', error);
//          this.toastr.error('Error al agendar la cita.', 'Error');
          this.isLoadingCita = false;
        }
      );
    } else {
//      this.toastr.warning('Por favor, completa todos los campos requeridos y selecciona un horario.', 'Advertencia');
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
//        this.toastr.success('Orden de pago creada.', 'Éxito');
        this.isLoadingPago = false;
      },
      (error) => {
        console.error('Error al crear la orden de pago:', error);
//        this.toastr.error('Error al crear la orden de pago.', 'Error');
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
