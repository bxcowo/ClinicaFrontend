import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IEmpleadoResponse } from '../model/empleado-response';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) {}

  getEmpleadoByDni(dni:number): Observable <IEmpleadoResponse | null > {
    const params = new HttpParams()
    .set('dni',dni);

    return this.http.get<IEmpleadoResponse>(`${BASE_URL}/empleado/find/by/dni`,{ params}).pipe(
      catchError(err => {
        console.error('Error buscando empleado por dni', err);
        return throwError(() => new Error('Error buscando empleado por dni'));
      })
    )
  }

}
