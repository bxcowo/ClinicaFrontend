import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComprobanteDePago } from '../model/comprobante-de-pago';
import { BASE_URL } from '../utils/constants';
import { catchError, Observable, throwError } from 'rxjs';
import { IOrdenDePagoRequest } from '../model/orden-de-pago-request';
import { IOrdenDePagoResponse } from '../model/orden-de-pago-response';

@Injectable({
  providedIn: 'root',
})
export class OrdeDePagoService {
  constructor(private http: HttpClient) { }

  insertOrdenDePago(ordendepago: IOrdenDePagoRequest): Observable<IOrdenDePagoResponse>{
    return this.http.post<IOrdenDePagoResponse>(`${BASE_URL}/ordendepago`, ordendepago).pipe(
        catchError((err) => {
          console.error('Error al intentar insertar orden de pago:', err);
          return throwError(() => new Error('Error al intentar insertar orden de pago'));
        })
      );
  }

  getOrdenesDePago(): Observable<IOrdenDePagoResponse[]> {
    return this.http.get<IOrdenDePagoResponse[]>(`${BASE_URL}/ordendepago`);
  }

  getOrdenDePagoById(idOrdenDePago: string): Observable<IOrdenDePagoResponse> {
    return this.http.get<IOrdenDePagoResponse>(
      `${BASE_URL}/ordendepago/find/by/id?idOrdenDePago=${idOrdenDePago}`
    );
  }

  updateComprobanteDePago(
    idOrdenDePago: string,
    idComprobanteDePago: number
  ): Observable<IOrdenDePagoResponse> {
    return this.http.put<IOrdenDePagoResponse>(
      `${BASE_URL}/ordendepago/update/comprobantedepago?idOrdenDePago=${idOrdenDePago}&idComprobanteDePago=${idComprobanteDePago}`,
      null
    );
  }

  updateMetodoDePago(
    idOrdenDePago: string,
    idMetodoDePago: number
  ): Observable<IOrdenDePagoResponse> {
    return this.http.put<IOrdenDePagoResponse>(
      `${BASE_URL}/ordendepago/update/metododepago?idOrdenDePago=${idOrdenDePago}&idMetodoDePago=${idMetodoDePago}`,
      null
    );
  }

  updateEstadoDePago(idOrdenDePago: string): Observable<IOrdenDePagoResponse> {
    return this.http.put<IOrdenDePagoResponse>(
      `${BASE_URL}/ordendepago/update/estado?idOrdenDePago=${idOrdenDePago}`,
      null
    );
  }
}
