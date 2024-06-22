import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  correoNoRegistrado: boolean = false;
  correoEnviado: boolean = false;
  mensajeError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.correoNoRegistrado = false; // Reset error flag
    this.correoEnviado = false; // Reset success flag

    if (this.changePasswordForm.valid) {
      const email = this.changePasswordForm.get('email')?.value;

      console.log('Email:', email);

      // Verificar si el correo electrónico está registrado
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuario = usuarios.find((user: any) => user.email === email);

      if (usuario) {
        this.correoEnviado = true;
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 4000);

      } else {
        this.correoNoRegistrado = true;
      }
    } else {
      this.changePasswordForm.markAllAsTouched(); // Para mostrar los errores de validación
    }
  }
}