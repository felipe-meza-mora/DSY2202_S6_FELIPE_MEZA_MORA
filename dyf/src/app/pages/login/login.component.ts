import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  mensajeError: string | null = null;
  correoNoRegistrado = false; // Variable para manejar el mensaje de correo no registrado

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const email = this.formLogin.get('email')?.value;
    const password = this.formLogin.get('password')?.value;

    // Obtener usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Verificar si el correo electrónico está registrado
    const usuarioRegistrado = usuarios.find((usuario: any) => usuario.email === email);

    if (usuarioRegistrado) {
      // Aquí iría la lógica para verificar la contraseña y hacer login
      if (usuarioRegistrado.password === password) {
        // Guardar la sesión del usuario en localStorage
        localStorage.setItem('sesionUsuario', JSON.stringify(usuarioRegistrado));

        // Navegar a la página principal
        
        //this.router.navigate(['/']); 
        window.location.reload();
        window.location.href = '/';

        // Limpiar mensaje de error si hubiera alguno previo
        this.mensajeError = null; 
        // Reiniciar el estado de correo no registrado
        this.correoNoRegistrado = false; 
      } else {
        this.mensajeError = 'La contraseña ingresada es incorrecta';
      }
    } else {
      this.mensajeError = 'El correo electrónico no está registrado';
      this.correoNoRegistrado = true; // Establecer el estado de correo no registrado
    }
  }
}