import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { authGuard } from './shared/guards/auth.guard';
import { PropertyCreateComponent } from './pages/property-create/property-create.component';
import { MyRentalsComponent } from './pages/my-rentals/my-rentals.component';
import { OwnerRentalsComponent } from './pages/owner-rentals/owner-rentals.component';
import { PropertyEditComponent } from './pages/property-edit/property-edit.component';

export const routes: Routes = [

  { 
    path: '', 
    redirectTo: '/landing', 
    pathMatch: 'full' 
  },

  { 
    path: 'landing', 
    component: LandingComponent 
  },
  
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
    { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'property/:id',
    component: PropertyDetailComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'properties/new',
    component: PropertyCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'my-rentals', 
    component: MyRentalsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'owner/rentals',
    component: OwnerRentalsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'property/:id/edit', // <-- AÑADE ESTA RUTA
    component: PropertyEditComponent,
    canActivate: [authGuard]
  },
];
