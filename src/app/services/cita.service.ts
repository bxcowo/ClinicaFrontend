import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICitaRequest } from '../model/cita-request';
import { ICitaResponse } from '../model/cita-response';
import { catchError, Observable, throwError } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http: HttpClient) {}

  getCitaById(id:string): Observable <ICitaResponse | null > {
    return this.http.get<ICitaResponse>(`${BASE_URL}/cita/find/by/id/${id}`).pipe(
      catchError(err => {
        console.error('Error buscando cita por id', err);
        return throwError(() => new Error('Error buscando cita por id'));
      })
    )
  }

  insertCita(cita: ICitaRequest): Observable<ICitaResponse> {
    return this.http.post<ICitaResponse>(`${BASE_URL}/cita`, cita).pipe(
      catchError((err) => {
        console.error('Error al intentar agendar cita:', err);
        return throwError(() => new Error('Error al intentar agendar cita'));
      })
    );
  }

}
