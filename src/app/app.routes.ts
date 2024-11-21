import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { VerificarHistorialComponent } from './components/verificar-historial/verificar-historial.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path:'verificar_historial',
        component: VerificarHistorialComponent
    }
];
