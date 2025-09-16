import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { authGuard } from './shared/guards/auth.guard';

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
];
