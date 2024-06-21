import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userName: string | null = null;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUserName();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('sesionUsuario') !== null;
  }

  loadUserName(): void {
    const sesionUsuario = localStorage.getItem('sesionUsuario');
    if (sesionUsuario) {
      const userData = JSON.parse(sesionUsuario);
      this.userName = userData.nombre;
    }
  }

  logout(): void {
    localStorage.removeItem('sesionUsuario');
    this.router.navigate(['/login']).then(() => {
      this.cdr.detectChanges(); // Forzar detección de cambios
    });
  }
}