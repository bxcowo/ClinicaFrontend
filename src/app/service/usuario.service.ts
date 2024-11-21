import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuarioResponse } from '../model/usuario-response';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  getUser(): Observable<IUsuarioResponse[]>{
    return this.http.get<IUsuarioResponse[]>(`${BASE_URL}/usuario`);
    //return this.http.get<IUsuarioResponse[]>(`${BASE_URL}/find/by/nombre-and-password`);
  }


}
