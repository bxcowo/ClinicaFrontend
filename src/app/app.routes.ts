import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { VerificarHistorialComponent } from './components/verificar-historial/verificar-historial.component';
import { CrearHistorialComponent } from './components/crear-historial/crear-historial.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'pagos',
        component: PagosComponent,
    },
    {
        path:'verificar_historial',
        component: VerificarHistorialComponent
    },
    {
        path:'crear_historial',
        component: CrearHistorialComponent
    },
    {
        path:'agendar_cita',
        component: AgendarCitaComponent,
    }
];
