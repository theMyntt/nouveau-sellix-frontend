import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/auth/guards/is-authenticated.guard';
import { AuthComponent } from './features/auth/auth.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'home',
                loadChildren: () => import('./features/home/routes').then(m => m.routes)
            }
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: '',
                loadChildren: () => import('./features/auth/routes').then(m => m.routes)
            }
        ]
    }
];
