import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuarioResponse } from '../../model/usuario-response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(
    private usuarioService:UsuarioService,
    private empleadoService:EmpleadoService,
    private router: Router
  ){ }

  ngOnInit(): void{
    //this.iniciarSesion();
  }

  iniciarSesion(){
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos';
      return;
    }
    this.usuarioService
      .LoginUser(this.email, this.password)
      .pipe(
        switchMap((usuarioResponse) => {
          if (usuarioResponse?.dni) {
            return this.empleadoService.getEmpleadoByDni(usuarioResponse.dni);
          } else {
            throw new Error('usuarioResponse undefined');
          }
        })
      )
      .subscribe({
        next: (empleadoResponse) => {
          if (empleadoResponse?.nombreCargo === 'Cajero') {
            this.router.navigate(['/pagos']);
          } else if (empleadoResponse?.nombreCargo === 'Recepcionista') {
            this.router.navigate(['/verificar_historial']);
          } else {
            console.error('Por el momento no tenemos implementadada una ventana para dicho cargo');
            this.errorMessage = 'Por el momento no tenemos implementadada una ventana para dicho cargo';
          }
          this.email = '';
          this.password = '';
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Error al intentar iniciar sesión', err);
          this.errorMessage = err.message || 'Error al intentar iniciar sesión';
        },
      });
  }

}
