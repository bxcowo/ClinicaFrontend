import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VerificarHistorialComponent } from "./components/verificar-historial/verificar-historial.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VerificarHistorialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hola mundo';
}
