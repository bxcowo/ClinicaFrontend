import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PagosComponent } from './components/pagos/pagos.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'pagos',
        component: PagosComponent,
    }
];
