import { TestBed } from '@angular/core/testing';

import { HistorialclinicoService } from './historialclinico.service';

describe('HistorialclinicoService', () => {
  let service: HistorialclinicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialclinicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
