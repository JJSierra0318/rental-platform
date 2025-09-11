import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  // Inyectamos los servicios que necesitamos
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      // Marcar todos los campos como "tocados" para mostrar errores
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const endpoint = 'https://tu-api.com/auth/register'; // <-- CAMBIA ESTO POR TU ENDPOINT REAL
    const body = this.registerForm.value;

    this.http.post(endpoint, body).pipe(
      finalize(() => this.isLoading = false) // Se ejecuta al final, haya éxito o error
    ).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        // Redirigir al usuario al login después de un registro exitoso
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.errorMessage = 'Ocurrió un error en el registro. Por favor, inténtalo de nuevo.';
      }
    });
  }
}
