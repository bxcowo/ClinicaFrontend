import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPaciente } from '../model/paciente';
import { catchError, Observable, throwError } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  constructor(private http: HttpClient) { }

  getPacientes(): Observable<IPaciente[]> {
    return this.http.get<IPaciente[]>(`${BASE_URL}/paciente`).pipe(
      catchError(err => {
        console.error('Error buscando pacientes:', err);
        return throwError(() => new Error('Error buscando pacientes'));
      })
    );
  }

  insertPaciente(paciente: IPaciente): Observable<IPaciente> {
    return this.http.post<IPaciente>(`${BASE_URL}/paciente`, paciente).pipe(
      catchError((err) => {
        console.error('Error intentando insertar paciente:', err);
        return throwError(() => new Error('Error intentando insertar paciente:'));
      })
    );
  }

}
