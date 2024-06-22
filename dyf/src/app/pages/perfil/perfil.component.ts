import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { validarRut } from '../../validators/rut.validator';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent implements OnInit {
  formRegistro!: FormGroup;
  mensajeExito: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      rut: ['', [Validators.required, validarRut]],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.passwordValidator()],
      confirmPassword: [''],
      telefono: ['', Validators.required],
      permisos: [''],
      direccionEnvio: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });

    this.loadUserData();
  }

  loadUserData(): void {
    const sesionUsuario = localStorage.getItem('sesionUsuario');
    if (sesionUsuario) {
      const userData = JSON.parse(sesionUsuario);
      this.formRegistro.patchValue({
        rut: userData.rut,
        nombre: userData.nombre,
        email: userData.email,
        telefono: userData.telefono,
        permisos: userData.permisos,
        direccionEnvio: userData.direccionEnvio
      });
      // El campo de la contraseña y confirmación se dejan en blanco por seguridad
    }
  }

  passwordValidator(): Validators | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const errors: any = {};

      if (value && !/[A-Z]/.test(value)) {
        errors.missingUppercase = 'Debe contener al menos una letra mayúscula';
      }
      if (value && !/[a-z]/.test(value)) {
        errors.missingLowercase = 'Debe contener al menos una letra minúscula';
      }
      if (value && !/[0-9]/.test(value)) {
        errors.missingNumber = 'Debe contener al menos un número';
      }
      if (value && !/[\W_]/.test(value)) {
        errors.missingSpecial = 'Debe contener al menos un carácter especial';
      }
      return Object.keys(errors).length ? errors : null;
    };
  }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  submitForm(): void {
    if (this.formRegistro.valid) {
      const updatedUserData = this.formRegistro.value;

      const sesionUsuario = localStorage.getItem('sesionUsuario');
      let currentPassword = '';

      if (sesionUsuario) {
        const userData = JSON.parse(sesionUsuario);
        currentPassword = userData.password;
      }

      // Si no se proporcionan nuevas contraseñas, mantenemos la contraseña existente
      if (!updatedUserData.password) {
        updatedUserData.password = currentPassword;
      }
      delete updatedUserData.confirmPassword;

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const index = usuarios.findIndex((user: any) => user.email === updatedUserData.email);

      if (index !== -1) {
        usuarios[index] = updatedUserData;
      } else {
        usuarios.push(updatedUserData);
      }

      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('sesionUsuario', JSON.stringify(updatedUserData));

      this.mensajeExito = 'Datos actualizados con éxito.';
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 4000);

    }
  }

  limpiarFormulario(): void {
    this.formRegistro.reset();
  }
}
