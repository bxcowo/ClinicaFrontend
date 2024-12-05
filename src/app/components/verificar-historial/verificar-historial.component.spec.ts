import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VerificarHistorialComponent } from './verificar-historial.component';

describe('VerificarHistorialComponent', () => {
  let component: VerificarHistorialComponent;
  let fixture: ComponentFixture<VerificarHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarHistorialComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
