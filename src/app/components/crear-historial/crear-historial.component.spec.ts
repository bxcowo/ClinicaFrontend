import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrearHistorialComponent } from './crear-historial.component';
import { PacienteService } from '../../services/paciente.service';
import { HistorialclinicoService } from '../../services/historialclinico.service';

describe('CrearHistorialComponent', () => {
  let component: CrearHistorialComponent;
  let fixture: ComponentFixture<CrearHistorialComponent>;
  let pacienteService: PacienteService;
  let historialclinicoService: HistorialclinicoService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearHistorialComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invalidar historial vacío', () => {
    expect(component.historialForm.valid).toBeFalsy();
  });

  it('validad historial correcto', () => {
    component.historialForm.setValue({
      dni: '12345678',
      nombres: 'Juan',
      apellidos: 'Perez',
      fechaNacimiento: '1990-01-01',
      correo: 'juanp123@gmail.com',
      celular: '987654321',
      domicilio: 'Calle 123'
    });
    expect(component.historialForm.valid).toBeTruthy();

    component.onSubmit();
  });  
});
