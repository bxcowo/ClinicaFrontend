import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HistorialclinicoService } from './historialclinico.service';
import { IHistorialclinicoRequest } from '../model/historialclinico-request';

describe('HistorialClinicoService', () => {
  let service: HistorialclinicoService;
  let dni: number;
  let historialRequest: IHistorialclinicoRequest = {
    idHistorialClinico: null,
    dni: 12345678,
    fecha: null,
    observaciones: null,
    diagnosticos: null
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HistorialclinicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtener historiales', (done: DoneFn) =>{
    service.getHistorialesClinicos().subscribe((response: any) => {
        expect(response).toBeInstanceOf(Array);
        done();
    });
  });

  it('insertar historial', (done: DoneFn) =>{
    service.insertHistorialClinico(historialRequest).subscribe((response: any) =>{
        expect(typeof response.idHistorialClinico).toBe('string');
        expect(typeof response.paciente.dni).toBe('number');
        expect(typeof response.fecha).toBe('string');
        expect(typeof response.observaciones).toBe('string');
        expect(typeof response.diagnosticos).toBe('string');
        done();
    })
  });
});
