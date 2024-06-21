import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { validarRut } from '../../validators/rut.validator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  formulario(formulario: any) {
    throw new Error('Method not implemented.');
  }

  formRegistro!: FormGroup;
  mensajeExito: string | null = null;

  constructor(private f : FormBuilder) {}

  ngOnInit(): void {
    this.formRegistro = this.f.group({
      rut: ['', [Validators.required,validarRut]],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.passwordStrengthValidator
        
      ]],
      confirmPassword: ['', Validators.required],
      direccionEnvio: ['']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const errors: any = {};

    if (!/[A-Z]/.test(value)) {
      errors.missingUppercase = 'La contraseña debe contener al menos una letra mayúscula';
    }

    if (!/[a-z]/.test(value)) {
      errors.missingLowercase = 'La contraseña debe contener al menos una letra minúscula';
    }

    if (!/[0-9]/.test(value)) {
      errors.missingNumber = 'La contraseña debe contener al menos un número';
    }

    if (!/[@$!%*?&]/.test(value)) {
      errors.missingSpecial = 'La contraseña debe contener al menos un carácter especial (@$!%*?&)';
    }

    return Object.keys(errors).length ? errors : null;
  }

  submitForm(): void {
    if (this.formRegistro.valid) {
      // Obtener usuarios existentes del localStorage o inicializar un arreglo vacío si no hay ninguno
      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
      // Nuevo usuario a registrar
      const nuevoUsuario = {
        rut: this.formRegistro.get('rut')?.value,
        nombre: this.formRegistro.get('nombre')?.value,
        email: this.formRegistro.get('email')?.value,
        password: this.formRegistro.get('password')?.value,
        direccionEnvio: this.formRegistro.get('direccionEnvio')?.value,
        permisos: 'cliente' // Asignar permisos de cliente por defecto
      };
  
      // Agregar el nuevo usuario al arreglo de usuarios
      usuarios.push(nuevoUsuario);
  
      // Guardar usuarios en localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
      // Guardar usuario administrador predeterminado si aún no existe
      if (!usuarios.some((u: any) => u.email === 'admin@dyf.cl')) {
        const adminUsuario = {
          rut: '11111111-1',
          nombre: 'Admin',
          email: 'admin@dyf.cl',
          password: 'Qwerty123$',
          direccionEnvio: 'Dirección de administrador',
          permisos: 'admin'
        };
  
        usuarios.push(adminUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
      }
  
      // Mostrar mensaje de éxito
      const nombreUsuario = this.formRegistro.get('nombre')?.value;
      this.mensajeExito = `¡${nombreUsuario}, tu información ha sido guardada exitosamente!`;
  
      // Limpiar formulario después de 3 segundos
      setTimeout(() => {
        this.formRegistro.reset();
        this.mensajeExito = null;
      }, 3000);
    }
  }

  limpiarFormulario() {
    this.formRegistro.reset();
  }


}
