import { TestBed } from '@angular/core/testing';

import { OrdeDePagoService } from './orde-de-pago.service';

describe('OrdeDePagoService', () => {
  let service: OrdeDePagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdeDePagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
