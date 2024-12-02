import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUsuarioResponse } from '../model/usuario-response';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  LoginUser(nombreUsuario:string, passwordUsuario:string): Observable <IUsuarioResponse | null > {
    const params = new HttpParams()
    .set('nombreUsuario',nombreUsuario)
    .set('passwordUsuario', passwordUsuario);

    return this.http.get<IUsuarioResponse>(`${BASE_URL}/usuario/find/by/nombre-and-password`,{ params}).pipe(
      catchError(err => {
        console.error('Error al intentar iniciar sesion', err);
        return throwError(() => new Error('Error al intentar iniciar sesion'));
      })
    )
  }

}
