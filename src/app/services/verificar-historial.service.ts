import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificarHistorialService {
  constructor() { }

  search(id: string): Observable<boolean> {
    const isValid = id == 'valid-id';
    return of(isValid).pipe(delay(1000));
  }
}
