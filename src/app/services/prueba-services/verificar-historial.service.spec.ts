import { TestBed } from '@angular/core/testing';

import { VerificarHistorialService } from './verificar-historial.service';

describe('VerificarHistorialService', () => {
  let service: VerificarHistorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificarHistorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
