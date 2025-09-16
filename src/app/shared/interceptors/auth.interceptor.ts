import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  // Verifica si la petición es a nuestra API y si el usuario está logueado
  const isApiUrl = req.url.startsWith(environment.apiUrl);
  if (token && isApiUrl) {
    // Clona la petición y añade la cabecera de autorización
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};