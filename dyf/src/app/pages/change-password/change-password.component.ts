import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup;
  usuarios: any[] = [];
  correoNoRegistrado = false;
  mensajeError: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      rutDigits: ['', {
        validators: [Validators.required, Validators.pattern(/^\d{4}$/)]
      }]
    });

    // Cargar usuarios desde localStorage
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const email = this.changePasswordForm.get('email')?.value;
      const rutDigits = this.changePasswordForm.get('rutDigits')?.value;
  
      const usuarioRegistrado = this.usuarios.find((usuario: any) => usuario.email === email);
  
      if (usuarioRegistrado) {
        const rutRegistrado = usuarioRegistrado.rut.substring(0, 4);
  
        if (rutDigits !== rutRegistrado) {
          this.mensajeError = 'Los primeros 4 dígitos del RUT no coinciden';
          this.correoNoRegistrado = false;
        } else {
          this.mensajeError = null;
          this.correoNoRegistrado = false;
        }
      } else {
        this.mensajeError = 'El correo electrónico no está registrado';
        this.correoNoRegistrado = true;
      }
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
