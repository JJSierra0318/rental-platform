import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';

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
];
