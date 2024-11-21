import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPaciente } from '../model/paciente';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  constructor(private http: HttpClient) { }
  getPaciente(): Observable<IPaciente[]> {
    return this.http.get<IPaciente[]>(`${BASE_URL}/paciente`);
  }

}
