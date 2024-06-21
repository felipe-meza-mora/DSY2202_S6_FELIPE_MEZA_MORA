import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

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
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/) // Al menos una mayúscula y un número
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

  submitForm(){
    if (this.formRegistro.valid) {
      if (this.formRegistro.valid) {
        // Guardar en localStorage
        localStorage.setItem('registroUsuario', JSON.stringify(this.formRegistro.value));
  
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
  }

  limpiarFormulario() {
    this.formRegistro.reset();
  }


}
