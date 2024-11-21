import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHistorialclinicoResponse } from '../model/historialclinico-response';
import { BASE_URL } from '../utils/constants';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistorialclinicoService {
  constructor(private http: HttpClient) {}

  findHistorialClinicoByPacienteDni(dni: number): Observable<IHistorialclinicoResponse | null> {
    return this.http.get<IHistorialclinicoResponse>(`${BASE_URL}/historialclinico/${dni}`).pipe(
      catchError(err => {
        console.error('Error buscando historial clinico:', err);
        return throwError(() => new Error('Error buscando historial clinico'));
      })
    );
  }

  getHistorialesClinicos(): Observable<IHistorialclinicoResponse[]> {
    return this.http.get<IHistorialclinicoResponse[]>(`${BASE_URL}/historialclinico`).pipe(
      catchError(err => {
        console.error('Error buscando historiales clinicos:', err);
        return throwError(() => new Error('Error buscando historiales clinicos'));
      })
    );
  }
}
