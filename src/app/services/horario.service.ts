import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IHorarioResponse } from '../model/horario-response';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient) {}

  getHorarioById(id:number): Observable <IHorarioResponse | null > {
    return this.http.get<IHorarioResponse>(`${BASE_URL}/horarios/find/by/id/${id}`).pipe(
      catchError(err => {
        console.error('Error buscando horario por id', err);
        return throwError(() => new Error('Error buscando horario por id'));
      })
    )
  }

  getHorariosByFechaAndEspecialidad(fecha:string, nameEspecialidad: string): Observable <IHorarioResponse[]> {
    const params = new HttpParams()
    .set('fecha', fecha)
    .set('nameEspecialidad', nameEspecialidad);

    return this.http.get<IHorarioResponse[]>(`${BASE_URL}/horarios/find/by/fecha-and-nameEspecialidad`, { params }).pipe(
      catchError((err) => {
        console.error('Error al buscar horarios por fecha y especialidad:', err);
        return throwError(() => new Error('Error al buscar horarios por fecha y especialidad'));
      })
    );
  }

  getHorarios(): Observable <IHorarioResponse[]> {
    return this.http.get<IHorarioResponse[]>(`${BASE_URL}/horarios`).pipe(
      catchError(err => {
        console.error('Error obteniendo todos los horarios', err);
        return throwError(() => new Error('Error obteniendo todos los horarios'));
      })
    )
  }

}
