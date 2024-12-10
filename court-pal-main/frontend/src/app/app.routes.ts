import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/error.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CatalogComponent } from './courts/catalog/catalog.component';
import { AddCourtComponent } from './courts/add-court/add-court.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { SearchCourtComponent } from './courts/search-court/search-court.component';
import { DetailedCourtComponent } from './courts/detailed-court/detailed-court.component';
import { EditCourtComponent } from './courts/edit-court/edit-court.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/loggedIn.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    {
        path: 'courts', children: [
            { path: '', component: CatalogComponent },
            {path: ':courtId/details', component: DetailedCourtComponent},
            {
                path: 'create', 
                component: AddCourtComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'create-lazy', 
                loadComponent: () =>
                    import('./courts/add-court/add-court.component').then((c) => c.AddCourtComponent),
                canActivate: [AuthGuard]
            },
            {path: ':courtId/edit', component: EditCourtComponent, canActivate: [AuthGuard] },
        ]
    },
    {path: 'search', component: SearchCourtComponent},
    { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
    { path: 'error', component: ErrorMsgComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' },
];